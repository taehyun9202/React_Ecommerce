const Products = require("../controllers/Products.controllers");
const { authenticate } = require("../config/jwt");
module.exports = app => {
    app.get("/api/products", Products.getAll);
    app.post("/api/products/add", Products.create);
    app.get("/api/products/:_id", Products.getOne);
    app.delete("/api/products/:_id", Products.delete);
}

