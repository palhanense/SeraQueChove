-- Arquivo de definição do esquema do banco de dados
-- Embora o projeto utilize um arquivo JSON (bairros.json) como banco de dados,
-- este arquivo descreve a estrutura equivalente em SQL para fins de documentação e conformidade com a proposta.

CREATE TABLE IF NOT EXISTS bairros (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL
);

-- Exemplo de inserção de dados baseado no arquivo bairros.json
-- INSERT INTO bairros (nome, latitude, longitude) VALUES ('Jardim Guanabara', -3.7239106, -38.5902646);
