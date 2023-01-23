const express = require("express");
const app = express();
const appRouter = require("./routes/appRoutes");
const path = require("path");
require('dotenv').config()
const staticPath = path.join(__dirname, "/public");
console.log(staticPath);

app.use(express.static(staticPath));
app.use(appRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
