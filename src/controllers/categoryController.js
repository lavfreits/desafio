import { Category } from "../models/Category.js";

class CategoryController {

  static async listarCategories(req, res) {
    try {
      const listaCategories = await Category.find({});
      res.status(200).json(listaCategories);
    }
    catch (e) {
      res.status(500).json({ message: `${e.message} - falha na requisicao` });
    }
  }

  static async listarCategoryPorId(req, res) {
    try {
      const id = req.params.id;
      const CategoryEncontrada = await Category.findById(id);
      res.status(200).json(CategoryEncontrada);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na busca por Category` });
    }
  };

  static async cadastrarCategory(req, res) {
    try {
      const novoCategory = await Category.create(req.body);
      res.status(201).json({ message: "sucesso, Category cadastrado", Category: novoCategory });

    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha ao cadastrar Category` });
    }
  }

  static async atualizarCategory(req, res) {
    try {
      const id = req.params.id;
      await Category.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "Category atualizado" });
    }
    catch (e) {
      res.status(500).json({ message: `${e.message} - falha na atualizacao do Category` });
    }
  }

  static async apagarCategory(req, res) {
    try {
      const id = req.params.id;
      await Category.findByIdAndDelete(id);
      res.status(200).json({ message: "Category apagado" });
    }
    catch (e) {
      res.status(500).json({ message: `${e.message} - falha na exclusao do Category` });
    }
  }
};

export default CategoryController;


module.exports = app => {
  const { existsOrError, notExistsOrError } = app.utils.validation;

  const create = async (req, res) => {
    const category = { ...req.body };
    if (req.params.id) category.id = req.params.id;

    try {
      existsOrError(category.name, 'Name not informed');
    } catch (msg) {
      return res.status(400).send(msg);
    }

    if (category.id) {
      app.db('categories')
        .update(category)
        .where({ id: category.id })
        .then(_ => res.status(204).send())
        .catch(err => res.status(500)).send(err);

  
    } else {
      app.db('categories')
        .insert(category)
        .then(_ => res.status(204).send())
        .catch(err => res.status(500).send(err));
    }
  };

  const get = async (req, res) => {
    app.db('categories')
      .then(user => res.json(users))
      .catch(err => res.status(500).send(err));

    try {
      const user = await User.findById(req.params.id);
      res.json(user);
    } catch (error) {
      res.status(404).json({ message: 'User not found' });
    }
  };

  const remove = async (req, res) => {
    try {
      existsOrError(req.params.id, 'Category code not informed');
      
      const subcategory = await app.db('categories')
        .where({ parentId: req.params.id });

      notExistsOrError(subcategory, 'Category has subcategories');

      const articles = await app.db('articles')
        .where({ categoryId: req.params });

      notExistsOrError(articles, 'Category has articles');

      const rowsDeleted = await app.db('categories')
        .where({ id: req.params.id }).del();
      existsOrError(rowsDeleted, 'Category not found');

      res.sendStatus(204);
    } catch (error) {
      res.status(404).json({ message: 'User not found' });
    }
  };

  const withPath = categories => {
    const getParent = (categories, parentId) => {
      const parent = categories
      .filter(parent => parent.id === parentId);
      return parent.length ? parent[0] : null;
    };

    const categoriesWithPath = categories.map(category => {
      let path = category.name;
      let parent = getParent(categories, category.parentId);

      while (parent) {
        path = `${parent.name} > ${path}`;
        parent = getParent(categories, parent.parentId);
      }

      return { ...category, path };
    });

    categoriesWithPath.sort((a, b) => {
      if (a.path < b.path) return -1;
      if (a.path > b.path) return 1;
      return 0;
    });

    return categoriesWithPath;
  }

  const toTree = (categories, tree) => {
    if (!tree) tree = categories.filter(c => !c.parentId);
    tree = tree.map(parentNode => {
      const isChild = node => node.parentId === parentNode.id;
      parentNode.children = toTree(categories, categories.filter(isChild));
      return parentNode;
    });

    return tree;
  };

  const getTree = async (req, res) => {
    app.db('categories')
      .then(categories => res.json(toTree(withPath(categories))))
      .catch(err => res.status(500).send (err));
  }

  return { create, get, remove, getTree };
};