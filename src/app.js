const express = require("express");
const conectdatabase = require("./config/dbConnect.js");
const routes = require("./routes/index.js");

const connection = conectdatabase();

connection.on("error", (erro) => {
  console.error.bind(console, 'MongoDB connection error: ' + erro);
});

connection.once("open", () => {
  console.log("conexao com banco feita com sucesso");
});

const app = express();
routes(app);

module.exports = app;


// require('dotenv').config();
// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(bodyParser.json());

// // Rotas
// const authRoutes = require('./routes/auth');
// const courseRoutes = require('./routes/courses');

// app.use('/auth', authRoutes);
// app.use('/courses', courseRoutes);

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });