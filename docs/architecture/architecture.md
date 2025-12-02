# 🏗️ Arquitetura do Sistema – Será que Chove

O sistema **Será que Chove** segue o modelo **cliente-servidor**, composto por três camadas principais:

---

## 🔹 1. Frontend (Cliente)
- Desenvolvido em **HTML5, CSS3 e JavaScript** puro.  
- Interface responsiva e simples, voltada à consulta de previsão por bairro.  
- Utiliza `fetch()` para consumir as rotas da API (`/api/autocomplete` e `/api/forecast`).  
- As cores e textos variam conforme o nível de probabilidade de chuva.

---

## 🔹 2. Backend (Servidor)
- Implementado em **Node.js com Express**.  
- Responsável por processar as requisições do frontend.  
- Lê as coordenadas geográficas do arquivo `bairros.json`.  
- Integra-se à API pública **Open Meteo Forecast** para obter os dados meteorológicos.  
- Retorna as respostas no formato **JSON**.

---

## 🔹 3. Fonte de Dados
- Utiliza o arquivo **`bairros.json`** como base local de dados.  
- Cada bairro contém: `nome`, `latitude` e `longitude`.  
- A API da Open Meteo fornece dados de precipitação horária e diária.

---

## 🔹 4. Fluxo Geral do Sistema

```mermaid
graph TD
    A[Usuário digita o bairro] --> B[Frontend envia requisição para API]
    B --> C[Backend valida o bairro e busca coordenadas no bairros.json]
    C --> D[Consulta Open Meteo Forecast API]
    D --> E[Backend interpreta as probabilidades]
    E --> F[Retorno JSON para o Frontend]
    F --> G[Frontend exibe previsão colorida e textual]
