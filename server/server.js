const express = require("express");
const cors = require("cors");
const port = 8000;
const cookieParser = require("cookie-parser");
const db_name = "5"
const app = express();


app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());

require("./config/mongoose")(db_name);
require("./routes/Products.routes")(app);
require("./routes/Users.routes")(app);
require("./routes/Options.routes")(app);
require("./routes/Carts.routes")(app);
require("./routes/Histories.routes")(app);

app.listen(port, ()=> console.log(`Listening on port ${port}`))
