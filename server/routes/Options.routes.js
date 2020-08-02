const Options = require("../controllers/Options.controllers");
module.exports = app => {
    app.get("/api/options/", Options.getAll);
    app.post("/api/options/add", Options.create);
    app.get("/api/options/:_id", Options.getList);
    app.get("/api/options/:_id", Options.getOne);
    app.delete("/api/options/:_id", Options.delete);
}