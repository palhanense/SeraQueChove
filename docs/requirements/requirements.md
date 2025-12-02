
---

## 📄 **2️⃣ `docs/requirements/requirements.md`**

```markdown
# 📋 Requisitos do Sistema – Será que Chove

---

## 🔹 Requisitos Funcionais
1. O sistema deve permitir a busca de previsão de chuva por bairro em Fortaleza.  
2. O campo de busca deve possuir **autocompletar**.  
3. Deve exibir três janelas de previsão: **6h, 12h e 24h**.  
4. Cada previsão deve mostrar:
   - Percentual de probabilidade de chuva.  
   - Mensagem textual interpretativa (ex.: “Provavelmente não chove”).  
   - Cor indicativa correspondente ao nível de probabilidade.  
5. O sistema deve mostrar a **latitude e longitude** do bairro consultado.  
6. Deve exibir a **data e hora da última atualização**.  

---

## 🔹 Requisitos Não Funcionais
1. A aplicação deve ser responsiva e acessível.  
2. Deve utilizar tecnologias web leves: **HTML, CSS e JavaScript**.  
3. O backend deve ser implementado em **Node.js com Express**.  
4. A integração com dados meteorológicos deve ser feita via **API Open Meteo**.  
5. O sistema deve retornar respostas em formato **JSON**.  
6. A arquitetura deve seguir o padrão **cliente-servidor**.  

---

## 🔹 Restrições
- O sistema é voltado para o município de **Fortaleza – CE**.  
- As previsões dependem da disponibilidade da **Open Meteo API**.  
- O arquivo `bairros.json` deve conter a lista de bairros e coordenadas válidas.

---

📍 **Autor:** 

- Diego Ferreira Santiago
- Emerson Leonardo de Lima Pinto
- Geovani Alves Saraiva
- Vitor Alexandre Melo Costa
- Fabrício Silva dos Santos
- 

📍 **Disciplina:** Projeto Aplicado Multiplataforma – Etapa 2 (N708)
