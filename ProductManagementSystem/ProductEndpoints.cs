using ProductManagementSystem.Models;
using ProductManagementSystem.Models.Dtos;
using ProductManagementSystem.Repositories;

namespace ProductManagementSystem
{
    public static class ProductEndpoints
{
    public static RouteGroupBuilder MapProductEndpoints(this RouteGroupBuilder group)
    {
        group.MapGet("/", async (IProductRepository repo, string search) =>
            await repo.GetAllProductsAsync(search != null ? p => p.Name.Contains(search) : null));

        group.MapGet("/{id:int}", async (IProductRepository repo, int id) =>
        {
            var product = await repo.GetProductByIdAsync(id);
            return product is not null ? Results.Ok(product) : Results.NotFound();
        });

        group.MapPost("/", async (IProductRepository repo, ProductDto dto) =>
        {
            var newProduct = new Product
            {
                Name = dto.Name,
                Description = dto.Description,
                Price = dto.Price
            };
            var createdProduct = await repo.CreateProductAsync(newProduct);
            return Results.Created($"/products/{createdProduct.Id}", createdProduct);
        });

        group.MapPut("/{id:int}", async (IProductRepository repo, int id, ProductDto dto) =>
        {
            var product = new Product
            {
                Id = id,
                Name = dto.Name,
                Description = dto.Description,
                Price = dto.Price
            };
            var updatedProduct = await repo.UpdateProductAsync(product);
            return updatedProduct is not null ? Results.Ok(updatedProduct) : Results.NotFound();
        });

        group.MapDelete("/{id:int}", async (IProductRepository repo, int id) =>
            await repo.DeleteProductAsync(id) ? Results.Ok() : Results.NotFound());

        return group;
    }
}

}