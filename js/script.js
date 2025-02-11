document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.carousel-image');
    const leftReflection = document.querySelector('.left-reflection');
    const rightReflection = document.querySelector('.right-reflection');
    let currentIndex = 0;

    // Función para clonar imágenes a los reflejos
    const updateReflections = () => {
        const activeImage = images[currentIndex];
        const cloneForReflection = activeImage.cloneNode(true);
        
        // Limpiar reflejos anteriores
        leftReflection.innerHTML = '';
        rightReflection.innerHTML = '';
        
        // Añadir clones con estilos
        [leftReflection, rightReflection].forEach(reflection => {
            const clone = cloneForReflection.cloneNode(true);
            clone.style.display = 'block';
            clone.style.width = '100%';
            clone.style.height = '100%';
            clone.style.objectFit = 'cover';
            reflection.appendChild(clone);
        });
    };

    // Inicializar con primera imagen
    updateReflections();

    function changeImage() {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
        updateReflections();
    }

    // Intervalo con fallback para iOS
    let interval = setInterval(changeImage, 5000);

    // Resetear intervalo al interactuar (para Safari)
    document.addEventListener('touchstart', () => {
        clearInterval(interval);
        interval = setInterval(changeImage, 5000);
    });
});

