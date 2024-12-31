# Product Management System

A simple product management system built using .NET 8 Web **Minimal API** for the backend and Angular 19 with standalone components for the frontend.


### Installation

#### Backend

1. Clone the repository:
   ```bash
   git clone https://github.com/MohamedHazem5/UrWave-Product-Managment-Task.git
   cd ProductManagementSystem
   ```

2. Restore NuGet packages:
   ```bash
   dotnet restore
   ```

3. Update `appsettings.json` with your database connection string. [I use Local Database] 

4. Run the database migration:
   ```bash
   dotnet ef database update
   ```

5. Start the application:
   ```bash
   dotnet run
   ```

#### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd product-management-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   ng serve
   ```

### Access the Application

- Open your browser and navigate to: [http://localhost:4200](http://localhost:4200)

![Create Product Page](images/create_product.png)


## Back-End Features
- Minimal API for a lightweight, modern approach
- Repository Pattern
- Logging
- Unit Tests
- Error Handling Middleware
- Simple validation using FluentValidation
- Uses request/response DTOs
- Make endpoint groups for organization

## Front-End Features
1. **Products List Page**
   - Display products using PrimeNG Datatable.
   - Columns: ID, Name, Description, Price, Created Date.
   - Search by product name and sorting for all columns.
   - Sorting for all columns
   - Loading indicator [Bonus]
   - Price range filter [Bonus]
   - Image Url Preview [Bonus]
   ![Products List Page](images/products_list.png)

2. **Create Product Page**
   - Form fields: Name, Description, Price (with validations).
   - Validation: Required fields, max character limits, and positive price value.
   - Notifications: Success and validation error messages.

   ![Create Product Page](images/create_product.png)

3. **Edit Product Page**
   - Pre-filled form with product data for editing.
   - Same validations as the Create Product Page.
   - Notifications: Success/Error messages.

   ![Edit Product Page](images/edit_product.png)

4. **Delete Product**
   - Confirmation dialog before deletion.
   - Notifications: Success/Error messages.

   ![Delete Product](images/delete_product.png)

## Setup Instructions

### Prerequisites

- **Backend**
  - .NET 8 SDK
  - SQL Server (Express or Developer Edition)
  - Entity Framework Core

- **Frontend**
  - Node.js (Latest LTS version)
  - Angular CLI

## Bonus Features

1. **Loading Indicators**
   - Added during API calls.

   ![Loading Indicators](images/loading_indicators.png)

2. **Product Image URL Field**
   - Added a field for product image URLs and displayed images in the product list.

   ![Product Images](images/product_images.png)

3. **Price Range Filter**
   - Enabled filtering products by price range.

   ![Price Range Filter](images/price_range_filter.png)

4. **Basic Unit Tests**
   - Included tests for critical functionality.

   ![Unit Tests](images/unit_tests.png)

## Submission Details

- GitHub Repository URL: [Your Repository URL](https://github.com/your-repo-url)
- Database Creation Script: Included in the repository.

## Technical Overview

### Backend

- **Framework**: .NET 8 Web Minimal API
- **Database**: SQL Server
- **Libraries**:
  - FluentValidation for request validation.
  - Middleware for error handling.

### Frontend

- **Framework**: Angular 19
- **Styling**: Basic CSS
- **Libraries**:
  - PrimeNG components for UI.

---


