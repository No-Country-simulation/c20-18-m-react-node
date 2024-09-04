import { PrismaClient } from "@prisma/client"
import { hashPassword } from "../services/password.services.js";

const prisma = new PrismaClient();

export const getAllPadres = async (req, res) => {
  try {
    const padres = await prisma.padre.findMany({
      include:{
        usuario:{
          select:{
            nombre: true,
            apellido: true,
            email: true,
            role: true,
          }
        },
        estudiantes: true,
      }
    });
    res.status(200).json(padres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPadreById = async (req, res) => {
  const { id } = req.params;
  try {
    const padre = await prisma.padre.findUnique({
      where: { id: parseInt(id) },
      include: {
        estudiantes: true, // Incluye solo los estudiantes relacionados con este padre
      },
    });
    res.status(200).json(padre);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPadre = async (req, res) => {
  const { nombre, apellido, email, password } = req.body;
  if(!nombre || !apellido || !email || !password) return res.status(400).json({ message: "Todos los campos son obligatorios"})
  try {
    const hashedPassword = await hashPassword(password)
    const usuario = await prisma.usuario.create({
      data: {
        nombre,
        apellido,
        email,
        password: hashedPassword,
        role: "Padre"
      }
    })
    const newPadre = await prisma.padre.create({
      data: {
        usuarioId: usuario.id,
      },
    });
    res.status(201).json(newPadre);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePadre = async (req, res) => {
  const { id } = req.params;
  const { usuarioId } = req.body;
  try {
    const updatedPadre = await prisma.Padre.update({
      where: { id: parseInt(id) },
      data: {
        usuarioId: parseInt(usuarioId),
      },
    });
    res.status(200).json(updatedPadre);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePadre = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.Padre.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "Padre deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};