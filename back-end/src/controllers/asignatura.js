const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllAsigments = async (req, res) => {
  try {
    const assignments = await prisma.asignatura.findMany();
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.getAssignmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const assignment = await prisma.asignatura.findUnique({
      where: { id: parseInt(id) },
    });
    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }
    res.json(assignment);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.createAssignment = async (req, res) => {
  const { nombre,  } = req.body;
  try {
    const assignment = await prisma.asignatura.create({
      data: { nombre },
    });
    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.updateAssignment = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const assignment = await prisma.asignatura.update({
      where: { id: parseInt(id) },
      data: { title, description },
    });
    res.json(assignment);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.deleteAssignment = async (req, res) => {
  const { id } = req.params;
  try {
    const assignment = await prisma.asignatura.delete({
      where: { id: parseInt(id) },
    });
    res.json(assignment);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = exports;
