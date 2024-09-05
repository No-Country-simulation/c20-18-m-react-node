import { PrismaClient } from "@prisma/client"
import { hashPassword } from "../services/password.services.js"
const prisma = new PrismaClient();

export const getAllProfesores = async (req, res) => {
  try {
    const profesores = await prisma.profesor.findMany({
      select: {
        id: true,
        usuario: {
          select: {
            nombre: true,
            apellido: true,
            email: true
          }
        },
        asignaturas: {
          select: {
            nombre: true
          }
        }
      }
    })
    if(!profesores) return res.status(404).json({ error: "No se encontraron profesores."})
    
    res.status(200).json(profesores)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getProfesorById = async (req, res) => {
  const { id } = req.params

  try {
    const profesor = await prisma.profesor.findUnique({
      where: {id: parseInt(id)},
      select: {
        id: true,
        usuario: {
          select: {
            nombre: true,
            apellido: true,
            email: true
          }
        },
        asignaturas: true,
        evaluaciones: true
      }
    })
    if(!profesor) return res.status(404).json({ error: "Profesor no encontrado" })
    res.status(200).json({profesor})
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const createProfesor = async (req, res) => {
  const { nombre, apellido, email, password, asignaturas } = req.body

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
        usuarioId: usuario.id,
        asignaturas: {
          connect: asignaturas ? asignaturas.map(asignaturaId => ({
            id: asignaturaId
          })) : undefined
        }
      },
      select: {
        id: true,
        usuario: {
          select: {
            nombre: true,
            apellido: true
          }
        }
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
    const profesor = await prisma.profesor.findUnique({ 
      where: { id: parseInt(id) },
      include: {
        asignaturas: true
      }
  })
    if(!profesor) return res.status(404).json({ error: "Profesor no encontrado"})
       
    const currentAsignaturasIds = profesor.asignaturas.map(asignatura => asignatura.id)

    const asignaturasToDisconnect = currentAsignaturasIds.filter(
      asignaturaId => !asignaturas.includes(asignaturaId)
    )
    const asignaturasToConnect = asignaturas.filter(
      asignaturaId => !currentAsignaturasIds.includes(asignaturaId)
    )
  
    const updatedProfesor = await prisma.profesor.update({
      where: { id: profesor.id },
      data: {
        asignaturas: {
          disconnect: asignaturasToDisconnect.map(id => ({ id })),
          connect: asignaturasToConnect.map(id => ({ id }))
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