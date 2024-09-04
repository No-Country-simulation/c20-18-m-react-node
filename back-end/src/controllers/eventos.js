import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllEvents = async (req, res) => {
  try {
    const events = await prisma.evento.findMany({
      include: {
        usuarios: {
          include: {
            usuario: {
              select: {
                nombre: true,
                apellido: true,
                email: true,
              },
            },
          },
        },
      },
    });

    // Transformar la respuesta para que los usuarios sean directamente accesibles en el nivel del evento
    const transformedEvents = events.map((evento) => ({
      id: evento.id,
      nombre: evento.nombre,
      fecha: evento.fecha,
      descripcion: evento.descripcion,
      usuarios: evento.usuarios.map((usuarioEvento) => usuarioEvento.usuario),
    }));

    res.status(200).json(transformedEvents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await prisma.evento.findUnique({
      where: { id: parseInt(id) },
      include: {
        usuario: {
          select: {
            nombre: true,
            apellido: true,
            email: true,
          },
        },
      },
    });
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createEvent = async (req, res) => {
  const { nombre, descripcion, fecha, usuarioIds } = req.body;
  try {
    const evento = await prisma.evento.create({
      data: {
        nombre,
        fecha: new Date(fecha),
        descripcion,
        usuarios: {
          create: usuarioIds.map((id) => ({
            usuario: { connect: { id } },
          })),
        },
      },
    });
    res.status(201).json(evento);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el evento" });
  }
};

export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, fecha } = req.body;
  try {
    const evento = await prisma.evento.update({
      where: { id: parseInt(id) },
      data: { nombre, descripcion, fecha: new Date(fecha) },
    });
    res.status(200).json(evento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const evento = await prisma.evento.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json(evento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
