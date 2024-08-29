-- CreateTable
CREATE TABLE "Asignatura" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Asignatura_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AsignaturaEstudiante" (
    "id" SERIAL NOT NULL,
    "asignaturaId" INTEGER NOT NULL,
    "estudianteId" INTEGER NOT NULL,

    CONSTRAINT "AsignaturaEstudiante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AsignaturaProfesor" (
    "id" SERIAL NOT NULL,
    "asignaturaId" INTEGER NOT NULL,
    "profesorId" INTEGER NOT NULL,

    CONSTRAINT "AsignaturaProfesor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AsignaturaEstudiante" ADD CONSTRAINT "AsignaturaEstudiante_asignaturaId_fkey" FOREIGN KEY ("asignaturaId") REFERENCES "Asignatura"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AsignaturaEstudiante" ADD CONSTRAINT "AsignaturaEstudiante_estudianteId_fkey" FOREIGN KEY ("estudianteId") REFERENCES "Estudiante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AsignaturaProfesor" ADD CONSTRAINT "AsignaturaProfesor_asignaturaId_fkey" FOREIGN KEY ("asignaturaId") REFERENCES "Asignatura"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AsignaturaProfesor" ADD CONSTRAINT "AsignaturaProfesor_profesorId_fkey" FOREIGN KEY ("profesorId") REFERENCES "Profesor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
