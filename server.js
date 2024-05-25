const app = require("./src/app.js");
const db = require("./src/config/dbConnect.js").default.default;

const consign = require('consign');

app.db = db;

consign()
  .then('src/config/middlewares.js')
  .then('src/utils/validation.js')
  .then('src/controllers')
  .then('src/routes/index.js')
  .into(app);


const PORT = 3000;

app.listen(PORT, () => {
  console.log("Server is running");
});
