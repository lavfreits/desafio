import Course from "../models/Course.js";
import {autor} from "../models/autor.js";

class CourseController {

  static async listarCourses(req, res) {
    try {
      const listaCourses = await Course.find({});
      res.status(200).json(listaCourses);
    }
    catch (e) {
      res.status(500).json({ message: `${e.message} - falha na requisicao` });
    }
  }

  static async listarCoursesPorCategoria(req, res) {
   
      const categoria = req.query.categoria;
      //TODO relembrar como q faz esse filtro
       try {
        const CoursesPorCategoria = await Course.find({categoria: categoria});
      res.status(200).json(CoursesPorCategoria);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na busca` });
    }
  };

  static async cadastrarCourse(req, res) {
    const novoCourse = req.body;
    //todo ver se isso vai dar certooo
    try {
      const categoriaEncontrada = await autor.findById(novoCourse.categoria);
      const CourseCompleto = { ...novoCourse, categories: {...categoriaEncontrada._doc }};
      const CourseCriado = await Course.create(CourseCompleto);
      res.status(201).json({ message: "sucesso, Course cadastrado", Course: CourseCriado });

    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha ao cadastrar Course` });
    }
  }

  static async atualizarCourse(req, res) {
    try {
      const id = req.params.id;
      await Course.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "Course atualizado" });
    }
    catch (e) {
      res.status(500).json({ message: `${e.message} - falha na atualizacao do Course` });
    }
  }

  static async apagarCourse(req, res) {
    try {
      const id = req.params.id;
      await Course.findByIdAndDelete(id);
      res.status(200).json({ message: "Course apagado" });
    }
    catch (e) {
      res.status(500).json({ message: `${e.message} - falha na exclusao do Course` });
    }
  }
};

export default CourseController;