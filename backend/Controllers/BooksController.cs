using backend.Dtos;
using backend.Services;
using backend.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("api/books")]
public class BooksController : ControllerBase
{
    private readonly BookService _service;

    public BooksController(BookService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<BookDto>>> GetBooks([FromQuery] BookQueryParams query)
    {
        var books = await _service.GetFilteredAsync(query);
        return Ok(books);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<BookDto>> GetBook(int id)
    {
        var book = await _service.GetByIdAsync(id);
        return book == null ? NotFound() : Ok(book);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<BookDto>> CreateBook([FromBody] CreateBookDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var created = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetBook), new { id = created.Id }, created);
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateBook(int id, [FromBody] UpdateBookDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var success = await _service.UpdateAsync(id, dto);
        return success ? NoContent() : NotFound();
    }

    [Authorize]
    [HttpPatch("{id}/status")]
    public async Task<IActionResult> UpdateBookStatus(int id, [FromBody] UpdateBookStatusDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var success = await _service.UpdateStatusAsync(id, dto);
        return success ? NoContent() : NotFound();
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBook(int id)
    {
        var success = await _service.DeleteAsync(id);
        return success ? NoContent() : NotFound();
    }

    [Authorize(Roles = "Admin")]
    [HttpGet("export")]
    public async Task<IActionResult> ExportBooks([FromServices] ExportService exportService, [FromServices] ApplicationDbContext context)
    {
        var books = await context.Books.ToListAsync();
        var csv = exportService.ExportBooksToCsv(books);
        return File(Encoding.UTF8.GetBytes(csv), "text/csv", "books.csv");
    }

    [Authorize(Roles = "Admin")]
    [HttpGet("{id}/borrowings")]
    public async Task<ActionResult<IEnumerable<BorrowingForBookDto>>> GetBorrowingsForBook(int id, [FromQuery] bool onlyActive = false)
    {
        var result = await _service.GetBorrowingsForBookAsync(id, onlyActive);
        return Ok(result);
    }

}
