import express from "express";
import coursesRoutes from "./coursesRoutes.js";
import categoriesRoutes from "./categoriesRoutes.js";
import usersRoutes from "./userRoutes.js";

module.exports = app => {
  app.route("/")
      .get((req, res) => res.status(200));

  app.use(express.json(), 
  usersRoutes, 
  coursesRoutes, 
  categoriesRoutes);
};
