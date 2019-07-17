require("dotenv").config();

var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: process.env.ROOT_PASS,
  database: "bamazon_DB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("-----------------BAMAZON-----------------");
    checkStore();
    
});

function checkStore() {
    inquirer.prompt([
        {
            type: "list",
            name: "mainMenu",
            message: "Hello, Bamazon Manager. What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }
    ]).then(function(answer) {
        switch(answer.mainMenu) {
            case "View Products for Sale":
                console.log("You picked View Products for Sale");
                viewProducts();
                break;
            
            case "View Low Inventory":
                console.log("You picked View Low Inventory");
                lowInventory();
                break;

            case "Add to Inventory":
                console.log("You picked Add to Inventory");
                addInventory();
                break;

            case "Add New Product":
                console.log("You picked Add New Product");
                addProduct();
                break;

        }

    })

}

function viewProducts() {
    var query = "SELECT item_id, product_name, price, quantity FROM products";
    connection.query(query, function(err, response) {
        if (err) throw err;
        console.log("\n-----------------ALL PRODUCTS-----------------");
        for (var i = 0; i < response.length; i++) {
            console.log(response[i].item_id + " || " + response[i].product_name + " || price: " + response[i].price.toFixed(2) + " || quantity: " + response[i].quantity);
        }
        connection.end();
    })

};

function lowInventory() {
    var query = "SELECT item_id, product_name, quantity FROM products";
    var results = 0;
    connection.query(query, function(err, response) {
        if (err) throw err;
        console.log("\n-----------------LOW STOCK-----------------");
        for (var i = 0; i < response.length; i++) {
            if (response[i].quantity <= 5) {
                console.log(response[i].item_id + " || " + response[i].product_name + " || quantity: " + response[i].quantity);
                results++;
            }
        }

        if(results === 0){
            console.log("The Bamazon Store is currently well-stocked!"); 
        }
        
        connection.end();

    })
}

function addInventory() {
    var query = "SELECT item_id, product_name, quantity FROM products";
    connection.query(query, function(err, response) {
        if (err) throw err;
        console.log("\n-----------------ADD TO STOCK-----------------");
        for (var i = 0; i < response.length; i++) {
            
            console.log("ID: " + response[i].item_id + " || " + response[i].product_name + " || quantity: " + response[i].quantity);
        }

        inquirer.prompt([
            {
                type: "input",
                name: "item",
                message: "Which item (by ID) do you want to restock?",
                validate: function(value) {
                    if (isNaN(value) === false && value <= response.length) {
                      return true;
                    }
                    return false;
                  }
            }, {
                type: "input",
                name: "restock",
                message: "How much stock do you want to add?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                      return true;
                    }
                    return false;
                  }
            }
        ]).then(function(answer) {
            var newQuery = "UPDATE products SET quantity = quantity + " + answer.restock + " WHERE item_id = " + answer.item;
            connection.query(newQuery, function(err, response) {
                if (err) throw err;
                confirmUpdates(answer.item, answer.restock);
            })
        })
        
    })
}

function confirmUpdates(itemNum, added) {
    var query = "SELECT product_name FROM products WHERE item_id = " + itemNum;
    connection.query(query, function(err, response) {
        if (err) throw err;
        console.log("You added " + added + " units of " + response[0].product_name + " to the store inventory!");
        connection.end();
    })
};

function addProduct() {
    inquirer.prompt([
        {
            type: "input",
            name: "newProduct",
            message: "Enter the name of the new product you would like to add",
            validate: function(value) {
                if (isNaN(value) === true) {
                  return true;
                }
                return false;
              }

        }, {
            type: "list",
            name: "dept",
            message: "Enter the department under which this product will be listed",
            choices: ["Clothing", "Books", "Electronics", "Office Supplies", "Toys", "Outdoors", "Sports", "Beauty", "Misc."]

        }, {
            type: "input",
            name: "price",
            message: "What is the price of this product? (Enter a number)",
            validate: function(value) {
                if (isNaN(value) === false && Number.isInteger(value) === false) {
                    value = parseFloat(Math.round(value * 100) / 100).toFixed(2);
                    return true;
                }
                return false;
              }
        }, {
            type: "input",
            name: "quantity",
            message: "How much of this product do you want the store to stock? (Whole numbers only)",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
        }
    ]).then(function(ans) {
        var addQuery = "INSERT INTO products(product_name, dept_name, price, quantity) VALUES ('" + ans.newProduct + "', '" + ans.dept + "', '" + ans.price + "', '" + ans.quantity + "')";
        connection.query(addQuery, function(err, res) {
            if (err) throw err;
            console.log("You added " + ans.newProduct + " to the Bamazon store!");
            connection.end();
        })
    })
    
}


