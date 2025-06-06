using backend.Data;
using backend.Models;
using backend.Dtos;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace backend.Services;

public class BorrowingService
{
    private readonly ApplicationDbContext _context;

    public BorrowingService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<bool> BorrowBookAsync(int userId, int bookId, DateTime returnDueDate)
    {
        var book = await _context.Books.FindAsync(bookId);
        if (book == null || !book.IsAvailable) return false;

        var alreadyBorrowed = await _context.Borrowings.AnyAsync(b =>
            b.UserId == userId && b.BookId == bookId && b.ReturnedAt == null);
        if (alreadyBorrowed) return false;

        var borrowing = new Borrowing
        {
            UserId = userId,
            BookId = bookId,
            BorrowedAt = DateTime.UtcNow,
            ReturnDueDate = returnDueDate
        };

        book.IsAvailable = false;
        book.ReturnDueDate = returnDueDate;

        _context.Borrowings.Add(borrowing);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> ReturnBookAsync(int borrowingId)
    {
        var borrowing = await _context.Borrowings
            .Include(b => b.Book)
            .FirstOrDefaultAsync(b => b.Id == borrowingId);

        if (borrowing == null || borrowing.ReturnedAt != null) return false;

        borrowing.ReturnedAt = DateTime.UtcNow;
        borrowing.Book.IsAvailable = true;
        borrowing.Book.ReturnDueDate = null;

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<List<BorrowingDto>> GetUserBorrowingsAsync(int userId, string? status)
    {
        var query = _context.Borrowings
            .Include(b => b.Book)
            .Where(b => b.UserId == userId);

        if (status == "active")
            query = query.Where(b => b.ReturnedAt == null);
        else if (status == "returned")
            query = query.Where(b => b.ReturnedAt != null);

        return await query
            .OrderByDescending(b => b.BorrowedAt)
            .Select(b => new BorrowingDto
            {
                Id = b.Id,
                BookId = b.BookId,
                BookTitle = b.Book.Title,
                BorrowedAt = b.BorrowedAt,
                ReturnDueDate = b.ReturnDueDate,
                ReturnedAt = b.ReturnedAt
            })
            .ToListAsync();
    }

    public async Task<List<BorrowingDto>> GetAllAsync(string? username, int page, int pageSize)
    {
        var query = _context.Borrowings
            .Include(b => b.Book)
            .Include(b => b.User)
            .AsQueryable();

        if (!string.IsNullOrEmpty(username))
            query = query.Where(b => b.User.Username.ToLower().Contains(username.ToLower()));

        return await query
            .OrderByDescending(b => b.BorrowedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(b => new BorrowingDto
            {
                Id = b.Id,
                Username = b.User.Username,
                BookTitle = b.Book.Title,
                BorrowedAt = b.BorrowedAt,
                ReturnDueDate = b.ReturnDueDate,
                ReturnedAt = b.ReturnedAt
            })
            .ToListAsync();
    }

    public async Task<List<BookBorrowingDto>> GetBorrowingsForBookAsync(int bookId, bool onlyActive)
    {
        var query = _context.Borrowings
            .Include(b => b.User)
            .Where(b => b.BookId == bookId);

        if (onlyActive)
            query = query.Where(b => b.ReturnedAt == null);

        return await query
            .OrderByDescending(b => b.BorrowedAt)
            .Select(b => new BookBorrowingDto
            {
                Username = b.User.Username,
                BorrowedAt = b.BorrowedAt,
                ReturnDueDate = b.ReturnDueDate,
                ReturnedAt = b.ReturnedAt
            })
            .ToListAsync();
    }

    public async Task<object> GetStatisticsAsync()
    {
        var activeBorrowings = await _context.Borrowings.CountAsync(b => b.ReturnedAt == null);
        var activeUsers = await _context.Users
            .CountAsync(u => _context.Borrowings.Any(b => b.UserId == u.Id && b.ReturnedAt == null));
        var mostBorrowedBooks = await _context.Borrowings
            .GroupBy(b => b.Book.Title)
            .Select(g => new { Title = g.Key, Count = g.Count() })
            .OrderByDescending(g => g.Count)
            .Take(5)
            .ToListAsync();

        return new
        {
            activeBorrowings,
            activeUsers,
            mostBorrowedBooks
        };
    }
}
