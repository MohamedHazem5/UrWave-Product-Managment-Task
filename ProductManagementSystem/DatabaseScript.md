## Step 1: Create the database
```bash
CREATE DATABASE UrWaveProductDB;
```
## Step 2: Switch to the newly created database
```bash
USE UrWaveProductDB;
```
## Step 3: Create the Product table
```bash
CREATE TABLE Product (
    Id INT PRIMARY KEY IDENTITY(1,1), -- Auto-incrementing primary key
    Name NVARCHAR(255) NOT NULL,       -- Product name (max length of 255 characters)
    Description NVARCHAR(MAX) NOT NULL, -- Product description (can store large text)
    Price FLOAT NOT NULL,              -- Product price
    CreatedDate DATETIME NOT NULL DEFAULT GETUTCDATE(), -- Created date (defaults to UTC now)
    ImageUrl NVARCHAR(2083) NOT NULL   -- Image URL (maximum length of URL allowed in SQL Server)
);
```
## Step 4: Verify the table and sample data
```bash
SELECT * FROM Product;
```