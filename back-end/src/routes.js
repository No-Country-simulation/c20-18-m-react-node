const express = require('express')
const usuarioController = require('./controllers/usuario')
const estudianteController = require('./controllers/estudiante')
const profesorController = require('./controllers/profesor')
const padreController = require('./controllers/padre')
const informeController = require('./controllers/informe')
const evaluacionController = require('./controllers/evaluacion')
const cardexController = require('./controllers/cardex')
const asignaturaController = require('./controllers/asignatura')
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

module.exports = router



