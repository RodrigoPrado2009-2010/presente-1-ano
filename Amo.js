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

  envelope.style.opacity = "0";
  envelope.style.transform = "scale(0)";

  setTimeout(() => {
    envelope.style.display = "none";

    carta.style.display = "block";

    setTimeout(() => {
      carta.style.opacity = "1";

      carta.style.transform = "scale(1)";
    }, 50);
  }, 200);
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
  // Já carregou nesta aba
  if (sessionStorage.getItem("siteCarregado") === "true") {
    tela.style.display = "none";

    escreverTitulo();
    revelar();

    return;
  }

  siteCarregado = true;

  finalizarLoading();
});

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

const barra = document.querySelector(".progresso");
const porcentagem = document.getElementById("porcentagem");
const textoLoading = document.getElementById("loadingTexto");

const textos = [
  "Preparando Seu presente... 🎁",
  "Relembrando nossas memórias... 📖",
  "Escrevendo a Sua cartinha... 💌",
  "Carregando todos os 365 motivos... 🌹",
  "Carregando nosso primeiro ano... ❤️",
];

let progresso = 0;

const intervalo = setInterval(() => {
  progresso++;

  if (progresso > 100) progresso = 100;

  barra.style.width = progresso + "%";
  porcentagem.textContent = progresso + "%";

  if (progresso === 20) textoLoading.textContent = textos[1];
  if (progresso === 40) textoLoading.textContent = textos[2];
  if (progresso === 60) textoLoading.textContent = textos[3];
  if (progresso === 80) textoLoading.textContent = textos[4];

  if (progresso === 100) {
    clearInterval(intervalo);

    barraCompleta = true;

    finalizarLoading();
  }
}, 100);

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
