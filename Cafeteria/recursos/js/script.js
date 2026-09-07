document.addEventListener("DOMContentLoaded", () => {
  const encabezado = document.querySelector(".encabezado-principal");
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector("#menuColapsable");

  if (!encabezado || !menuToggle || !menu) return;

  function cerrarMenu() {
    encabezado.classList.remove("menu-abierto");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
  }

  menuToggle.addEventListener("click", () => {
    const abierto = encabezado.classList.toggle("menu-abierto");
    menuToggle.setAttribute("aria-expanded", String(abierto));
    menuToggle.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
  });

  menu.querySelectorAll("a").forEach((enlace) => {
    enlace.addEventListener("click", cerrarMenu);
  });

  document.addEventListener("click", (evento) => {
    if (!encabezado.contains(evento.target) && encabezado.classList.contains("menu-abierto")) {
      cerrarMenu();
    }
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") cerrarMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 700) cerrarMenu();
  });
});

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

document.addEventListener("DOMContentLoaded", () => {
  const pills = document.querySelectorAll(".carta-pill");
  const paneles = document.querySelectorAll(".carta-panel");
  const puedeHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (pills.length === 0 || paneles.length === 0) return;

  function activarCategoria(pill) {
    pills.forEach((otraPill) => {
      const activa = otraPill === pill;
      otraPill.classList.toggle("activo", activa);
      otraPill.setAttribute("aria-selected", String(activa));
      otraPill.setAttribute("tabindex", activa ? "0" : "-1");
    });

    paneles.forEach((panel) => {
      panel.hidden = panel.id !== pill.getAttribute("aria-controls");
    });
  }

  function animarPill(pill, mostrar) {
    if (!puedeHover || !window.gsap) return;
    gsap.to(pill, {
      "--circulo-escala": mostrar ? 1 : 0,
      duration: 0.45,
      ease: "power3.out"
    });
  }

  pills.forEach((pill, indice) => {
    pill.addEventListener("click", () => activarCategoria(pill));

    if (puedeHover) {
      pill.addEventListener("mouseenter", () => animarPill(pill, true));
      pill.addEventListener("mouseleave", () => animarPill(pill, false));
    }

    pill.addEventListener("keydown", (evento) => {
      let siguiente = indice;

      if (evento.key === "ArrowRight" || evento.key === "ArrowDown") {
        siguiente = (indice + 1) % pills.length;
      } else if (evento.key === "ArrowLeft" || evento.key === "ArrowUp") {
        siguiente = (indice - 1 + pills.length) % pills.length;
      } else if (evento.key === "Home") {
        siguiente = 0;
      } else if (evento.key === "End") {
        siguiente = pills.length - 1;
      } else {
        return;
      }

      evento.preventDefault();
      pills[siguiente].focus();
      activarCategoria(pills[siguiente]);
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const pared = document.querySelector(".pared-resenas");
  const columnas = document.querySelectorAll(".resenas-columna");
  const reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!pared || columnas.length === 0) return;

  if (!reducirMovimiento && window.gsap) {
    columnas.forEach((columna) => {
      const pista = columna.querySelector(".resenas-pista");
      const tarjetas = Array.from(pista.children);
      const velocidad = Number(columna.dataset.velocidad) || 36;
      const direccion = Number(columna.dataset.direccion) || -1;

      tarjetas.forEach((tarjeta) => pista.appendChild(tarjeta.cloneNode(true)));

      const distancia = pista.scrollHeight / 2;
      const inicio = direccion === 1 ? -distancia : 0;
      const fin = direccion === 1 ? 0 : -distancia;

      gsap.fromTo(
        pista,
        { y: inicio },
        {
          y: fin,
          duration: velocidad,
          ease: "none",
          repeat: -1
        }
      );
    });

    pared.addEventListener("mousemove", (evento) => {
      const rect = pared.getBoundingClientRect();
      const x = (evento.clientX - rect.left) / rect.width - 0.5;
      const y = (evento.clientY - rect.top) / rect.height - 0.5;

      gsap.to(pared, {
        rotateY: x * 4,
        rotateX: y * -3,
        duration: 0.8,
        ease: "power2.out",
        overwrite: true
      });
    });

    pared.addEventListener("mouseleave", () => {
      gsap.to(pared, { rotateX: 0, rotateY: 0, duration: 1, ease: "power3.out" });
    });
  }
});