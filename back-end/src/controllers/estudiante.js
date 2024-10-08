const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllEstudiantes = async (req, res) => {
  try {
    const estudiantes = await prisma.Estudiante.findMany();
    res.status(200).json(estudiantes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single Estudiante by ID
exports.getEstudianteById = async (req, res) => {
  const { id } = req.params;
  try {
    const estudiante = await prisma.estudiante.findUnique({
      where: { id: parseInt(id) },
    });
    res.status(200).json(estudiante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new Estudiante
exports.createEstudiante = async (req, res) => {
  const {
    usuarioId,
    birthDate,
    cardexId,
    evaluacionId,
    informeRendimientoId,
  } = req.body;
  try {
    const newEstudiante = await prisma.estudiante.create({
      data: {
        usuarioId,
        birthDate: new Date(birthDate),
        cardexId,
        evaluacionId,
        informeRendimientoId,
      },
    });
    res.status(201).json(newEstudiante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an Estudiante by ID
exports.updateEstudiante = async (req, res) => {
  const { id } = req.params;
  const {
    usuarioId,
    birthDate,
    cardexId,
    evaluacionId,
    informeRendimientoId,
  } = req.body;
  try {
    const updatedEstudiante = await prisma.estudiante.update({
      where: { id: parseInt(id) },
      data: {
        usuarioId,
        birth_date: new Date(birthDate),
        cardexId,
        evaluacionId,
        informeRendimientoId,
      },
    });
    res.status(200).json(updatedEstudiante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an Estudiante by ID
exports.deleteEstudiante = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEstudiante = await prisma.estudiante.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json(deletedEstudiante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = exports;
