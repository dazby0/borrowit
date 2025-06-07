using backend.Data;
using backend.Dtos;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace backend.Services;

public class BookService
{
    private readonly ApplicationDbContext _context;

    public BookService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<PagedResult<BookDto>> GetFilteredAsync(BookQueryParams query)
    {
        var books = _context.Books.AsQueryable();

        if (!string.IsNullOrWhiteSpace(query.Title))
            books = books.Where(b => b.Title.ToLower().Contains(query.Title.ToLower()));

        if (!string.IsNullOrWhiteSpace(query.Author))
            books = books.Where(b => b.Author.ToLower().Contains(query.Author.ToLower()));

        if (query.IsAvailable != null)
            books = books.Where(b => b.IsAvailable == query.IsAvailable);

        var totalCount = await books.CountAsync();

        books = query.SortBy?.ToLower() switch
        {
            "author" => query.SortDir == "desc"
                ? books.OrderByDescending(b => b.Author)
                : books.OrderBy(b => b.Author),
            "year" => query.SortDir == "desc"
                ? books.OrderByDescending(b => b.Year)
                : books.OrderBy(b => b.Year),
            _ => query.SortDir == "desc"
                ? books.OrderByDescending(b => b.Title)
                : books.OrderBy(b => b.Title)
        };

        var items = await books
            .Skip((query.Page - 1) * query.PageSize)
            .Take(query.PageSize)
            .Select(b => new BookDto
            {
                Id = b.Id,
                Title = b.Title,
                Author = b.Author,
                Year = b.Year,
                Description = b.Description,
                IsAvailable = b.IsAvailable,
                ReturnDueDate = b.ReturnDueDate
            })
            .ToListAsync();

        return new PagedResult<BookDto>
        {
            Items = items,
            TotalCount = totalCount
        };
    }

    public async Task<BookDto?> GetByIdAsync(int id)
    {
        var b = await _context.Books.FindAsync(id);
        return b == null ? null : new BookDto
        {
            Id = b.Id,
            Title = b.Title,
            Author = b.Author,
            Year = b.Year,
            Description = b.Description,
            IsAvailable = b.IsAvailable,
            ReturnDueDate = b.ReturnDueDate
        };
    }

    public async Task<BookDto> CreateAsync(CreateBookDto dto)
    {
        var book = new Book
        {
            Title = dto.Title,
            Author = dto.Author,
            Year = dto.Year,
            Description = dto.Description
        };

        _context.Books.Add(book);
        await _context.SaveChangesAsync();

        return await GetByIdAsync(book.Id) ?? throw new Exception("Creation failed");
    }

    public async Task<bool> UpdateAsync(int id, UpdateBookDto dto)
    {
        var book = await _context.Books.FindAsync(id);
        if (book == null) return false;

        book.Title = dto.Title;
        book.Author = dto.Author;
        book.Year = dto.Year;
        book.Description = dto.Description;

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> UpdateStatusAsync(int id, UpdateBookStatusDto dto)
    {
        var book = await _context.Books.FindAsync(id);
        if (book == null) return false;

        book.IsAvailable = dto.IsAvailable;
        book.ReturnDueDate = dto.ReturnDueDate;

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var book = await _context.Books.FindAsync(id);
        if (book == null) return false;

        _context.Books.Remove(book);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<List<BorrowingForBookDto>> GetBorrowingsForBookAsync(int bookId, bool onlyActive)
    {
        var book = await _context.Books
            .Include(b => b.Borrowings!)
                .ThenInclude(br => br.User)
            .FirstOrDefaultAsync(b => b.Id == bookId);

        if (book == null || book.Borrowings == null)
            return new();

        var query = book.Borrowings.AsQueryable();

        if (onlyActive)
            query = query.Where(b => b.ReturnedAt == null);

        return query
            .Select(b => new BorrowingForBookDto
            {
                Username = b.User.Username,
                BorrowedAt = b.BorrowedAt,
                ReturnDueDate = b.ReturnDueDate,
                ReturnedAt = b.ReturnedAt
            })
            .OrderByDescending(b => b.BorrowedAt)
            .ToList();
    }
}
