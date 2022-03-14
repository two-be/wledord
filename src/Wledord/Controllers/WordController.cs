using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Wledord.Data;
using Wledord.Models;

namespace Wledord.Controllers;

[ApiController]
[Route("[controller]")]
public class WordController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly HttpClient _http;

    public WordController(AppDbContext context, HttpClient http)
    {
        _context = context;
        _http = http;
    }

    [HttpGet]
    public async Task<IActionResult> Get() {
        try {
            var words = await _context.Words.Where(x => x.Name.Length == 5).Select(x => x.Name.ToUpper()).ToListAsync();
            return Ok(words);
        } catch (Exception ex) {
            return StatusCode(500, ex.InnerException?.Message ?? ex.Message);
        }
    }

    [HttpPut]
    public async Task<IActionResult> PutForInitialize()
    {
        try
        {
            var rs = await _http.GetAsync("https://random-word-api.herokuapp.com/all");
            var content = await rs.Content.ReadFromJsonAsync<List<string>>();
            var words = content.Select(x =>
            {
                return new WordInfo
                {
                    Name = x,
                };
            });
            await _context.Words.AddRangeAsync(words);
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.InnerException?.Message ?? ex.Message);
        }
    }
}