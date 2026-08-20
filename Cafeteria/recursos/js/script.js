document.addEventListener("DOMContentLoaded", () => {
const carrusel = document.querySelector(".carrusel-espacio");
const zonas = document.querySelectorAll(".carrusel-zona");

if (!carrusel || zonas.length === 0) return;

  const VELOCIDAD_PX_POR_FRAME = 6; // más alto = desliza más rápido
let cuadro = null;

function desplazar(direccion) {
    detener();
    const paso = () => {
      carrusel.scrollLeft += VELOCIDAD_PX_POR_FRAME * direccion;
    cuadro = requestAnimationFrame(paso);
    };
    cuadro = requestAnimationFrame(paso);
}

function detener() {
    if (cuadro !== null) {
    cancelAnimationFrame(cuadro);
    cuadro = null;
    }
}

zonas.forEach((zona) => {
    const direccion = Number(zona.dataset.direccion);

    zona.addEventListener("mouseenter", () => desplazar(direccion));
    zona.addEventListener("focus", () => desplazar(direccion));
    zona.addEventListener("mouseleave", detener);
    zona.addEventListener("blur", detener);

    // También sirve como botón normal para quien navega con teclado/touch
    zona.addEventListener("click", () => {
      carrusel.scrollBy({ left: direccion * 320, behavior: "smooth" });
    });
});

  // Si el mouse sale del carrusel por completo, cortamos el movimiento
carrusel.addEventListener("mouseleave", detener);
});