import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

export const createEvaluacion = async (req, res) => {
    const { profesorId, asignaturaId, notas } = req.body
    if(!profesorId || !asignaturaId) return res.status(400).json({ error: "El profesor y la asignatura son requeridos"})
    
    try {
        const profesor = await prisma.profesor.findUnique({ where: {id: profesorId}})
        const asignatura = await prisma.asignatura.findUnique({ where: {id: asignaturaId}})
        if(!profesor || !asignatura) return res.status(404).json({ error: "Profesor o asignatura no encontrados"})
        
        const evaluacion = await prisma.evaluacion.create({
            data: {
                profesorId,
                asignaturaId,
                notas: {
                    create: notas.map(nota => ({
                        estudiante: {connect: {id: nota.estudianteId}},
                        nota: nota.nota
                    }))
                }
            },
            include: {
                notas: true
            }
        })

        res.status(201).json(evaluacion)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}