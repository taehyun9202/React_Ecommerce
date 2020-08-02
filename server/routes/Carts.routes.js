const Carts = require("../controllers/Carts.controllers");
const { authenticate } = require("../config/jwt");

module.exports = app => {   
    app.get("/api/carts", Carts.getAll);
    app.post("/api/carts", Carts.addtoCart);
    app.get("/api/carts/:userid", Carts.getList);
    app.delete("/api/carts/:_id", Carts.delete);
    app.put('/api/carts/:_id', Carts.update);
}
