using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class User
{
    public int Id { get; set; }

    [Required]
    public string Username { get; set; } = string.Empty;

    [Required]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string PasswordHash { get; set; } = string.Empty;

    [Required]
    public Role Role { get; set; } = Role.User;

    public virtual ICollection<Borrowing>? Borrowings { get; set; }
}

public enum Role
{
    User,
    Admin
}
