using Microsoft.EntityFrameworkCore;
using Moq;
using ProductManagementSystem.Data;
using ProductManagementSystem.Models;
using ProductManagementSystem.Repositories;
using Xunit;

namespace ProductManagementSystem.Tests
{
    public class ProductRepositoryTests
    {
        private readonly Mock<ApplicationDbContext> _dbContextMock;
        private readonly Mock<ILogger<ProductRepository>> _loggerMock;
        private readonly ProductRepository _repository;

        public ProductRepositoryTests()
        {
            _dbContextMock = new Mock<ApplicationDbContext>();
            _loggerMock = new Mock<ILogger<ProductRepository>>();
            _repository = new ProductRepository(_dbContextMock.Object, _loggerMock.Object);
        }

        [Fact]
        public async Task GetAllProductsAsync_ShouldReturnProducts()
        {
            // Arrange
            var products = new List<Product>
            {
                new Product { Id = 1, Name = "Product 1", Description = "Description 1", Price = 100 },
                new Product { Id = 2, Name = "Product 2", Description = "Description 2", Price = 200 }
            };

            var dbSetMock = CreateDbSetMock(products);
            _dbContextMock.Setup(x => x.Products).Returns(dbSetMock.Object);

            // Act
            var result = await _repository.GetAllProductsAsync();

            // Assert
            Assert.Equal(2, result.Count());
            _loggerMock.Verify(x => x.LogInformation(It.IsAny<string>(), It.IsAny<object[]>()), Times.AtLeastOnce);
        }

        [Fact]
        public async Task GetProductByIdAsync_ShouldReturnProduct_WhenProductExists()
        {
            // Arrange
            var product = new Product { Id = 1, Name = "Product 1", Description = "Description 1", Price = 100 };

            var dbSetMock = CreateDbSetMock(new List<Product> { product });
            _dbContextMock.Setup(x => x.Products).Returns(dbSetMock.Object);

            // Act
            var result = await _repository.GetProductByIdAsync(1);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(product.Id, result.Id);
            _loggerMock.Verify(x => x.LogInformation(It.IsAny<string>(), It.IsAny<object[]>()), Times.AtLeastOnce);
        }

        [Fact]
        public async Task GetProductByIdAsync_ShouldReturnNull_WhenProductDoesNotExist()
        {
            // Arrange
            var dbSetMock = CreateDbSetMock(new List<Product>());
            _dbContextMock.Setup(x => x.Products).Returns(dbSetMock.Object);

            // Act
            var result = await _repository.GetProductByIdAsync(1);

            // Assert
            Assert.Null(result);
            _loggerMock.Verify(x => x.LogWarning(It.IsAny<string>(), It.IsAny<object[]>()), Times.Once);
        }

        [Fact]
        public async Task CreateProductAsync_ShouldAddProductAndSaveChanges()
        {
            // Arrange
            var product = new Product { Name = "New Product", Description = "New Description", Price = 150 };

            var dbSetMock = CreateDbSetMock(new List<Product>());
            _dbContextMock.Setup(x => x.Products).Returns(dbSetMock.Object);

            // Act
            var result = await _repository.CreateProductAsync(product);

            // Assert
            _dbContextMock.Verify(x => x.SaveChangesAsync(default), Times.Once);
            Assert.Equal(product.Name, result.Name);
            _loggerMock.Verify(x => x.LogInformation(It.IsAny<string>(), It.IsAny<object[]>()), Times.Once);
        }

        [Fact]
        public async Task UpdateProductAsync_ShouldUpdateAndSaveChanges_WhenProductExists()
        {
            // Arrange
            var product = new Product { Id = 1, Name = "Old Product", Description = "Old Description", Price = 100 };
            var updatedProduct = new Product { Id = 1, Name = "Updated Product", Description = "Updated Description", Price = 200 };

            var dbSetMock = CreateDbSetMock(new List<Product> { product });
            _dbContextMock.Setup(x => x.Products).Returns(dbSetMock.Object);

            // Act
            var result = await _repository.UpdateProductAsync(updatedProduct);

            // Assert
            Assert.NotNull(result);
            Assert.Equal("Updated Product", result.Name);
            _dbContextMock.Verify(x => x.SaveChangesAsync(default), Times.Once);
            _loggerMock.Verify(x => x.LogInformation(It.IsAny<string>(), It.IsAny<object[]>()), Times.Once);
        }

        [Fact]
        public async Task UpdateProductAsync_ShouldReturnNull_WhenProductDoesNotExist()
        {
            // Arrange
            var dbSetMock = CreateDbSetMock(new List<Product>());
            _dbContextMock.Setup(x => x.Products).Returns(dbSetMock.Object);

            var updatedProduct = new Product { Id = 1, Name = "Updated Product", Description = "Updated Description", Price = 200 };

            // Act
            var result = await _repository.UpdateProductAsync(updatedProduct);

            // Assert
            Assert.Null(result);
            _loggerMock.Verify(x => x.LogWarning(It.IsAny<string>(), It.IsAny<object[]>()), Times.Once);
        }

        [Fact]
        public async Task DeleteProductAsync_ShouldRemoveProductAndSaveChanges_WhenProductExists()
        {
            // Arrange
            var product = new Product { Id = 1, Name = "Product 1", Description = "Description 1", Price = 100 };

            var dbSetMock = CreateDbSetMock(new List<Product> { product });
            _dbContextMock.Setup(x => x.Products).Returns(dbSetMock.Object);

            // Act
            var result = await _repository.DeleteProductAsync(1);

            // Assert
            Assert.True(result);
            _dbContextMock.Verify(x => x.SaveChangesAsync(default), Times.Once);
            _loggerMock.Verify(x => x.LogInformation(It.IsAny<string>(), It.IsAny<object[]>()), Times.Once);
        }

        [Fact]
        public async Task DeleteProductAsync_ShouldReturnFalse_WhenProductDoesNotExist()
        {
            // Arrange
            var dbSetMock = CreateDbSetMock(new List<Product>());
            _dbContextMock.Setup(x => x.Products).Returns(dbSetMock.Object);

            // Act
            var result = await _repository.DeleteProductAsync(1);

            // Assert
            Assert.False(result);
            _loggerMock.Verify(x => x.LogWarning(It.IsAny<string>(), It.IsAny<object[]>()), Times.Once);
        }

        private static Mock<DbSet<T>> CreateDbSetMock<T>(IEnumerable<T> entities) where T : class
        {
            var queryable = entities.AsQueryable();
            var dbSetMock = new Mock<DbSet<T>>();
            dbSetMock.As<IQueryable<T>>().Setup(m => m.Provider).Returns(queryable.Provider);
            dbSetMock.As<IQueryable<T>>().Setup(m => m.Expression).Returns(queryable.Expression);
            dbSetMock.As<IQueryable<T>>().Setup(m => m.ElementType).Returns(queryable.ElementType);
            dbSetMock.As<IQueryable<T>>().Setup(m => m.GetEnumerator()).Returns(queryable.GetEnumerator());
            return dbSetMock;
        }
    }
}