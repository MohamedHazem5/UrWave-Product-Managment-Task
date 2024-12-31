using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using ProductManagementSystem.Models;

namespace ProductManagementSystem.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Product> Products { get; set; } = null!;
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.ConfigureWarnings(warnings => warnings.Ignore(RelationalEventId.PendingModelChangesWarning));
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>(entity =>
            {
                entity.Property(p => p.Name).IsRequired().HasMaxLength(100);
                entity.Property(p => p.Description).IsRequired().HasMaxLength(500);
                entity.Property(p => p.Price).IsRequired();
            });

            // Seeding data for products
            modelBuilder.Entity<Product>().HasData(
                new Product
                {
                    Id = 1,
                    Name = "Bose QuietComfort 45",
                    Description = "Wireless headphones with noise-canceling technology for a high-quality listening experience.",
                    Price = 329.99,
                    ImageUrl = "https://images-cdn.ubuy.co.in/64cbbee91a56505f2c3a830e-bose-quietcomfort-45-headphones-noise.jpg"
                },
                new Product
                {
                    Id = 2,
                    Name = "Apple Watch Series 9",
                    Description = "Smartwatch with advanced health features and always-on display, compatible with iPhone.",
                    Price = 399.99,
                    ImageUrl = "https://m.media-amazon.com/images/I/71sLCEpm9aL._AC_SL1500_.jpg"
                },
                new Product
                {
                    Id = 3,
                    Name = "Keurig K-Elite Coffee Maker",
                    Description = "High-quality coffee maker with strong brew, iced coffee, and programmable settings.",
                    Price = 129.99,
                    ImageUrl = "https://i.insider.com/64d2495620f1cf0019ccf203?width=700"
                },
                new Product
                {
                    Id = 4,
                    Name = "PlayStation 5",
                    Description = "Next-generation gaming console with high-speed SSD and immersive gameplay.",
                    Price = 499.99,
                    ImageUrl = "https://gmedia.playstation.com/is/image/SIEPDC/ps5-pro-dualsense-image-block-01-en-16aug24?$facebook$"
                },
                new Product
                {
                    Id = 5,
                    Name = "Xiaomi Mi Electric Scooter Pro 2",
                    Description = "Electric scooter with long battery life and powerful motor, ideal for city commuting.",
                    Price = 499.99,
                    ImageUrl = "https://xprs.s3.eu-west-3.amazonaws.com/media/product_images/Screen_Shot_2023-02-02_at_3.20.36_PM.png"
                }
            );
        }
    }
}