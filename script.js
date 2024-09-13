const database = {
    planes: [],
    alumnos: ['Alumno 1', 'Alumno 2', 'Alumno 3'],
    empresas: ['Empresa 1', 'Empresa 2', 'Empresa 3'],
    semestres: ['Semestre 1', 'Semestre 2'],
    especialidades: {
        'Semestre 1': ['Especialidad 1', 'Especialidad 2'],
        'Semestre 2': ['Especialidad 3', 'Especialidad 4']
    }
};

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('hidden');
    document.getElementById('content').classList.toggle('hidden');
}

document.getElementById('toggle-btn').addEventListener('click', toggleSidebar);
document.getElementById('show-sidebar').addEventListener('click', toggleSidebar);

document.getElementById('plan-rotacion').addEventListener('click', function() {
    document.getElementById('content').innerHTML = `
        <button class="show-sidebar" id="show-sidebar">Mostrar barra</button>
        <h2>Plan de Rotación</h2>
        <div id="planes-container"></div>
    `;
    displayPlans();
    document.getElementById('show-sidebar').addEventListener('click', toggleSidebar);
});

function displayNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

function displayPlans() {
    const container = document.getElementById('planes-container');
    container.innerHTML = '';
    database.planes.forEach((plan, index) => {
        const planCard = document.createElement('div');
        planCard.classList.add('plan-card', plan.estado === 'activo' ? 'active' : 'inactive');
        planCard.innerHTML = `
            <h3>${plan.nombre}</h3>
            <p>Semestre: ${plan.semestre}</p>
            <p>Especialidad: ${plan.especialidad}</p>
            <button class="toggle-state-btn">Cambiar a ${plan.estado === 'activo' ? 'Inactivo' : 'Activo'}</button>
            <button class="asistencia-btn">Asistencia</button>
            <div class="alumnos-list">
                <h4>Alumnos:</h4>
                <ul>
                    ${plan.alumnos.map(alumno => `<li><button class="alumno-btn">${alumno}</button></li>`).join('')}
                </ul>
            </div>
        `;
        planCard.querySelector('.toggle-state-btn').addEventListener('click', function() {
            plan.estado = plan.estado === 'activo' ? 'inactivo' : 'activo';
            displayNotification(`El plan de rotación "${plan.nombre}" está ahora ${plan.estado === 'activo' ? 'activo' : 'inactivo'} y ${plan.estado === 'activo' ? 'disponible' : 'no disponible'} para el panel de control de alumno y empresa.`);
            displayPlans();
        });
        planCard.querySelector('.asistencia-btn').addEventListener('click', function() {
            displayAsistenciaTable(plan);
        });
        planCard.querySelectorAll('.alumno-btn').forEach(button => {
            button.addEventListener('click', function() {
                displayAlumnoDetails(plan, button.textContent);
            });
        });
        container.appendChild(planCard);
    });
}

function displayAsistenciaTable(plan) {
    document.getElementById('content').innerHTML = `
        <button class="show-sidebar" id="show-sidebar">Mostrar barra</button>
        <h3>Asistencia - ${plan.nombre}</h3>
        <table>
            <thead>
                <tr>
                    <th>Mes</th>
                    ${Array.from({ length: 6 }).map((_, i) => `
                        <th>Semana 1 - Mes ${i + 1}</th>
                        <th>Semana 2 - Mes ${i + 1}</th>
                        <th>Semana 3 - Mes ${i + 1}</th>
                        <th>Semana 4 - Mes ${i + 1}</th>
                    `).join('')}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Resumen</td>
                    ${Array.from({ length: 6 }).map(() => `
                        <td><a href="#" class="download-link">Descargar</a></td>
                        <td><a href="#" class="download-link">Descargar</a></td>
                        <td><a href="#" class="download-link">Descargar</a></td>
                        <td><a href="#" class="download-link">Descargar</a></td>
                    `).join('')}
                </tr>
            </tbody>
        </table>
    `;
    document.getElementById('show-sidebar').addEventListener('click', toggleSidebar);
}


