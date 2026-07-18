// ===============================
// ❤️ CHUVA DE CORAÇÕES
// ===============================

const area = document.querySelector(".coracoes");

function criarCoracao() {
  const coracao = document.createElement("div");

  coracao.classList.add("coracao");

  coracao.innerHTML = "♥";

  coracao.style.left = Math.random() * 100 + "vw";

  coracao.style.animationDuration = Math.random() * 3 + 4 + "s";

  coracao.style.fontSize = Math.random() * 15 + 25 + "px";

  area.appendChild(coracao);

  setTimeout(() => {
    coracao.remove();
  }, 7000);
}

setInterval(criarCoracao, 300);

// ===============================
// 💌 CARTA
// ===============================

function abrirCarta() {
  const envelope = document.querySelector(".envelope");
  const carta = document.querySelector(".carta-aberta");

  if (navigator.vibrate) {
    navigator.vibrate(35);
  }

  envelope.classList.add("abrindo");

  setTimeout(() => {
    envelope.style.display = "none";
    carta.style.display = "block";

    setTimeout(() => {
      carta.style.opacity = "1";
      carta.style.transform = "scale(1)";
    }, 50);
  }, 550);
}

// ===============================
// ❤️ CONTADOR
// ===============================

const dataNamoro = new Date(2025, 8, 15, 0, 0, 0);

function atualizarTempo() {
  const agora = new Date();

  let meses =
    (agora.getFullYear() - dataNamoro.getFullYear()) * 12 +
    (agora.getMonth() - dataNamoro.getMonth());

  let aniversario = new Date(dataNamoro);

  aniversario.setMonth(aniversario.getMonth() + meses);

  if (agora < aniversario) {
    meses--;

    aniversario = new Date(dataNamoro);

    aniversario.setMonth(aniversario.getMonth() + meses);
  }

  let restante = agora - aniversario;

  const dias = Math.floor(restante / (1000 * 60 * 60 * 24));

  restante %= 1000 * 60 * 60 * 24;

  const horas = Math.floor(restante / (1000 * 60 * 60));

  restante %= 1000 * 60 * 60;

  const minutos = Math.floor(restante / (1000 * 60));

  restante %= 1000 * 60;

  const segundos = Math.floor(restante / 1000);

  document.getElementById("meses").textContent = meses;

  document.getElementById("dias").textContent = dias;

  document.getElementById("horas").textContent = String(horas).padStart(2, "0");

  document.getElementById("minutos").textContent = String(minutos).padStart(
    2,
    "0",
  );

  document.getElementById("segundos").textContent = String(segundos).padStart(
    2,
    "0",
  );
}

atualizarTempo();

setInterval(atualizarTempo, 1000);

// ===============================
// 👉 CARROSSEL SWIPE - NOSSA HISTÓRIA
// ===============================

const linhaHistoria = document.querySelector("#historia .linha");
const dotsHistoria = document.getElementById("dotsHistoria");

if (linhaHistoria && dotsHistoria) {
  const cardsHistoria = linhaHistoria.querySelectorAll(".momento");

  cardsHistoria.forEach((_, i) => {
    const dot = document.createElement("span");
    if (i === 0) dot.classList.add("ativo");
    dotsHistoria.appendChild(dot);
  });

  const dots = dotsHistoria.querySelectorAll("span");

  const observerHistoria = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Array.from(cardsHistoria).indexOf(entry.target);
          dots.forEach((d) => d.classList.remove("ativo"));
          if (dots[index]) dots[index].classList.add("ativo");
        }
      });
    },
    { root: linhaHistoria, threshold: 0.6 },
  );

  cardsHistoria.forEach((card) => observerHistoria.observe(card));
}

// ===============================
// ⏳ TOQUE NO CONTADOR
// ===============================

document.querySelectorAll(".caixa").forEach((caixa) => {
  const frase = caixa.dataset.frase;
  if (!frase) return;

  const balao = document.createElement("div");
  balao.classList.add("frase-caixa");
  balao.textContent = frase;
  caixa.appendChild(balao);

  caixa.addEventListener("click", () => {
    if (navigator.vibrate) {
      navigator.vibrate(20);
    }

    caixa.classList.remove("pulsar");
    void caixa.offsetWidth;
    caixa.classList.add("pulsar");

    balao.classList.add("ativa");

    clearTimeout(caixa._fraseTimeout);
    caixa._fraseTimeout = setTimeout(() => {
      balao.classList.remove("ativa");
    }, 1600);
  });
});

// ===============================
// ⌨️ MÁQUINA DE ESCREVER (INÍCIO)
// ===============================

