let indiceSelecionado = -1;
const API_BASE = (() => {
  const hostname = window.location.hostname;
  if (!hostname || hostname === "localhost" || hostname === "127.0.0.1") {
    return "http://localhost:3000";
  }
  return `http://${hostname}:3000`;
})();


async function autocompletar() {
  const input = document.getElementById("bairro");
  const valor = input.value.trim();
  const sugestoesUl = document.getElementById("sugestoes");
  
  indiceSelecionado = -1;

  if (valor.length < 1) {
    sugestoesUl.innerHTML = "";
    sugestoesUl.classList.remove("ativa");
    return;
  }

  try {
    const res = await fetch(
      `${API_BASE}/api/autocomplete/${encodeURIComponent(valor)}`
    );
    const bairros = await res.json();

    sugestoesUl.innerHTML = "";

    if (bairros.length === 0) {
      sugestoesUl.classList.remove("ativa");
      return;
    }

    bairros.forEach((bairro) => {
      const li = document.createElement("li");
      li.textContent = bairro;
      li.onclick = () => selecionarBairro(bairro);
      sugestoesUl.appendChild(li);
    });

    sugestoesUl.classList.add("ativa");
  } catch (error) {
    console.error("Erro ao buscar sugestões:", error);
  }
}

function selecionarBairro(bairro) {
  document.getElementById("bairro").value = bairro;
  document.getElementById("sugestoes").innerHTML = "";
  document.getElementById("sugestoes").classList.remove("ativa");
  buscar();
}

function navegarSugestoes(event) {
  const sugestoes = document.querySelectorAll(".sugestoes li");
  const sugestoesUl = document.getElementById("sugestoes");

  if (event.key === "ArrowDown") {
    event.preventDefault();
    if (sugestoes.length > 0) {
      indiceSelecionado = Math.min(indiceSelecionado + 1, sugestoes.length - 1);
      atualizarSelecionada(sugestoes);
    }
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    if (sugestoes.length > 0) {
      indiceSelecionado = Math.max(indiceSelecionado - 1, -1);
      atualizarSelecionada(sugestoes);
    }
  } else if (event.key === "Enter") {
    event.preventDefault();
    if (indiceSelecionado >= 0 && sugestoes[indiceSelecionado]) {
      selecionarBairro(sugestoes[indiceSelecionado].textContent);
    } else {
      buscar();
    }
  } else if (event.key === "Escape") {
    sugestoesUl.innerHTML = "";
    sugestoesUl.classList.remove("ativa");
    indiceSelecionado = -1;
  }
}

function atualizarSelecionada(sugestoes) {
  sugestoes.forEach((li, index) => {
    if (index === indiceSelecionado) {
      li.classList.add("selecionada");
      li.scrollIntoView({ block: "nearest" });
    } else {
      li.classList.remove("selecionada");
    }
  });
}

document.addEventListener("click", (event) => {
  const input = document.getElementById("bairro");
  const sugestoes = document.getElementById("sugestoes");
  if (!input.contains(event.target) && !sugestoes.contains(event.target)) {
    sugestoes.classList.remove("ativa");
  }
});

async function buscar() {
  const bairro = document.getElementById("bairro").value.trim();
  if (!bairro) {
    alert("Digite um bairro!");
    return;
  }

  try {
    const res = await fetch(
      `${API_BASE}/api/forecast/${encodeURIComponent(bairro)}`
    );
    const data = await res.json();
    if (!res.ok) {
      alert(data.erro || "Erro ao buscar previsão");
      return;
    }

    const container = document.getElementById("resultado");
    container.innerHTML = `<h2>${data.bairro}</h2>
                           <p>📍 Latitude: ${data.latitude.toFixed(4)} | Longitude: ${data.longitude.toFixed(4)}</p>
                           <p>⏰ Última atualização: ${data.atualizado}</p>`;

    data.previsao.forEach((p) => {
      const cor = getCor(p.probabilidade);
      const bloco = document.createElement("div");
      bloco.className = "bloco";
      bloco.style.backgroundColor = cor;
      bloco.innerHTML = `<h3>${p.janela}</h3>
                         <p>${p.probabilidade}%</p>
                         <strong>${p.mensagem}</strong>`;
      container.appendChild(bloco);
    });
  } catch (error) {
    alert("Erro ao buscar previsão! Verifique se o backend está rodando.");
  }
}

function getCor(prob) {
  if (prob < 20) return "#A8E6CF"; 
  if (prob < 40) return "#A9DEF9"; 
  if (prob < 80) return "#FFF9C4"; 
  return "#FFD6A5"; 
}
