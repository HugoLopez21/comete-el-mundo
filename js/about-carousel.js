/* CARRUSEL ABOUT (muy simple) Cambia de imagen cada 3s usando solo opacity-- */
let aboutIndex = 0;
const aboutImages = document.querySelectorAll(".about-carousel img");

function changeAboutImage() {
  if (!aboutImages.length) return;

  aboutIndex = (aboutIndex + 1) % aboutImages.length;

  aboutImages.forEach((img, i) => {
    img.style.opacity = i === aboutIndex ? "1" : "0";
  });
}

// Mostrar primera imagen
changeAboutImage();
setInterval(changeAboutImage, 3000);



