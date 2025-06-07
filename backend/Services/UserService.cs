using backend.Data;
using backend.Dtos;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Services;

public class UserService
{
    private readonly ApplicationDbContext _context;

    public UserService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<PagedResult<UserDto>> GetAllAsync(UserQueryParams query)
    {
        var users = _context.Users.AsQueryable();

        if (!string.IsNullOrWhiteSpace(query.Username))
            users = users.Where(u => u.Username.ToLower().Contains(query.Username.ToLower()));

        var totalCount = await users.CountAsync();

        var items = await users
            .OrderBy(u => u.Username)
            .Skip((query.Page - 1) * query.PageSize)
            .Take(query.PageSize)
            .Select(u => new UserDto
            {
                Id = u.Id,
                Username = u.Username,
                Email = u.Email,
                Role = u.Role.ToString()
            })
            .ToListAsync();

        return new PagedResult<UserDto>
        {
            Items = items,
            TotalCount = totalCount
        };
    }
}
