using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;
using ProductManagementSystem.Models.Dtos;

namespace ProductManagementSystem.Validations
{
public class ProductDtoValidator : AbstractValidator<ProductDto>
{
    public ProductDtoValidator()
    {
        RuleFor(p => p.Name).NotEmpty().WithMessage("Product name is required.");
        RuleFor(p => p.Price).GreaterThan(0).WithMessage("Price must be greater than zero.");
    }
}
}