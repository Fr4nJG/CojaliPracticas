const btn = document.getElementById('boton');

if (localStorage.getItem('tema') == 'claro') {
    document.body.classList.add('light-theme');
    btn.textContent = 'Tema oscuro';
}

btn.addEventListener('click', () => {
    const activo = document.body.classList.toggle('light-theme');
    btn.textContent = activo ? 'Tema oscuro' : 'Tema claro';
    localStorage.setItem('tema', activo ? 'claro' : 'oscuro');
});

const estudios = [
    { nombre: 'Educación infantil',   estado: 'Completado' },
    { nombre: 'Educación primaria',   estado: 'Completado' },
    { nombre: 'Educación secundaria', estado: 'Completado' },
    { nombre: 'Bachillerato',         estado: 'Completado' },
    { nombre: '1º DAW',               estado: 'Cursándolo' },
];

const listaEstudios = document.getElementById('lista-estudios');

const crearElementoEstudio = (estudio) => {
    const li = document.createElement('li');
    li.innerHTML = `${estudio.nombre} <span class="haciendo haciendo-${estudio.estado.toLowerCase()}">${estudio.estado}</span>`;
    return li;
};

const cargarEstudios = () => {
    listaEstudios.innerHTML = '';
    estudios.forEach((estudio) => {
        listaEstudios.appendChild(crearElementoEstudio(estudio));
    });
};

const inputEstudio = document.getElementById('input-estudio');
const selectEstado = document.getElementById('select-estado');
const btnAgregar   = document.getElementById('btn-agregar');

const inputEsValido = () => inputEstudio.value.trim() !== '';

const agregarEstudio = () => {
    if (!inputEsValido()) return;

    estudios.push({
        nombre: inputEstudio.value.trim(),
        estado: selectEstado.value,
    });

    cargarEstudios();
    inputEstudio.value = '';
    inputEstudio.focus();
};

btnAgregar.addEventListener('click', agregarEstudio);
cargarEstudios();