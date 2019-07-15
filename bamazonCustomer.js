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
    startStore();
});

function startStore() {
    var query = "SELECT item_id, product_name, dept_name, price FROM products";
    connection.query(query, function(err, response) {
        if (err) throw err;
        for (var i = 0; i < response.length; i++) {
            console.log(response[i].item_id + " || " + response[i].product_name + " || price: " + response[i].price);
        }
        
        inquirer.prompt([
            {
                name: "select",
                type: "input",
                message: "Welcome to Bamazon! What is the product ID of the item you want to buy?",
                validate: function(value) {
                    if (isNaN(value) === false && value <= response.length) {
                      return true;
                    }
                    return false;
                  }
            }, {
                name: "amount",
                type: "input",
                message: "How many units would you like to buy?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                      return true;
                    }
                    return false;
                  }
                
            }
        ]).then(function(ans) {
            //var purchased = response[ans.select - 1].product_name;
            //var price = response[ans.select - 1].price;

            checkInventory(ans.select, ans.amount);
            
        });
        
    })
    
};

function checkInventory(purchase_id, bought) {
    connection.query("SELECT item_id, product_name, price, quantity FROM products WHERE item_id = " + purchase_id,
    function(err, res) {
        if (err) throw err;
        //console.log(res[0].quantity);
        if (res[0].quantity >= bought) {
            console.log("The item " + res[0].product_name + " is in stock");
            updateTable(res[0].product_name, res[0].item_id, bought, res[0].price);
        } else {
            console.log("Insufficient inventory! Please Make another purchase at BAMAZON");
            startStore();
        }
    })
}

function updateTable(purchased_item, purchased_num, bought, price) {
    connection.query(
        "UPDATE products SET quantity = quantity - " + bought + " WHERE item_id = " + purchased_num,
        function(err, res) {
            if (err) throw err;
            console.log("You bought " + bought + " unit(s) of " + purchased_item);
            console.log("Your amount due is $" + (bought * price) + "\n");
            connection.end();
        }
    )  
       
}
