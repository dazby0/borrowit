using Microsoft.EntityFrameworkCore;
using backend.Models;
using backend.Data;

namespace backend.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<Book> Books => Set<Book>();
    public DbSet<User> Users => Set<User>();
    public DbSet<Borrowing> Borrowings => Set<Borrowing>();
}
