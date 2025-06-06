using backend.Models;
using backend.Dtos;
using System.Collections.Generic;
using System.Text;

namespace backend.Services;

public class ExportService
{
    public string ExportBorrowingsToCsv(IEnumerable<BorrowingDto> borrowings)
    {
        var sb = new StringBuilder();
        sb.AppendLine("Id,Username,BookTitle,BorrowedAt,ReturnDueDate,ReturnedAt");

        foreach (var b in borrowings)
        {
            sb.AppendLine($"{b.Id},{b.Username},{b.BookTitle},{b.BorrowedAt:yyyy-MM-dd},{b.ReturnDueDate:yyyy-MM-dd},{b.ReturnedAt?.ToString("yyyy-MM-dd") ?? ""}");
        }

        return sb.ToString();
    }

    public string ExportUsersToCsv(IEnumerable<User> users)
    {
        var sb = new StringBuilder();
        sb.AppendLine("Username,Email,Role");

        foreach (var u in users)
        {
            sb.AppendLine($"{u.Username},{u.Email},{u.Role}");
        }

        return sb.ToString();
    }

    public string ExportBooksToCsv(IEnumerable<Book> books)
    {
        var sb = new StringBuilder();
        sb.AppendLine("Title,Author,Year,Description,IsAvailable,ReturnDueDate");

        foreach (var b in books)
        {
            sb.AppendLine($"{b.Title},{b.Author},{b.Year},{b.Description},{b.IsAvailable},{(b.ReturnDueDate?.ToString() ?? "")}");
        }

        return sb.ToString();
    }
}
