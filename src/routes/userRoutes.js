import express from "express";

const router = express.Router();

moodule.exports = app => {
  app.route("/users")
      .post(app.controllers.createUser);

  app.route("/users/:id")
      .get(app.controllers.getUser)
      .put(app.controllers.updateUser)
      .delete(app.controllers.deleteUser);
};

// router.post('/users', UserController.createUser);
// router.get('/users/:id', UserController.getUserById);
// router.put('/users/:id', UserController.updateUser);
// router.delete('/users/:id', UserController.deleteUser);

// export default router;