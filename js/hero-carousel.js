const dots = document.querySelectorAll('.dot'); //Coger indicadores de slide
const images = document.querySelectorAll('.slide-image'); //Coge todas las fotos
const infos = document.querySelectorAll('.text-container'); //Coge el contenedor del texto de las slide

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        //Al hacer click en un indiciador establece el numero de la slide 
        const slideNumber = dot.dataset.slide;

        // Mueve las im
        images.forEach(img => {
        img.style.transform = `translateX(-${(slideNumber - 1) * 100}%)`;
        });

        //Cambia el estilo del indicador de slide 
        dots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');

        // Esconde el texto actual
        infos.forEach(info => info.classList.remove('active'));
        
        // Muestra el texto de la slide segun el id de la slide
        document.getElementById(`info-${slideNumber}`).classList.add('active');
    });
});
