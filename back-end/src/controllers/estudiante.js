import { PrismaClient } from "@prisma/client"
import { hashPassword } from "../services/password.services.js";
const prisma = new PrismaClient();


export const getAllEstudiantes = async (req, res) => {
  try {
    const estudiantes = await prisma.Estudiante.findMany({
      include: {
        notas: true
      }
    });
    res.status(200).json(estudiantes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single Estudiante by ID
export const getEstudianteById = async (req, res) => {
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
export const createEstudiante = async (req, res) => {
  const { nombre, apellido, email, password } = req.body

  try {
    if(!nombre || !apellido || !email || !password) return res.status(400).json({ message: "Todos los campos son obligatorios"})
    const hashedPassword = await hashPassword(password)
    const usuario = await prisma.usuario.create({
      data: {
        nombre,
        apellido,
        email,
        password: hashedPassword,
        role: "Estudiante"
      }
    })

    const estudiante = await prisma.estudiante.create({
      data: {
        usuarioId: usuario.id
      }
    })
    res.status(201).json(estudiante)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Update an Estudiante by ID
export const updateEstudiante = async (req, res) => {
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
export const deleteEstudiante = async (req, res) => {
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
