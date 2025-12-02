import express from "express";
import axios from "axios";
import cors from "cors";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const bairrosData = JSON.parse(readFileSync("./bairros.json", "utf8"));

const normalizarTexto = (texto = "") =>
  texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const bairros = bairrosData.bairros.map((bairro) => ({
  ...bairro,
  nomeNormalizado: normalizarTexto(bairro.nome),
}));

const app = express();
app.use(cors());

// Função para encontrar coordenadas do bairro
function obterCoordenadas(nomeBairro = "") {
  const alvoNormalizado = normalizarTexto(nomeBairro);
  const bairro = bairros.find((b) => b.nomeNormalizado === alvoNormalizado);
  return bairro || null;
}

// Rota de autocompletar
app.get("/api/autocomplete/:busca", (req, res) => {
  const buscaOriginal = (req.params.busca || "").trim();
  const buscaNormalizada = normalizarTexto(buscaOriginal);

  if (!buscaNormalizada) {
    return res.json([]);
  }

  const bairrosFiltrados = bairros
    .filter((b) => b.nomeNormalizado.includes(buscaNormalizada))
    .map((b) => b.nome)
    .slice(0, 10); // Limita a 10 sugestões

  res.json(bairrosFiltrados);
});

// Rota principal de previsão
app.get("/api/forecast/:bairro", async (req, res) => {
  try {
    const bairroNome = (req.params.bairro || "").trim();
    const bairro = obterCoordenadas(bairroNome);

    if (!bairro) {
      return res.status(404).json({ 
        erro: `Bairro "${bairroNome}" não encontrado. Verifique a ortografia.` 
      });
    }

    const latitude = bairro.latitude;
    const longitude = bairro.longitude;

    const { data } = await axios.get("https://api.open-meteo.com/v1/forecast", {
      params: {
        latitude,
        longitude,
        hourly: "precipitation_probability",
        timezone: "America/Fortaleza",
      },
    });

    // Pega as previsões para 6h, 12h e 24h
    const prob6h = data.hourly.precipitation_probability[0];
    const prob12h = data.hourly.precipitation_probability[6];
    const prob24h = data.hourly.precipitation_probability[12];

    const interpretar = (p) => {
      if (p < 20) return "Provavelmente não chove";
      if (p < 40) return "Pouca chance de chuva";
      if (p < 60) return "Pode chover";
      if (p < 80) return "Provavelmente chove";
      return "Muito provavelmente chove";
    };

    const previsao = [
      { janela: "6h", probabilidade: prob6h, mensagem: interpretar(prob6h) },
      { janela: "12h", probabilidade: prob12h, mensagem: interpretar(prob12h) },
      { janela: "24h", probabilidade: prob24h, mensagem: interpretar(prob24h) },
    ];

    res.json({ 
      bairro: bairro.nome, 
      latitude: bairro.latitude,
      longitude: bairro.longitude,
      previsao, 
      atualizado: new Date().toLocaleString("pt-BR") 
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ erro: "Falha ao obter previsão" });
  }
});

if (process.env.NODE_ENV !== "test") {
  app.listen(3000, () => console.log("✅ API rodando em http://localhost:3000"));
}

export default app;


