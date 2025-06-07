using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Dtos;

public class CreateBorrowingDto
{
    [Required]
    public int BookId { get; set; }

    [Required]
    public DateTime ReturnDueDate { get; set; }
}

public class BorrowingDto
{
    public int Id { get; set; }
    public int BookId { get; set; }
    public string Username { get; set; } = string.Empty;
    public string BookTitle { get; set; } = string.Empty;
    public DateTime BorrowedAt { get; set; }
    public DateTime ReturnDueDate { get; set; }
    public DateTime? ReturnedAt { get; set; }
}

public class BookBorrowingDto
{
    public string Username { get; set; } = string.Empty;
    public DateTime BorrowedAt { get; set; }
    public DateTime ReturnDueDate { get; set; }
    public DateTime? ReturnedAt { get; set; }
}

public class BorrowingQueryParams
{
    public string? Status { get; set; } 

    public DateTime? BorrowedFrom { get; set; }
    public DateTime? BorrowedTo { get; set; }

    public DateTime? ReturnedFrom { get; set; }
    public DateTime? ReturnedTo { get; set; }

    [Range(1, 100)]
    public int Page { get; set; } = 1;

    [Range(1, 100)]
    public int PageSize { get; set; } = 100;

    public string? SortBy { get; set; } = "BorrowedAt"; 
    public string? SortOrder { get; set; } = "desc"; 
}

