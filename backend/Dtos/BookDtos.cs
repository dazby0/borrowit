using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Dtos;

public class CreateBookDto
{
    [Required]
    [StringLength(150, MinimumLength = 2)]
    public string Title { get; set; } = string.Empty;

    [Required]
    [StringLength(100, MinimumLength = 2)]
    public string Author { get; set; } = string.Empty;

    [Range(0, 2100)]
    public int Year { get; set; }

    [StringLength(1000)]
    public string? Description { get; set; }
}

public class UpdateBookDto
{
    [Required]
    [StringLength(150, MinimumLength = 2)]
    public string Title { get; set; } = string.Empty;

    [Required]
    [StringLength(100, MinimumLength = 2)]
    public string Author { get; set; } = string.Empty;

    [Range(0, 2100)]
    public int Year { get; set; }

    [StringLength(1000)]
    public string? Description { get; set; }
}

public class UpdateBookStatusDto
{
    [Required]
    public bool IsAvailable { get; set; }

    public DateTime? ReturnDueDate { get; set; }
}

public class BookDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Author { get; set; } = string.Empty;
    public int Year { get; set; }
    public string? Description { get; set; }
    public bool IsAvailable { get; set; }
    public DateTime? ReturnDueDate { get; set; }
}

public class BookQueryParams
{
    public string? Title { get; set; }
    public string? Author { get; set; }
    public bool? IsAvailable { get; set; }

    public string? SortBy { get; set; } = "title";
    public string? SortDir { get; set; } = "asc";

    [Range(1, 100)]
    public int Page { get; set; } = 1;

    [Range(1, 100)]
    public int PageSize { get; set; } = 10;
}

public class BorrowingForBookDto
{
    public string Username { get; set; } = string.Empty;
    public DateTime BorrowedAt { get; set; }
    public DateTime ReturnDueDate { get; set; }
    public DateTime? ReturnedAt { get; set; }
}