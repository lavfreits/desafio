import express from 'express';
import CourseController from '../controllers/CourseController.js';

const router = express.Router();

router.post('/courses', CourseController.createCourse);
router.get('/courses/:id', CourseController.getCourseById);
router.put('/courses/:id', CourseController.updateCourse);
router.delete('/courses/:id', CourseController.deleteCourse);

export default router;