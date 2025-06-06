using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace backend.Seed;

public static class DbSeeder
{
    public static void Seed(ApplicationDbContext context)
    {
        context.Database.Migrate();

        if (!context.Users.Any())
        {
            context.Users.AddRange(
                new User { Username = "admin", Email = "admin@example.com", PasswordHash = "admin", Role = Role.Admin },
                new User { Username = "alice", Email = "alice@example.com", PasswordHash = "pass123", Role = Role.User },
                new User { Username = "bob", Email = "bob@example.com", PasswordHash = "pass456", Role = Role.User }
            );
        }

        if (!context.Books.Any())
        {
            context.Books.AddRange(
                new Book { Title = "Clean Code", Author = "Robert C. Martin", Year = 2008, Description = "Practical software craftsmanship." },
                new Book { Title = "The Pragmatic Programmer", Author = "Andy Hunt", Year = 1999 },
                new Book { Title = "1984", Author = "George Orwell", Year = 1949 },
                new Book { Title = "Sapiens", Author = "Yuval Noah Harari", Year = 2011 },
                new Book { Title = "Atomic Habits", Author = "James Clear", Year = 2018 },
                new Book { Title = "The Art of War", Author = "Sun Tzu", Year = -500 },
                new Book { Title = "The Mythical Man-Month", Author = "Fred Brooks", Year = 1975 },
                new Book { Title = "Zero to One", Author = "Peter Thiel", Year = 2014 }
            );
        }

        context.SaveChanges();

        if (!context.Borrowings.Any())
        {
            var userAlice = context.Users.First(u => u.Username == "alice");
            var userBob = context.Users.First(u => u.Username == "bob");

            var book1 = context.Books.First(b => b.Title == "1984");
            var book2 = context.Books.First(b => b.Title == "Sapiens");
            var book3 = context.Books.First(b => b.Title == "Atomic Habits");
            var book4 = context.Books.First(b => b.Title == "Clean Code");

            context.Borrowings.AddRange(
                new Borrowing
                {
                    UserId = userAlice.Id,
                    BookId = book1.Id,
                    BorrowedAt = DateTime.UtcNow.AddDays(-10),
                    ReturnDueDate = DateTime.UtcNow.AddDays(10),
                    ReturnedAt = null
                },
                new Borrowing
                {
                    UserId = userAlice.Id,
                    BookId = book2.Id,
                    BorrowedAt = DateTime.UtcNow.AddDays(-30),
                    ReturnDueDate = DateTime.UtcNow.AddDays(-5),
                    ReturnedAt = DateTime.UtcNow.AddDays(-6)
                },
                new Borrowing
                {
                    UserId = userBob.Id,
                    BookId = book3.Id,
                    BorrowedAt = DateTime.UtcNow.AddDays(-5),
                    ReturnDueDate = DateTime.UtcNow.AddDays(5),
                    ReturnedAt = null
                },
                new Borrowing
                {
                    UserId = userBob.Id,
                    BookId = book4.Id,
                    BorrowedAt = DateTime.UtcNow.AddDays(-15),
                    ReturnDueDate = DateTime.UtcNow.AddDays(-2),
                    ReturnedAt = DateTime.UtcNow.AddDays(-1)
                }
            );

            book1.IsAvailable = false;
            book1.ReturnDueDate = DateTime.UtcNow.AddDays(10);

            book3.IsAvailable = false;
            book3.ReturnDueDate = DateTime.UtcNow.AddDays(5);

            context.SaveChanges();
        }
    }
}
