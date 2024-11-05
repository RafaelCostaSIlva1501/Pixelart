const canvas = document.querySelector(".canvas");

const brush = document.querySelector(".button-brush");
const eraser = document.querySelector(".button-eraser");
const grid = document.querySelector(".button-grid");
const download = document.querySelector(".button-download");

const selectColor = document.querySelector(".input-color");
const colors = document.querySelectorAll(".button-color");

const sub = document.querySelector(".button-sub");
const add = document.querySelector(".button-add");
const size = document.querySelector(".input-size");

let isPaiting = false;
let pencil = "brush";
let gridON = false;

// Função para criar as tags "row" e "pixel"
const createElement = (tag, className = "") => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

// Função para criar um único pixel no canvas
const createPixel = () => {
  // Cria um elemento <div> com a classe "pixel"
  const pixel = createElement("div", "pixel");

  // Adiciona um evento ao pixel para pintá-lo ao clicar com o mouse
  pixel.addEventListener("mousedown", () => paintingPixel(pixel));

  // Adiciona um evento ao pixel para pintá-lo ao passar o mouse por cima
  // se a variável "isPaiting" estiver ativa
  pixel.addEventListener("mouseover", () => {
    if (isPaiting) paintingPixel(pixel);
  });

  return pixel; // Retorna o pixel criado
};

// Função para carregar o canvas com uma grade de pixels
const loadCanvas = () => {
  // Define o tamanho do canvas com base no valor selecionado pelo usuário
  const length = size.value;

  // Loop externo para criar cada linha de pixels
  for (let i = 0; i < length; i += 1) {
    // Cria um elemento <div> com a classe "row" para representar uma linha
    const row = createElement("div", "row");

    // Loop interno para criar cada pixel na linha
    for (let j = 0; j < length; j += 1) {
      // Adiciona um pixel (div com a classe "pixel") na linha
      row.append(createPixel());
    }

    // Adiciona a linha de pixels no canvas
    canvas.append(row);
  }
};

brush.addEventListener("click", () => {
  pencil = "brush";
});

eraser.addEventListener("click", () => {
  pencil = "erase";
});

// Função para pintar ou apagar um pixel específico
const paintingPixel = (pixel) => {
  if (pencil === "brush") {
    // Se a ferramenta selecionada for o "brush" (pincel)
    pixel.style.backgroundColor = selectColor.value; // Pinta o pixel com a cor selecionada
  } else if (pencil === "erase") {
    // Se a ferramenta selecionada for "erase" (borracha)
    pixel.style.backgroundColor = "transparent";
  }
};

sub.addEventListener("click", () => {
  if (size.value > 2) {
    // Impede que o valor fique abaixo de 1
    size.value = parseInt(size.value) - 1;
    canvas.innerHTML = ""; // Limpa o canvas atual
    loadCanvas(); // Recarrega o canvas com o novo tamanho
  }
});

add.addEventListener("click", () => {
  size.value = parseInt(size.value) + 1;
  canvas.innerHTML = ""; // Limpa o canvas atual
  loadCanvas(); // Recarrega o canvas com o novo tamanho
});

size.addEventListener("input", () => {
  canvas.innerHTML = "";
  loadCanvas();
});

grid.addEventListener("click", () => {
  gridON = !gridON;

  const pixel = document.querySelectorAll(".pixel");

  if (gridON) {
    pixel.forEach((e) => {
      e.style.margin = "1px 1px 0px 0px";
    });
  } else {
    pixel.forEach((e) => {
      e.style.margin = "0px";
    });
  }
});

canvas.addEventListener("mousedown", () => (isPaiting = true));

canvas.addEventListener("mouseup", () => (isPaiting = false));

canvas.addEventListener("mouseleave", () => {isPaiting = false})

colors.forEach((e) => {
  e.style.backgroundColor = e.dataset.color;

  e.addEventListener("click", () => {
    selectColor.value = e.dataset.color;
  });
});

const downloadCanvas = () => {
  canvas.classList.add("dimensions");

  html2canvas(canvas).then(function (canvas) {
    var imageURL = canvas.toDataURL("image/png");

    var link = document.createElement("a");
    link.href = imageURL;
    link.download = "pixelart.png";
    link.click();
  });

  canvas.classList.remove("dimensions");
};

download.addEventListener("click", downloadCanvas);

loadCanvas();




