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
    { nombre: 'Educación infantil', estado: 'Completado' },
    { nombre: 'Educación primaria', estado: 'Completado' },
    { nombre: 'Educación secundaria', estado: 'Completado' },
    { nombre: 'Bachillerato', estado: 'Completado' },
    { nombre: '1º DAW', estado: 'Cursándolo' },
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
const btnAgregar = document.getElementById('btn-agregar');

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

const inputGithub = document.getElementById('input-github');
const btnGithub   = document.getElementById('btn-github');
const listaGithub = document.getElementById('lista-github');

const buscarProyectos = async () => {
    const usuario = inputGithub.value.trim();
    if (!usuario) return;

    listaGithub.innerHTML = '<li>Cargando...</li>';

    try {
        const respuesta = await fetch(`https://api.github.com/users/${usuario}/repos`);
        if (!respuesta.ok) throw new Error('Usuario no encontrado');

        const repos = await respuesta.json();
        listaGithub.innerHTML = '';

        if (repos.length === 0) {
            listaGithub.innerHTML = '<li>Este usuario no tiene repositorios públicos.</li>';
            return;
        }

        repos.forEach((repo) => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
            listaGithub.appendChild(li);
        });
    } catch (error) {
        listaGithub.innerHTML = `<li>Error: ${error.message}</li>`;
    }
};

btnGithub.addEventListener('click', buscarProyectos);
