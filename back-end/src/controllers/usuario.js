import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();
import { hashPassword } from "../services/password.services.js"

// Get all Usuarios
export const getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany();
    if (usuarios.lenght === 0)
      return res.status(404).json({ error: "No hay usuarios" });
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single Usuario by ID
export const getUsuarioById = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id: parseInt(id) },
    });
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new Usuario
export const createUsuario = async (req, res) => {
  const { nombre, apellido, email, password, role } = req.body;
  const hashedPassword = await hashPassword(password)
  try {
    const newUsuario = await prisma.usuario.create({
      data: {
        nombre,
        apellido,
        email,
        password: hashedPassword,
        role,
      },
    });
    res.status(201).json(newUsuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Usuario by ID
export const updateUsuario = async (req, res) => {
  const { id } = req.params;
  const data = req.data

  if(data.role != "Admin" && id != data.id) return res.status(401).json({ error: "No autorizado."})
  
  const { nombre, apellido, email, password } = req.body;

  try {
    const updatedUsuario = await prisma.usuario.update({
      where: { id: parseInt(id) },
      data: {
        nombre,
        apellido,
        email,
        password: password ? await hashPassword(password) : undefined,
      },
    });
    
    res.status(200).json(updatedUsuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Usuario by ID
export const deleteUsuario = async (req, res) => {
  const { id } = req.params;
  const data = req.data

  if(data.role != "Admin") return res.status(401).json({ error: "No autorizado." })

  try {
    const deletedUsuario = await prisma.usuario.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).json({ message: "no content" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
