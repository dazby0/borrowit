using System;

namespace backend.Models;

public class Borrowing
{
    public int Id { get; set; }

    public int UserId { get; set; }
    public int BookId { get; set; }

    public DateTime BorrowedAt { get; set; } = DateTime.UtcNow;

    public DateTime? ReturnedAt { get; set; }

    public DateTime ReturnDueDate { get; set; }

    public virtual User User { get; set; } = null!;
    public virtual Book Book { get; set; } = null!;
}