function displayAlumnoDetails(plan, alumno) {
    document.getElementById('content').innerHTML = `
        <button class="show-sidebar" id="show-sidebar">Mostrar barra</button>
        <h3>Detalles de ${alumno} - ${plan.nombre}</h3>
        <table>
            <thead>
                <tr>
                    <th>Mes</th>
                    <th>Reporte Semana 1</th>
                    <th>Reporte Semana 2</th>
                    <th>Reporte Semana 3</th>
                    <th>Reporte Semana 4</th>
                </tr>
            </thead>
            <tbody>
                ${Array.from({ length: 6 }).map((_, i) => `
                    <tr>
                        <td>Mes ${i + 1}</td>
                        <td><a href="#" class="download-link">Descargar</a></td>
                        <td><a href="#" class="download-link">Descargar</a></td>
                        <td><a href="#" class="download-link">Descargar</a></td>
                        <td><a href="#" class="download-link">Descargar</a></td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    document.getElementById('show-sidebar').addEventListener('click', toggleSidebar);
}

document.getElementById('registrar-plan').addEventListener('click', function() {
    document.getElementById('content').innerHTML = `
        <button class="show-sidebar" id="show-sidebar">Mostrar barra</button>
        <h2>Registrar Plan de Rotación</h2>
        <form id="registro-form">
            <label for="nombre">Nombre del Plan:</label>
            <input type="text" id="nombre" name="nombre">

            <label for="archivo">Subir archivo:</label>
            <input type="file" id="archivo" name="archivo">

            <label for="empresa">Seleccionar Empresa:</label>
            <select id="empresa" name="empresa">
                ${database.empresas.map(empresa => `<option value="${empresa}">${empresa}</option>`).join('')}
            </select>

            <label for="semestre">Seleccionar Semestre:</label>
            <select id="semestre" name="semestre">
                <option value="">Seleccione Semestre</option>
                ${database.semestres.map(semestre => `<option value="${semestre}">${semestre}</option>`).join('')}
            </select>

            <div id="especialidad-container" style="display: none;">
                <label for="especialidad">Seleccionar Especialidad:</label>
                <select id="especialidad" name="especialidad">
                    <option value="">Seleccione Especialidad</option>
                </select>
            </div>

            <div id="alumnos-container" style="display: none;">
                <label for="alumnos">Seleccionar Alumnos:</label>
                <select id="alumnos" name="alumnos" multiple>
                    ${database.alumnos.map(alumno => `<option value="${alumno}">${alumno}</option>`).join('')}
                </select>
            </div><br>

            <button type="submit">Guardar</button>
        </form>
        <div id="registro-status" style="margin-top: 20px;"></div>
    `;

    document.getElementById('semestre').addEventListener('change', function() {
        const semestre = this.value;
        const especialidades = database.especialidades[semestre] || [];
        const especialidadSelect = document.getElementById('especialidad');

        if (especialidades.length > 0) {
            document.getElementById('especialidad-container').style.display = 'block';
            especialidadSelect.innerHTML = `<option value="">Seleccione Especialidad</option>` +
                especialidades.map(especialidad => `<option value="${especialidad}">${especialidad}</option>`).join('');
        } else {
            document.getElementById('especialidad-container').style.display = 'none';
        }

        document.getElementById('alumnos-container').style.display = 'none';
    });

    document.getElementById('especialidad').addEventListener('change', function() {
        if (this.value) {
            document.getElementById('alumnos-container').style.display = 'block';
        } else {
            document.getElementById('alumnos-container').style.display = 'none';
        }
    });

    document.getElementById('registro-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const empresa = document.getElementById('empresa').value;
        const semestre = document.getElementById('semestre').value;
        const especialidad = document.getElementById('especialidad').value;
        const alumnos = Array.from(document.getElementById('alumnos').selectedOptions).map(option => option.value);

        const newPlan = { nombre, empresa, semestre, especialidad, alumnos, estado: 'activo' };
        database.planes.push(newPlan);

        document.getElementById('registro-status').textContent = 'Registro guardado con éxito.';
        console.log('Nuevo plan guardado:', newPlan);
    });

    document.getElementById('show-sidebar').addEventListener('click', toggleSidebar);
});

document.getElementById('reporte').addEventListener('click', function() {
    document.getElementById('content').innerHTML = `
        <button class="show-sidebar" id="show-sidebar">Mostrar barra</button>
        <h2>Reporte</h2>
        <div id="planes-reporte">
            ${database.planes.map(plan => `
                <div class="plan-card ${plan.estado === 'activo' ? 'active' : 'inactive'}">
                    <h3>${plan.nombre}</h3>
                    <button class="adjuntar-btn">Adjuntar archivos y descargar PDF</button>
                </div>
            `).join('')}
        </div>
    `;
    document.getElementById('show-sidebar').addEventListener('click', toggleSidebar);
});

document.getElementById('cerrar-sesion').addEventListener('click', function() {
    alert('Sesión cerrada.');
});
