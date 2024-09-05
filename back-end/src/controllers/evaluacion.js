import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

export const getAllEvaluciones = async (req, res) => {
    const {id, role} = req.data
    if(role != "Admin" && role != "Profesor") return res.status(401).json({error: "No autorizado"})
    try {
        const evaluaciones = await prisma.evaluacion.findMany({
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
    if(role != "Admin" && role != "Profesor") return res.status(401).json({error: "No autorizado"})
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
    const { asignaturaId, notas, informes } = req.body
    const data = req.data
    if(!asignaturaId || !notas) return res.status(400).json({ error: "Faltan campos obligatorios"})
    if(data.role != "Admin" && data.role != "Profesor") return res.status(401).json({ error: "No autorizado"})   
    try {
        const usuario = await prisma.usuario.findUnique({
            where: {id: data.id},
            select: {
                profesores: true
            }
        })
        const asignatura = await prisma.asignatura.findUnique({ where: {id: asignaturaId}})
        if(!asignatura) return res.status(404).json({ error: "Asignatura no encontrada"})
        
        const evaluacion = await prisma.evaluacion.create({
            data: {
                profesorId: usuario.profesores[0].id,
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
                notas: true,
                informes: true
            }
        })

        res.status(201).json(evaluacion)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const modifyEvaluacion = async (req, res) => {
    const { id } = req.params
    const data = req.data
    const updateData = req.body

    if(data.role != "Admin" && data.role != "Profesor") return res.status(401).json({ error: "No autorizado"})    
    try {
        const evaluacion = await prisma.evaluacion.findUnique({where: {id: parseInt(id)}})  
        if(!evaluacion) return res.status(404).json({error: "No se encontro la evaluacion"})
        const usuario = await prisma.usuario.findUnique({
            where: {id: data.id},
            select: {
                profesores: true
            }
        })

        if(evaluacion.profesorId !== usuario.profesores[0].id) return res.status(401).json({error: "Profesor no autorizado"})
        
        const updatedEvaluacion = await prisma.evaluacion.update({
            where: { id: evaluacion.id },
            data: updateData,
        });
        res.status(200).json(updatedEvaluacion)
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
        const usuario = await prisma.usuario.findUnique({
            where: {id: data.id},
            select: {
                profesores: true
            }
        })

        if(evaluacion.profesorId !== usuario.profesores[0].id) return res.status(401).json({error: "Profesor no autorizado"})
        const deletedNotas = await prisma.nota.deleteMany({where: {evaluacionId: evaluacion.id}})
        const deletedEvaluacion = await prisma.evaluacion.delete({where: {id: evaluacion.id}})
        res.status(204).json({message: "Deleted"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}