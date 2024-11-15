
// -----------------------------------background----------------------------------
const nightSky = document.getElementById('night-sky');

        // Crear estrellas estáticas
        for (let i = 0; i < 200; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.width = `${Math.random() * 3}px`;
            star.style.height = star.style.width;
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animationDuration = `${Math.random() * 3 + 1}s`;
            nightSky.appendChild(star);
        }

        // Función para crear una estrella fugaz
        function createShootingStar() {
            const shootingStar = document.createElement('div');
            shootingStar.className = 'shooting-star';
            shootingStar.style.left = `${Math.random() * 100}%`;
            shootingStar.style.top = `${Math.random() * 50}%`;
            nightSky.appendChild(shootingStar);

            const angle = Math.random() * Math.PI / 4 + Math.PI / 4;
            const distance = Math.random() * 250 + 250;
            const duration = Math.random() * 1000 + 1000;

            shootingStar.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`, opacity: 0 }
            ], {
                duration: duration,
                easing: 'ease-out'
            }).onfinish = () => {
                shootingStar.remove();
                setTimeout(createShootingStar, Math.random() * 2500);
            };
        }

        // Iniciar la creación de estrellas fugaces
        for (let i = 0; i < 3; i++) {
            setTimeout(createShootingStar, Math.random() * 3000);
        }
// -----------------------------------fin----------------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {
    const abrirModalRecuperar = document.querySelector('.abrir-modal-recuperar');
    const abrirModalRegistro = document.querySelector('.abrir-modal-registro');
    const cerrarRecuperar = document.querySelector('.cerrarRecuperar');
    const cerrarRegistro = document.querySelector('.cerrarRegistro');

    const modalRecuperar = document.getElementById('miModalRecuperar');
    const modalRegistro = document.getElementById('miModalRegistro');

    abrirModalRecuperar.addEventListener('click', function () {
        modalRecuperar.style.display = 'block';
    });

    abrirModalRegistro.addEventListener('click', function () {
        modalRegistro.style.display = 'block';
    });

    cerrarRecuperar.addEventListener('click', function () {
        modalRecuperar.style.display = 'none';
    });
    cerrarRegistro.addEventListener('click', function() {
        modalRegistro.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === modalRecuperar || event.target === modalRegistro) {
            modalRecuperar.style.display = 'none';
            modalRegistro.style.display = 'none';
        }
    });
});
