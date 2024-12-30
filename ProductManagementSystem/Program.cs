using Microsoft.EntityFrameworkCore;
using ProductManagementSystem.Data;
using ProductManagementSystem.Models;
using ProductManagementSystem.Models.Dtos;
using ProductManagementSystem.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IProductRepository, ProductRepository>();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:4200")  
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

app.UseCors("AllowFrontend");


app.MapGet("/products", async (IProductRepository repo, string search) =>
    await repo.GetAllProductsAsync(search != null ? p => p.Name.Contains(search) : null));

app.MapGet("/products/{id}", async (IProductRepository repo, int id) =>
{
    var product = await repo.GetProductByIdAsync(id);
    return product is not null ? Results.Ok(product) : Results.NotFound();
});

app.MapPost("/products", async (IProductRepository repo, ProductDto product) =>
{
    var newProduct = new Product
    {
        Name = product.Name,
        Description = product.Description,
        Price = product.Price
    };
    var createdProduct = await repo.CreateProductAsync(newProduct);
    return Results.Created($"/products/{createdProduct.Id}", createdProduct);
});

app.MapPut("/products/{id}", async (IProductRepository repo, int id, ProductDto dto) =>
{
    var product = new Product
    {
        Id = id,
        Name = dto.Name,
        Description = dto.Description,
        Price = dto.Price
    };
    if (id != product.Id) return Results.BadRequest();

    var updatedProduct = await repo.UpdateProductAsync(product);
    return updatedProduct is not null ? Results.Ok(updatedProduct) : Results.NotFound();
});

app.MapDelete("/products/{id}", async (IProductRepository repo, int id) =>
    await repo.DeleteProductAsync(id) ? Results.Ok() : Results.NotFound());




if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.Run();

