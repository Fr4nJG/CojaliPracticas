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
