import express from 'express'
import { getAllUsuarios, getUsuarioById, createUsuario, updateUsuario, deleteUsuario } from './controllers/usuario.js'
import {getAllEstudiantes,getEstudianteById, createEstudiante, updateEstudiante, deleteEstudiante} from './controllers/estudiante.js'
import { asignarAsignaturas, createProfesor, getAllProfesores } from './controllers/profesor.js'
// import padreController from './controllers/padre'
// import informeController from './controllers/informe'
// import evaluacionController from './controllers/evaluacion'
// import cardexController from './controllers/cardex'
import { createAsignatura, getAllAsignaturas }from './controllers/asignatura.js'
import { login } from './controllers/login.js'
import { authenticateToken } from './services/jwt.services.js'
import { createEvaluacion } from './controllers/evaluacion.js'
const router = express.Router()

router.get('/usuarios/', getAllUsuarios)
router.get('/usuarios/:id', getUsuarioById)
router.post("/usuarios/", createUsuario);
router.put("/usuarios/:id", authenticateToken, updateUsuario);
router.delete("/usuarios/:id", authenticateToken, deleteUsuario);

router.get('/estudiantes/', getAllEstudiantes)
router.get('/estudiantes/:id', getEstudianteById)
router.post("/estudiantes/", createEstudiante);
router.put("/estudiantes/:id", updateEstudiante);
router.delete("/estudiantes/:id", deleteEstudiante);

router.get('/profesores/', authenticateToken, getAllProfesores)
router.post("/profesores/", createProfesor);
router.post("/profesores/:id/asignaturas", asignarAsignaturas)

router.get('/asignaturas/', getAllAsignaturas);
router.post("/asignaturas/", createAsignatura);

router.post("/evaluaciones/", createEvaluacion)

router.post("/login/", login);

export default router



