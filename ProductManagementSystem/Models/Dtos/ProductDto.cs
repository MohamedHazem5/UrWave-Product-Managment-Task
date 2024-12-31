namespace ProductManagementSystem.Models.Dtos
{
    public class ProductDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public double Price { get; set; }

        // Bonus
        public string ImageUrl { get; set; } = string.Empty;
    }
}