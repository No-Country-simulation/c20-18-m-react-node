import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

export const getAllEvaluciones = async (req, res) => {
    try {
        const evaluaciones = await prisma.evaluacion.findMany({
            include: {
                profesor: {
                    select: {
                        usuario: {
                            select: {
                                nombre: true,
                                apellido: true
                            }
                        }
                    }
                },
                asignatura: {
                    select: {
                        nombre: true
                    }
                },
                notas: true,
                informes: true
            }
        })
        if(!evaluaciones) return res.status(404).json({ error: "No se encontraro evaluaciones"})
        
        res.status(200).json(evaluaciones)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const createEvaluacion = async (req, res) => {
    const { profesorId, asignaturaId, notas, informes } = req.body
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
                        estudianteId: nota.estudianteId,
                        nota: nota.nota
                    }))
                },
                informes: informes ? {
                    create: informes.map(informe => ({
                        estudianteId: informe.estudianteId,
                        informe: informe.informe
                    }))
                } : undefined
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