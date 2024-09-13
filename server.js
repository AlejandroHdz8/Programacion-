// Simulación de base de datos
const database = {
    planes: [],
    alumnos: ['Alumno 1', 'Alumno 2', 'Alumno 3'],
    instituciones: ['Institución 1', 'Institución 2']
};

// Función para guardar un nuevo plan
function savePlan(plan) {
    database.planes.push(plan);
    console.log('Plan guardado:', plan);
}

// Ejemplo de cómo se podría utilizar
savePlan({
    nombre: 'Plan 1',
    institucion: 'Institución 1',
    alumnos: ['Alumno 1', 'Alumno 2'],
    meses: 3,
    archivos: []
});

// Ver la base de datos simulada en consola
console.log('Base de datos:', database);
