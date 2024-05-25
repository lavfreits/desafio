import { User } from "../models/User.js";
const bcrypt = require('bcryptjs');






// class UserController {

//   static async listarUseres(req, res) {
//     try {
//       const listaUsers = await User.find({});
//       res.status(200).json(listaUsers);
//     }
//     catch (e) {
//       res.status(500).json({ message: `${e.message} - falha na requisicao` });
//     }
//   }

//   static async listarUserPorId (req, res) {
//     try {
//       const id = req.params.id;
//       const UserEncontrado = await User.findById(id);
//       res.status(200).json(UserEncontrado);
//     } catch (erro) {
//       res.status(500).json({ message: `${erro.message} - falha na requisição do User` });
//     }
//   };

//   static async cadastrarUser(req, res) {
//     try {
//       const novoUser = await User.create(req.body);
//       res.status(201).json({ message: "sucesso, User cadastrado", User: novoUser });

//     } catch (error) {
//       res.status(500).json({ message: `${error.message} - falha ao cadastrar User` });
//     }
//   }

//   static async atualizarUser(req, res) {
//     try {
//       const id = req.params.id;
//       await User.findByIdAndUpdate(id, req.body);
//       res.status(200).json({message: "User atualizado"});
//     }
//     catch (e) {
//       res.status(500).json({ message: `${e.message} - falha na atualizacao do User` });
//     }
//   }

//   static async apagarUser(req, res) {
//     try {
//       const id = req.params.id;
//       await User.findByIdAndDelete(id);
//       res.status(200).json({message: "User apagado"});
//     }
//     catch (e) {
//       res.status(500).json({ message: `${e.message} - falha na exclusao do User` });
//     }
//   }
// };

//  export default UserController;



// // controllers/UserController.js
// import { User } from '../models/User.js';

module.exports = app => {
  const { existsOrError, notExistsOrError, equalsOrError } = app.utils.validation;

  const encryptPassword = password => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };

  const createUser = async (req, res) => {
    const user = await User.create(req.body);
    if (req.params.id) user.id = req.params.id;

    try {
      existsOrError(user.name, 'Name not informed');
      existsOrError(user.email, 'Email not informed');
      existsOrError(user.password, 'Password not informed');
      existsOrError(user.confirmPassword, 'Password confirmation invalid');
      equalsOrError(user.password, user.confirmPassword, 'Passwords do not match');

      const userFromDB = await app.db('users')
        .where({ email: user.email }).first();
      if (!user.id) {
        notExistsOrError(userFromDB, 'User already registered');
      }

    } catch (msg) {
      return res.status(400).send(msg);
    }

    user.password = encryptPassword(user.password);
    delete user.confirmPassword;

    if (user.id) {
      app.db('users')
        .update(user)
        .where({ id: user.id })
        .then(_ => res.status(204).send())
        .catch(err => res.status(500).send(err));

    } else {
      app.db('users')
        .insert(user)
        .then(_ => res.status(204).send())
        .catch(err => res.status(500).send(err));
    }
  };

  const getUser = async (req, res) => {
    app.db('users')
      .select('id', 'name', 'email', 'role')
      .then(user => res.json(users))
      .catch(err => res.status(500).send(err));

    try {
      const user = await User.findById(req.params.id);
      res.json(user);
    } catch (error) {
      res.status(404).json({ message: 'User not found' });
    }
  };

  const updateUser = async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(user);
    } catch (error) {
      res.status(404).json({ message: 'User not found' });
    }
  };

  const deleteUser = async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.sendStatus(204);
    } catch (error) {
      res.status(404).json({ message: 'User not found' });
    }
  };

  return { createUser, getUserById, updateUser, deleteUser };
};

export default UserController;