const texto = "Feliz 1 Ano\nde Namoro ❤️";

const titulo = document.getElementById("titulo");

let indiceTitulo = 0;

function escreverTitulo() {
  if (indiceTitulo < texto.length) {
    if (texto[indiceTitulo] == "\n") {
      titulo.innerHTML += "<br>";
    } else {
      titulo.innerHTML += texto[indiceTitulo];
    }

    indiceTitulo++;

    setTimeout(escreverTitulo, 100);
  }
}

// ===============================
// 📖 CAPÍTULO FINAL
// ===============================

const reveals = document.querySelectorAll(".final-reveal");

let iniciouFinal = false;

function revelar() {
  reveals.forEach((item) => {
    const topo = item.getBoundingClientRect().top;

    if (topo < window.innerHeight - 120) {
      item.classList.add("ativo");
    }
  });

  if (!iniciouFinal) {
    const ultima = document.querySelector(".ultima");

    if (ultima) {
      const topo = ultima.getBoundingClientRect().top;

      if (topo < window.innerHeight - 150) {
        iniciouFinal = true;

        escreverFinal();
      }
    }
  }
}

window.addEventListener("scroll", revelar);

// ===============================
// ❤️ MÁQUINA DE ESCREVER FINAL
// ===============================

const mensagem = `Esse site contou apenas

o nosso primeiro capítulo.

🤍

O resto...

vamos escrever juntos.

Eu te amo.`;

const elemento = document.getElementById("digitando");

let indiceFinal = 0;

function escreverFinal() {
  if (!elemento) return;

  if (indiceFinal < mensagem.length) {
    if (mensagem[indiceFinal] == "\n") {
      elemento.innerHTML += "<br>";
    } else {
      elemento.innerHTML += mensagem[indiceFinal];
    }

    indiceFinal++;

    setTimeout(escreverFinal, 60);
  }
}

// ===============================
// 🎬 LOADING
// ===============================
let siteCarregado = false;
let barraCompleta = false;
const tela = document.getElementById("loading");

function finalizarLoading() {
  if (!siteCarregado || !barraCompleta) return;

  setTimeout(() => {
    tela.style.opacity = "0";

    setTimeout(() => {
      tela.style.display = "none";

      escreverTitulo();
      revelar();

      sessionStorage.setItem("siteCarregado", "true");
    }, 800);
  }, 400);
}

window.addEventListener("load", () => {
  if (sessionStorage.getItem("siteCarregado") === "true") {
    tela.style.display = "none";

    escreverTitulo();
    revelar();

    return;
  }

  siteCarregado = true;

  finalizarLoading();
});

// ===============================
// 💌 POPUP
// ===============================

const popup = document.getElementById("popupFinal");
const abrir = document.getElementById("virarPagina");
const fechar = document.getElementById("fecharPopup");

abrir.addEventListener("click", () => {
  popup.classList.add("ativo");
});

fechar.addEventListener("click", () => {
  popup.classList.remove("ativo");
});

popup.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.classList.remove("ativo");
  }
});

// ===============================
// 📊 BARRA DE CARREGAMENTO
// ===============================

const barra = document.querySelector(".progresso");
const porcentagem = document.getElementById("porcentagem");
const textoLoading = document.getElementById("loadingTexto");
const dog = document.getElementById("dog");

const textos = [
  "Preparando Seu presente... 🎁",
  "Relembrando nossas memórias... 📖",
  "Escrevendo a Sua cartinha... 💌",
  "Carregando todos os 365 motivos... 🌹",
  "Carregando nosso primeiro ano... ❤️",
];

let progresso = 0;

if (barra && porcentagem && textoLoading) {
  const intervalo = setInterval(() => {
    progresso++;

    if (progresso > 100) progresso = 100;

    barra.style.width = progresso + "%";

    if (dog) {
      dog.style.left = `calc(${progresso}% - 65px)`;
    }

    porcentagem.textContent = progresso + "%";

    if (progresso === 20) textoLoading.textContent = textos[1];
    if (progresso === 40) textoLoading.textContent = textos[2];
    if (progresso === 60) textoLoading.textContent = textos[3];
    if (progresso === 80) textoLoading.textContent = textos[4];

    if (progresso === 100) {
      if (dog) {
        dog.style.opacity = "0";

        setTimeout(() => {
          dog.classList.remove("run");
          dog.classList.add("lying");
          dog.style.opacity = "1";
        }, 150);
      }

      clearInterval(intervalo);

      barraCompleta = true;

      setTimeout(() => {
        finalizarLoading();
      }, 250);
    }
  }, 120);
}
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
