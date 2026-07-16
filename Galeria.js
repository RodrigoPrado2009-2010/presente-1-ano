// ======================================
// ELEMENTOS
// ======================================

const slider = document.getElementById("slider");
const slides = document.querySelectorAll(".slide");
const indicadores = document.querySelectorAll(".indicadores span");

let indice = 0;

// ======================================
// ATUALIZA SLIDER
// ======================================

function atualizarSlider(animacao = true) {
  slider.style.transition = animacao
    ? "transform .7s cubic-bezier(.22,1,.36,1)"
    : "none";

  slider.style.transform = `translate3d(-${indice * window.innerWidth}px,0,0)`;

  slides.forEach((slide, i) => {
    slide.classList.toggle("ativa", i === indice);
  });

  indicadores.forEach((item, i) => {
    item.classList.toggle("ativo", i === indice);
  });
}

// ======================================
// NAVEGAÇÃO
// ======================================

function proximo() {
  if (indice < slides.length - 1) {
    indice++;
    atualizarSlider();
  }
}

function anterior() {
  if (indice > 0) {
    indice--;
    atualizarSlider();
  }
}

// ======================================
// TECLADO
// ======================================

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") proximo();
  if (e.key === "ArrowLeft") anterior();
});

// ======================================
// TOUCH
// ======================================

let startX = 0;
let currentX = 0;
let arrastando = false;

slider.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  currentX = startX;
  arrastando = true;
});

slider.addEventListener("touchmove", (e) => {
  if (!arrastando) return;

  currentX = e.touches[0].clientX;

  const mover = currentX - startX;

  atualizarSlider(false);

  slider.style.transform = `translate3d(${
    -indice * window.innerWidth + mover
  }px,0,0)`;
});

slider.addEventListener("touchend", () => {
  if (!arrastando) return;

  arrastando = false;

  const distancia = startX - currentX;

  if (distancia > 70 && indice < slides.length - 1) {
    indice++;
  } else if (distancia < -70 && indice > 0) {
    indice--;
  }

  atualizarSlider();
});

// ======================================
// DRAG NO PC
// ======================================

let mouseDown = false;
let mouseInicio = 0;
let mouseAtual = 0;

slider.addEventListener("mousedown", (e) => {
  mouseDown = true;
  mouseInicio = e.clientX;
  mouseAtual = mouseInicio;
  slider.style.cursor = "grabbing";
});

window.addEventListener("mousemove", (e) => {
  if (!mouseDown) return;

  mouseAtual = e.clientX;

  const mover = mouseAtual - mouseInicio;

  atualizarSlider(false);

  slider.style.transform = `translate3d(${
    -indice * window.innerWidth + mover
  }px,0,0)`;
});

window.addEventListener("mouseup", () => {
  if (!mouseDown) return;

  mouseDown = false;
  slider.style.cursor = "grab";

  const distancia = mouseInicio - mouseAtual;

  if (distancia > 80 && indice < slides.length - 1) {
    indice++;
  } else if (distancia < -80 && indice > 0) {
    indice--;
  }

  atualizarSlider();
});

// ======================================
// INDICADORES
// ======================================

indicadores.forEach((item, i) => {
  item.addEventListener("click", () => {
    indice = i;
    atualizarSlider();
  });
});

// ======================================
// RESPONSIVO
// ======================================

window.addEventListener("resize", () => {
  atualizarSlider(false);
});

// ======================================
// INICIAR
// ======================================

atualizarSlider(false);

// ===============================
// TRANSIÇÃO ENTRE PÁGINAS
// ===============================

const transition = document.querySelector(".page-transition");

document.querySelectorAll("a[href]").forEach((link) => {
  const href = link.getAttribute("href");

  if (href && !href.startsWith("#") && !href.startsWith("http")) {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      transition.classList.add("ativa");

      setTimeout(() => {
        window.location.href = href;
      }, 450);
    });
  }
});
