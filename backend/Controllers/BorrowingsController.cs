using backend.Dtos;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace backend.Controllers;

[ApiController]
[Route("api/borrowings")]
public class BorrowingsController : ControllerBase
{
    private readonly BorrowingService _service;

    public BorrowingsController(BorrowingService service)
    {
        _service = service;
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> BorrowBook([FromBody] CreateBorrowingDto dto)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var (success, error) = await _service.BorrowBookAsync(userId, dto.BookId, dto.ReturnDueDate);

        if (!success)
            return BadRequest(error);

        return Ok();
    }

    [Authorize]
    [HttpPatch("{id}/return")]
    public async Task<IActionResult> ReturnBook(int id)
    {
        var success = await _service.ReturnBookAsync(id);
        return success ? Ok() : NotFound("Borrowing not found or already returned.");
    }

    [Authorize]
    [HttpGet("me")]
    public async Task<ActionResult<IEnumerable<BorrowingDto>>> GetMyBorrowings([FromQuery] BorrowingQueryParams queryParams)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var list = await _service.GetUserBorrowingsAsync(userId, queryParams);
        return Ok(list);
    }


    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<ActionResult<List<BorrowingDto>>> GetAll([FromQuery] string? username)
    {
        var result = await _service.GetAllAsync(username);
        return Ok(result);
    }

    [Authorize(Roles = "Admin")]
    [HttpGet("stats")]
    public async Task<IActionResult> GetStats()
    {
        var stats = await _service.GetStatisticsAsync();
        return Ok(stats);
    }

    [Authorize(Roles = "Admin")]
    [HttpGet("export")]
    public async Task<IActionResult> ExportCsv([FromServices] ExportService exportService)
    {
        var all = await _service.GetAllAsync(null);
        var csv = exportService.ExportBorrowingsToCsv(all);
        return File(Encoding.UTF8.GetBytes(csv), "text/csv", "borrowings.csv");
    }

    [Authorize(Roles = "Admin")]
    [HttpGet("/api/books/{bookId}/borrowings")]
    public async Task<ActionResult<IEnumerable<BookBorrowingDto>>> GetBookBorrowings(int bookId, [FromQuery] bool onlyActive = false)
    {
        var list = await _service.GetBorrowingsForBookAsync(bookId, onlyActive);
        return Ok(list);
    }

    [Authorize]
    [HttpGet("me/active/count")]
    public async Task<ActionResult<object>> GetActiveBorrowingsCount()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var count = await _service.GetActiveBorrowingsCountAsync(userId);
        return Ok(new { count });
    }
}
