import request from "supertest";
import app from "../src/server.js"; // Importa o servidor Express

describe("🌧️ Testes da API - Será que Chove?", () => {
  // Teste 1: Verificar se a rota autocomplete funciona
  it("Deve retornar sugestões de bairros no autocomplete", async () => {
    const res = await request(app).get("/api/autocomplete/Alde");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Teste 2: Verificar se a rota forecast retorna dados válidos
  it("Deve retornar previsão para o bairro Aldeota", async () => {
    const res = await request(app).get("/api/forecast/Aldeota");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("bairro");
    expect(res.body).toHaveProperty("previsao");
    expect(Array.isArray(res.body.previsao)).toBe(true);
  });

  // Teste 3: Verificar se um bairro inválido gera erro 404
  it("Deve retornar erro 404 para bairro inexistente", async () => {
    const res = await request(app).get("/api/forecast/Inexistente");
    expect(res.statusCode).toBe(404);
  });
});
