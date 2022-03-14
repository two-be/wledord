using Microsoft.EntityFrameworkCore;
using Wledord.Models;

namespace Wledord.Data;

public class AppDbContext : DbContext
{
    public DbSet<WordInfo> Words { get; set; }

    public AppDbContext (DbContextOptions<AppDbContext> options) : base(options) { }
}