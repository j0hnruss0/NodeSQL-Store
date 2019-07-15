DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NULL,
    dept_name VARCHAR(50) NULL,
    price DECIMAL(10,2) NULL,
    quantity INT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, dept_name, price, quantity)
VALUES ("T-Shirt", "Clothing", 10.00, 100),
("Jeans", "Clothing", 30.00, 100),
("Computer", "Electronics", 300.00, 50),
("Pencils (20-pack)", "Office Supplies", 5.00, 300),
("Ink Cartridge", "Office Supplies", 40.00, 50),
("Action Figure", "Toys", 20.00, 70),
("Shovel", "Outdoors", 25.00, 60),
("Lipstick (Ruby Red)", "Beauty", 15.00, 90),
("Mouse", "Electronics", 10.00, 65),
("Gaming Controller (PC)", "Electronics", 20.00, 45);

SELECT * FROM products;