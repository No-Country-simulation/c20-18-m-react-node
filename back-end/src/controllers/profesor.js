import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();
import { hashPassword } from "../services/password.services"

export const getAllProfesores = async (req, res) => {
  try {
    const cursos = await prisma.Profesor.findMany();
    res.status(200).json(cursos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProfesor = async (req, res) => {
  const { id } = req.params;
  try {
    const profesor = await prisma.Profesor.findUnique({
      where: { id: parseInt(id) },
    });
    res.status(200).json(profesor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createProfesor = async (req, res) => {
  const { nombre, apellido, email, password, asignaturas } = req.body;

  try {
    // Verifica si las asignaturas existen
    const existingAsignaturas = await prisma.asignatura.findMany({
      where: {
        id: { in: asignaturas },
      },
    });

    if (existingAsignaturas.length !== asignaturas.length) {
      return res
        .status(404)
        .json({ error: "Una o más asignaturas no fueron encontradas" });
    }

    // Crea un nuevo usuario asociado al profesor
    const usuario = await prisma.usuario.create({
      data: {
        nombre,
        apellido,
        email,
        password: await hashPassword(password),
        profesores: {
          create: {},
        },
      },
      include: {
        profesores: true, // Para obtener el ID del profesor recién creado
      },
    });

    const profesorId = usuario.profesores[0].id;

    // Conecta el profesor a las asignaturas
    const asignaturaProfesorConnections = asignaturas.map((asignaturaId) => ({
      asignaturaId,
      profesorId,
    }));

    await prisma.asignaturaProfesor.createMany({
      data: asignaturaProfesorConnections,
    });

    res
      .status(201)
      .json({ message: "Profesor agregado exitosamente", usuario });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProfesor = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, email, password } = req.body;
  try {
    const existingProfesor = await prisma.profesor.findUnique({
      where: { id: parseInt(id) },
      include: { usuario: true },
    });

    if (!existingProfesor) {
      return res.status(404).json({ error: "Profesor not found" });
    }

    const hashedPassword = password ? await hashPassword(password) : existingProfesor.usuario.password
    
    const updatedProfesor = await prisma.profesor.update({
      where: { id: parseInt(id) },
      data: {
        usuario: {
          update: {
            nombre: nombre || existingProfesor.usuario.nombre,
            apellido: apellido || existingProfesor.usuario.apellido,
            email: email || existingProfesor.usuario.email,
            password: hashedPassword
          },
        },
      },
      include: {
        usuario: true,
      },
    });

    res.status(200).json(updatedProfesor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProfesor = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.profesor.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "Profesor deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};