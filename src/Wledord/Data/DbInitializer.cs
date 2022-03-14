namespace Wledord.Data;

public static class DbInitializer
{
    public static void Initialize(AppDbContext context)
    {
        Directory.CreateDirectory("./database");
        context.Database.EnsureCreated();
    }
}