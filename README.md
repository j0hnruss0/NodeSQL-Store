# NodeSQL-Store

The Bamazon Online Store!

Mock Amazon-like CLI App, powered with Node and MySQL

Installed packages include mysql and inquirer

When you start up the app by entering "node bamzonCustomer", you see a list of items for sale. If something strikes your fancy, just enter the number to the left of the item you want in the CLI, then enter how many you want to buy. If there's enough of the product in stock, your purchase will go through and you'll be prompted a bill! If the item is out of stock, you will go back to the main shopping menu

You will need your own mySQLWorkbench with a root password and server port to use the app yourself

ADDED: Updating database functionality:

Run "node bamazonManager" in the terminal to see a list of options:

* "View Products for Sale": Similar to what original app could do but with some more data returned including item IDs and the stock of each item
* "View Low Inventory": See which items are low in supply (less than 5 units)
* "Add to Inventory": Update the stock of any item shown
* "Add New Product": Add new items to the list. You can set everything from name of product, it's department, price, and initial quantity in stock

### Demo for Bamazon CLI App

![Demo1](bamazon-demo.gif)

![Demo2](Node-SQL-Store-Demo.gif)
