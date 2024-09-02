import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

export const getAllAsigments = async (req, res) => {
  try {
    const assignments = await prisma.asignatura.findMany();
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getAssignmentById = async (req, res) => {
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
export const createAssignment = async (req, res) => {
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
export const updateAssignment = async (req, res) => {
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
export const deleteAssignment = async (req, res) => {
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
