import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

export const getAllAsignaturas = async (req, res) => {
  try {
    const asignaturas = await prisma.asignatura.findMany({
      include: {
        profesores: {
          include: {
            usuario: {
              select: {
                nombre: true,
                apellido: true,
                email: true
              }
            }
          }
        }
      }
    })
    if(!asignaturas) return res.status(404).json({ error: "No se encontraron asignaturas" })
    
    res.status(200).json(asignaturas)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const createAsignatura = async (req, res) => {
  const { nombre } = req.body

  try {
    if(!nombre) return res.status(400).json({ message: "El nombre de la asignatura es requerido."})

    const asignatura = await prisma.asignatura.create({
      data: {
        nombre
      }
    })
    res.status(201).json(asignatura)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}