import { PrismaClient } from "@prisma/client"
import { hashPassword } from "../services/password.services.js"
const prisma = new PrismaClient();

export const getAllProfesores = async (req, res) => {
  try {
    const profesores = await prisma.profesor.findMany({
      include: {
        usuario: {
          select: {
            nombre: true,
            apellido: true,
            email: true
          }
        },
        asignaturas: true
      }
    })
    if(!profesores) return res.status(404).json({ error: "No se encontraron profesores."})
    
    res.status(200).json(profesores)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

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
        password: hashedPassword,
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

export const asignarAsignaturas = async (req, res) => {
  const { id } = req.params 
  const { asignaturas } = req.body
  if(!asignaturas || !asignaturas.length) return res.status(400).json({ error: "Se requiere una lista de asignaturas"})

  try {
    const profesor = await prisma.profesor.findUnique({ where: { id: parseInt(id) }})
    if(!profesor) return res.status(404).json({ error: "Profesor no encontrado"})
    
    const updatedProfesor = await prisma.profesor.update({
      where: { id: profesor.id },
      data: {
        asignaturas: {
          connect: asignaturas.map(asignaturaId => ({
            id: asignaturaId
          }))
        }
      },
      include: {
        asignaturas: true
      },
    })

    res.status(200).json({ message: "Asignaturas creadas", updatedProfesor})
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}