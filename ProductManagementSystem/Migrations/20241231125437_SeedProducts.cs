using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ProductManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class SeedProducts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "CreatedDate", "Description", "ImageUrl", "Name", "Price" },
                values: new object[,]
                {
                    { 1, new DateTime(2024, 12, 31, 12, 54, 37, 347, DateTimeKind.Utc).AddTicks(5809), "Wireless headphones with noise-canceling technology for a high-quality listening experience.", "https://images-cdn.ubuy.co.in/64cbbee91a56505f2c3a830e-bose-quietcomfort-45-headphones-noise.jpg", "Bose QuietComfort 45", 329.99000000000001 },
                    { 2, new DateTime(2024, 12, 31, 12, 54, 37, 347, DateTimeKind.Utc).AddTicks(6894), "Smartwatch with advanced health features and always-on display, compatible with iPhone.", "https://m.media-amazon.com/images/I/71sLCEpm9aL._AC_SL1500_.jpg", "Apple Watch Series 9", 399.99000000000001 },
                    { 3, new DateTime(2024, 12, 31, 12, 54, 37, 347, DateTimeKind.Utc).AddTicks(6896), "High-quality coffee maker with strong brew, iced coffee, and programmable settings.", "https://i.insider.com/64d2495620f1cf0019ccf203?width=700", "Keurig K-Elite Coffee Maker", 129.99000000000001 },
                    { 4, new DateTime(2024, 12, 31, 12, 54, 37, 347, DateTimeKind.Utc).AddTicks(6897), "Next-generation gaming console with high-speed SSD and immersive gameplay.", "https://gmedia.playstation.com/is/image/SIEPDC/ps5-pro-dualsense-image-block-01-en-16aug24?$facebook$", "PlayStation 5", 499.99000000000001 },
                    { 5, new DateTime(2024, 12, 31, 12, 54, 37, 347, DateTimeKind.Utc).AddTicks(6897), "Electric scooter with long battery life and powerful motor, ideal for city commuting.", "https://xprs.s3.eu-west-3.amazonaws.com/media/product_images/Screen_Shot_2023-02-02_at_3.20.36_PM.png", "Xiaomi Mi Electric Scooter Pro 2", 499.99000000000001 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5);
        }
    }
}
