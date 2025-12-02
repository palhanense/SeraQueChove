#  Será que Chove?

Aplicação web responsiva que fornece **previsões de chuva por bairro em Fortaleza (CE)**.  
Desenvolvida na disciplina **Projeto Aplicado Multiplataforma – Etapa 2 (N708)**.

---

## 🧭 Objetivo

Oferecer previsões locais e acessíveis, utilizando **linguagem simples e visual intuitivo**, com cores que representam a **probabilidade de chuva**.  
O sistema contribui para o **ODS 11 – Cidades e Comunidades Sustentáveis**, promovendo acesso à informação climática de forma prática e inclusiva.

---

##  Funcionalidades

-  Campo de busca com **autocompletar** de bairros  
-  Previsão em **três janelas de tempo** (6h, 12h e 24h)  
-  Exibição de **latitude e longitude** do bairro consultado  
-  **Cores e mensagens** variam conforme o nível de probabilidade de chuva  
-  **Feedback real de usuários** obtido por meio de formulário de validação  

---

##  Tecnologias Utilizadas

**Frontend:**  
- HTML5  
- CSS3  
- JavaScript  

**Backend:**  
- Node.js  
- Express  
- Axios  

**Banco de Dados:**  
- Arquivo local `bairros.json` (com nomes e coordenadas dos bairros)

**API Externa:**  
- [Open Meteo Forecast](https://open-meteo.com/)  

---

##  Execução

###  Backend
npm start

###  Frontend
Basta abrir o arquivo `frontend/web/src/index.html` em um navegador moderno.

---

##  Arquitetura do Sistema

O sistema segue uma arquitetura cliente-servidor simples:

*   **Frontend (Cliente):** Responsável pela interação com o usuário. Envia o nome do bairro para o backend e exibe os dados retornados.
*   **Backend (Servidor):** Recebe a requisição, consulta as coordenadas do bairro no "banco de dados" local (`bairros.json`) e busca a previsão do tempo na API externa (Open Meteo).
*   **Integrações:**
    *   **Open Meteo API:** Fonte dos dados meteorológicos.

---

## 🚀 Acesso ao Sistema

*   **Ambiente de Desenvolvimento:** O sistema foi projetado para rodar localmente. Siga as instruções de execução acima.
*   **Credenciais:** Não é necessário login/senha para acesso, o sistema é aberto.

---

## 👥 Validação com Público-Alvo

A validação foi realizada com moradores de bairros de Fortaleza, focando na usabilidade e clareza das informações.

*   **Público-Alvo:** Moradores de Fortaleza que buscam informações rápidas sobre chuva.
*   **Resumo:** O feedback foi majoritariamente positivo, destacando a simplicidade e a clareza das cores de alerta.
*   **Ajustes:** A interface foi refinada para garantir que as cores (verde, amarelo, vermelho) fossem intuitivas.

Para mais detalhes, consulte a pasta `validation/`.

---

## 👨‍💻 Equipe de Desenvolvimento

**Emerson Leonardo de Lima Pinto - 2327093**
**Geovani Alves Saraiva - 2327339**
**Vitor Alexandre Melo Costa - 2326346**
**Diego Ferreira Santiago - 2327166**
**Fabrício Silva dos Santos - 2318148**
**Yngrid Santos Holanda – 2317668**
