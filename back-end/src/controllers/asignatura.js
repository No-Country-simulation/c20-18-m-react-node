import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

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