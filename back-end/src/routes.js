import express from 'express'
import usuarioController from './controllers/usuario'
import estudianteController from './controllers/estudiante'
import profesorController from './controllers/profesor'
import padreController from './controllers/padre'
import informeController from './controllers/informe'
import evaluacionController from './controllers/evaluacion'
import cardexController from './controllers/cardex'
import asignaturaController from './controllers/asignatura'
import loginController from './controllers/login'
const router = express.Router()

router.get('/usuarios/', usuarioController.getAllUsuarios)
router.get('/usuarios/:id', usuarioController.getUsuarioById)
router.post("/usuarios/", usuarioController.createUsuario);
router.put("/usuarios/:id", usuarioController.updateUsuario);
router.delete("/usuarios/:id", usuarioController.deleteUsuario);

router.get('/estudiantes/', estudianteController.getAllEstudiantes)
router.get('/estudiantes/:id', estudianteController.getEstudianteById)
router.post("/estudiantes/", estudianteController.createEstudiante);
router.put("/estudiantes/:id", estudianteController.updateEstudiante);
router.delete("/estudiantes/:id", estudianteController.deleteEstudiante);

router.get('/profesores/', profesorController.getAllProfesores)
router.get('/profesores/:id', profesorController.getProfesor)
router.post("/profesores/", profesorController.createProfesor);
router.put("/profesores/:id", profesorController.updateProfesor);
router.delete("/profesores/:id", profesorController.deleteProfesor);

router.get('/asignaturas/', asignaturaController.getAllAsigments);
router.get('/asignaturas/:id', asignaturaController.getAssignmentById);
router.post("/asignaturas/", asignaturaController.createAssignment);
router.put("/asignaturas/:id", asignaturaController.updateAssignment);
router.delete("/asignaturas/:id", asignaturaController.deleteAssignment);

router.post("/login/", loginController.login);

export default router



