using System.Collections.Generic;
using System;

namespace backend.Models;

public class Book
{
    public int Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Author { get; set; } = string.Empty;

    public int Year { get; set; }

    public string? Description { get; set; }

    public bool IsAvailable { get; set; } = true;

    public DateTime? ReturnDueDate { get; set; }

    public virtual ICollection<Borrowing>? Borrowings { get; set; }
}
