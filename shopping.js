const express = require("express")
const app = express();
const itemsRoutes = require("./routes/items")
const ExpressError = require("./expressError")

app.use(express.json());
app.use("/items", itemsRoutes);

/** 404 handler */

app.use(function (req, res, next) {
  return new ExpressError("Not Found", 404);
});

/** general error handler */

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({
    error: err.message,
  });
});

module.exports = app

/** ExpressError extends the normal JS error so we can easily
 *  add a status when we make an instance of it.
 *
 *  The error-handling middleware will return this.
 */

class ExpressError extends Error {
    constructor(message, status) {
      super();
      this.message = message;
      this.status = status;
      console.error(this.stack);
    }
  }
  
  
  module.exports = ExpressError;

  /** Item in a shopping cart. */
const items = require("./fakeDb")

class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;

    // keep track of all items
    items.push(this);
  }

  static findAll(){
    return items
  }
  /** Update found item with matching name to data. */

  static update(name, data) {
    let foundItem = Item.find(name);
    if (foundItem === undefined) {
      throw {message: "Not Found", status: 404}
    }
    foundItem.name = data.name;
    foundItem.price = data.price;

    return foundItem;
  }

  /** Find & return item with matching name. */

  static find(name) {
    const foundItem = items.find(v => v.name === name);
    if(foundItem === undefined){
      throw { message: "Not Found", status: 404 }
    }
    return foundItem
  }

  /** Remove item with matching id. */


  static remove(name) {
    let foundIdx = items.findIndex(v => v.name === name);
    if (foundIdx === -1) {
      throw {message: "Not Found", status: 404}
    }
    items.splice(foundIdx, 1);
  }
}

module.exports = Item;





