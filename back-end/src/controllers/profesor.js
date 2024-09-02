import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();
import { hashPassword } from "../services/password.services.js"

export const createProfesor = async (req, res) => {
  const { nombre, apellido, email, password } = req.body

  try {
    if(!nombre || !apellido || !email || !password) return res.status(400).json({ message: "Todos los campos son obligatorios"})
    const hashedPassword = await hashPassword(password)
    const usuario = await prisma.usuario.create({
      data: {
        nombre,
        apellido,
        email,
        hashedPassword,
        role: "Profesor"
      }
    })

    const profesor = await prisma.profesor.create({
      data: {
        usuarioId: usuario.id
      }
    })
    res.status(201).json(profesor)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}