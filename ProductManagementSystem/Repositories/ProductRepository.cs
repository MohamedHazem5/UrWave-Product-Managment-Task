using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using ProductManagementSystem.Data;
using ProductManagementSystem.Models;

namespace ProductManagementSystem.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<ProductRepository> _logger;

        public ProductRepository(ApplicationDbContext context, ILogger<ProductRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<IEnumerable<Product>> GetAllProductsAsync(Expression<Func<Product, bool>> filter = null, params Expression<Func<Product, object>>[] includeProperties)
        {
            try
            {
                _logger.LogInformation("Getting all products with filter: {Filter}", filter);

                var query = filter != null ? _context.Products.Where(filter) : _context.Products;

                if (includeProperties != null)
                {
                    _logger.LogInformation("Including properties: {Properties}", includeProperties.Select(p => p.Body.ToString()));
                    query = includeProperties.Aggregate(query, (record, property) => record.Include(property));
                }

                var products = await query.ToListAsync();
                _logger.LogInformation("Retrieved {Count} products.", products.Count);
                return products;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while getting all products.");
                throw;
            }
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            try
            {
                _logger.LogInformation("Getting product by ID: {Id}", id);
                var product = await _context.Products.FindAsync(id);
                if (product == null)
                {
                    _logger.LogWarning("Product with ID {Id} not found.", id);
                }
                else
                {
                    _logger.LogInformation("Product retrieved: {Product}", product);
                }

                return product;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while getting the product by ID: {Id}.", id);
                throw;
            }
        }

        public async Task<Product> CreateProductAsync(Product product)
        {
            try
            {
                _logger.LogInformation("Creating a new product: {Product}", product);
                _context.Products.Add(product);
                await _context.SaveChangesAsync();
                _logger.LogInformation("Product created with ID: {Id}", product.Id);
                return product;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while creating a new product.");
                throw;
            }
        }

        public async Task<Product> UpdateProductAsync(Product product)
        {
            try
            {
                _logger.LogInformation("Updating product with ID: {Id}", product.Id);
                var existingProduct = await _context.Products.FindAsync(product.Id);
                if (existingProduct == null)
                {
                    _logger.LogWarning("Product with ID {Id} not found for update.", product.Id);
                    return null;
                }

                existingProduct.Name = product.Name;
                existingProduct.Description = product.Description;
                existingProduct.Price = product.Price;

                await _context.SaveChangesAsync();
                _logger.LogInformation("Product with ID {Id} updated successfully.", product.Id);
                return existingProduct;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while updating product with ID: {Id}.", product.Id);
                throw;
            }
        }

        public async Task<bool> DeleteProductAsync(int id)
        {
            try
            {
                _logger.LogInformation("Deleting product with ID: {Id}", id);
                var product = await _context.Products.FindAsync(id);
                if (product == null)
                {
                    _logger.LogWarning("Product with ID {Id} not found for deletion.", id);
                    return false;
                }

                _context.Products.Remove(product);
                await _context.SaveChangesAsync();
                _logger.LogInformation("Product with ID {Id} deleted successfully.", id);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while deleting product with ID: {Id}.", id);
                throw;
            }
        }
    }
}
