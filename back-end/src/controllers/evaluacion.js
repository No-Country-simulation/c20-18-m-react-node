import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

export const getAllEvaluciones = async (req, res) => {
    const {id, role} = req.data
    if(role != "Admin" && role != "Profesor") return res.status(401).json({error: "No autorizado"})
    try {
        const evaluaciones = await prisma.evaluacion.findMany({
            where: {profesorId: id},
            include: {
                asignatura: {
                    select: {
                        nombre: true
                    }
                }
            }
        })
        if(!evaluaciones) return res.status(404).json({ error: "No se encontraro evaluaciones"})
        
        res.status(200).json(evaluaciones)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const getEvaluacionById = async (req, res) => {
    const { id } = req.params

    try {
        const evaluacion = await prisma.evaluacion.findUnique({
            where: {id: parseInt(id)},
            include: {
                notas: true,
                informes: true
            }
        })
        if(!evaluacion) return res.status(404).json({error: "Evaluacion no encontrada"})
        
        res.status(200).json(evaluacion)
    } catch (error) {
        
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

export const deleteEvaluacion = async (req, res) => {
    const { id } = req.params
    const data = req.data

    if(data.role != "Admin" && data.role != "Profesor") return res.status(401).json({ error: "No autorizado"})
    
    try {
        const evaluacion = await prisma.evaluacion.findUnique({where: {id: parseInt(id)}})
        if(!evaluacion) return res.status(404).json({error: "No se encontro la evaluacion"})
        
        res.json(evaluacion)
    } catch (error) {
        
    }
}