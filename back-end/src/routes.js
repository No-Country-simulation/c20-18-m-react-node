import express from 'express'
import { getAllUsuarios, getUsuarioById, createUsuario, updateUsuario, deleteUsuario } from './controllers/usuario.js'
import {getAllEstudiantes,getEstudianteById, createEstudiante, updateEstudiante, deleteEstudiante} from './controllers/estudiante.js'
import { createProfesor } from './controllers/profesor.js'
// import padreController from './controllers/padre'
// import informeController from './controllers/informe'
// import evaluacionController from './controllers/evaluacion'
// import cardexController from './controllers/cardex'
import { createAsignatura }from './controllers/asignatura.js'
import { login } from './controllers/login.js'
const router = express.Router()

router.get('/usuarios/', getAllUsuarios)
router.get('/usuarios/:id', getUsuarioById)
router.post("/usuarios/", createUsuario);
router.put("/usuarios/:id", updateUsuario);
router.delete("/usuarios/:id", deleteUsuario);

router.get('/estudiantes/', getAllEstudiantes)
router.get('/estudiantes/:id', getEstudianteById)
router.post("/estudiantes/", createEstudiante);
router.put("/estudiantes/:id", updateEstudiante);
router.delete("/estudiantes/:id", deleteEstudiante);

// router.get('/profesores/', profesorController.getAllProfesores)
// router.get('/profesores/:id', profesorController.getProfesor)
router.post("/profesores/", createProfesor);
// router.put("/profesores/:id", profesorController.updateProfesor);
// router.delete("/profesores/:id", profesorController.deleteProfesor);

// router.get('/asignaturas/', asignaturaController.getAllAsigments);
// router.get('/asignaturas/:id', asignaturaController.getAssignmentById);
router.post("/asignaturas/", createAsignatura);
// router.put("/asignaturas/:id", asignaturaController.updateAssignment);
// router.delete("/asignaturas/:id", asignaturaController.deleteAssignment);

// router.post("/login/", loginController.login);

export default router



