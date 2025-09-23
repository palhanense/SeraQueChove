#  API do Projeto, Será que chove

## 1. Endpoints previstos

| Método, Rota | Finalidade |
|---|---|
| GET, `/v1/bairros` | Lista os bairros disponíveis, para popular o autocomplete |
| GET, `/v1/relato-texto` | Retorna a previsão em texto para 6h, 12h e 24h, por bairro |
| GET, `/v1/relato` | Retorna a previsão em JSON estruturado, por bairro |
| GET, `/v1/health` | Saúde do serviço, latências e idade média dos dados |
| GET, `/v1/status-cache` | Diagnóstico opcional, acertos e validade do cache, somente ambiente de teste |

Observação, não há login, a proteção é feita por verificação humana, captcha.

---

## 2. Parâmetros de requisição

### 2.1 GET, `/v1/bairros`
Sem parâmetros obrigatórios.  
Parâmetros opcionais, `q`, filtro de texto, `limit`, limite de registros.

### 2.2 GET, `/v1/relato-texto`
Obrigatórios, `bairro_id`, UUID do bairro.  
Opcionais, `janela`, valores permitidos `6,12,24` separados por vírgula, padrão `6,12,24`.

Cabeçalhos, `X-Human-Token`, token de verificação humana válido.

### 2.3 GET, `/v1/relato`
Obrigatórios, `bairro_id`, UUID do bairro.  
Opcionais, `detalhe`, booleano, quando `true`, inclui campos extras de depuração.

Cabeçalhos, `X-Human-Token`, token de verificação humana válido.

### 2.4 GET, `/v1/health`
Sem parâmetros.  

### 2.5 GET, `/v1/status-cache` , somente teste
Opcionais, `bairro_id`, quando informado, retorna métricas só para o bairro.

---

## 3. Formatos de resposta

### 3.1 GET, `/v1/bairros` 200
```json
{
  "items": [
    {"id": "uuid-1", "nome": "Aldeota", "cidade": "Fortaleza", "uf": "CE"},
    {"id": "uuid-2", "nome": "Meireles", "cidade": "Fortaleza", "uf": "CE"}
  ],
  "total": 111
}
```
### 3.2 GET, /v1/relato-texto 200, text/plain; charset=utf-8
Aldeota
Próximas 6 horas
provavelmente chove
72% chance de chuva

Próximas 12 horas
pode chover
55% chance de chuva

Próximas 24 horas
muito provavelmente chove
88% chance de chuva

Atualizado às 14h10

### 3.3 GET, /v1/relato 200, application/json
```json
{
  "bairro": "Aldeota",
  "bairro_id": "uuid-1",
  "timezone": "America/Fortaleza",
  "atualizado_as": "2025-10-01T14:10:00-03:00",
  "proxima_atualizacao": "2025-10-01T15:00:00-03:00",
  "blocos": [
    {"periodo": "Próximas 6 horas", "frase": "provavelmente chove", "prob_max": 72, "nivel_cor": "amarelo"},
    {"periodo": "Próximas 12 horas", "frase": "pode chover", "prob_max": 55, "nivel_cor": "amarelo"},
    {"periodo": "Próximas 24 horas", "frase": "muito provavelmente chove", "prob_max": 88, "nivel_cor": "laranja"}
  ],
  "fonte": "open_meteo"
}
```
### 3.4 GET, /v1/health 200
```json
{
  "status": "ok",
  "uptime_s": 86400,
  "avg_latency_ms": 180,
  "cache_hit_rate": 0.95,
  "avg_snapshot_age_min": 32
}
```

### 3.5 Erros padronizados
4xx e 5xx, application/json.
```json
{
  "erro": "parametro_invalido",
  "mensagem": "bairro_id ausente ou inválido",
  "correlacao": "req-3f61f1c6"
}
```
Códigos comuns, 400 parâmetro inválido, 401 verificação humana ausente ou inválida, 404 bairro não encontrado, 429 muitas requisições, 502 erro no provedor externo, 503 serviço indisponível.

## 4. Autenticação e autorização
Não há autenticação de usuário.
Proteção básica por verificação humana, captcha.

|  Mecanismo  |  Como enviar  |
|-------------|---------------|
|  Verificação humana  |  Cabeçalho X-Human-Token, valor emitido pelo captcha  |

Regras, requisições aos endpoints GET /v1/relato-texto e GET /v1/relato devem conter X-Human-Token válido.
Autorização, não aplicável, dados são públicos.

## 5. Exemplos de chamadas e respostas
### 5.1 Listar bairros
curl -s https://api.seiraquechove.com.br/v1/bairros
Resposta 200, ver 3.1.

### 5.2 Relato em texto, todas as janelas
curl -s \
  -H "X-Human-Token: <token-captcha>" \
  "https://api.seiraquechove.com.br/v1/relato-texto?bairro_id=<UUID>"
Resposta 200, text/plain, ver 3.2.

### 5.3 Relato em texto, janela específica
curl -s \
  -H "X-Human-Token: <token-captcha>" \
  "https://api.seiraquechove.com.br/v1/relato-texto?bairro_id=<UUID>&janela=6,24"
  
### 5.5 Health check
curl -s https://api.seiraquechove.com.br/v1/health

## 6.  Convenções adicionais

| Tema | Convenção |
|------|-----------|
| Idioma | Português do Brasil (PT-BR) em textos e mensagens |
| Timezone | America/Fortaleza em chamadas ao provedor e carimbos públicos |
| Cache cliente | Respostas em texto podem ser armazenadas por até **60 segundos**, controlado via cabeçalho `Cache-Control` |
| Rate limit | **60 requisições por minuto por IP**, excedentes recebem resposta **429 Too Many Requests** |
| Cor dos blocos | Verde, azul, amarelo e laranja, aplicadas somente na **interface**, conforme faixa de probabilidade |
