#  Requisitos do Sistema "Será que chove?"

##  Requisitos Funcionais (RF)
- **RF01**: Permitir ao usuário selecionar um bairro a partir de uma lista oficial.  
- **RF02**: Exibir a previsão de chuva para 3 janelas de tempo (6h, 12h e 24h).  
- **RF03**: Mostrar as informações em formato textual simples, sem gráficos.  
- **RF04**: Destacar as previsões com cores de fundo conforme nível de probabilidade.  
- **RF05**: Informar a data/hora da última atualização da previsão.  
- **RF06**: Exibir mensagem de erro em caso de indisponibilidade do serviço externo (Open Meteo).  
- **RF07**: Aplicar validação humana (captcha) antes de processar a consulta.  

##  Requisitos Não-Funcionais (RNF)
- **RNF01**: O sistema deve ser responsivo, acessível tanto em desktop quanto em dispositivos móveis.  
- **RNF02**: O tempo máximo de resposta para consulta deve ser de até 3 segundos em condições normais de rede.  
- **RNF03**: A arquitetura deve suportar cache de previsões em Redis, com TTL adaptativo entre 15 e 120 minutos.  
- **RNF04**: O banco de dados deve armazenar bairros, previsões horárias, previsões diárias e snapshots.  
- **RNF05**: A API deve seguir padrões REST e expor endpoints simples para previsão textual.  
- **RNF06**: A aplicação deve utilizar integração segura com o serviço externo Open Meteo.  
- **RNF07**: A interface deve manter consistência de cores, tipografia e hierarquia visual.  

##  Regras de Negócio
- **RN01**: A consulta é sempre feita a partir de bairros pré-cadastrados no banco de dados.  
- **RN02**: O sistema ajusta a janela de atualização (TTL) conforme perfil climático detectado (baixa, média, alta ou severa probabilidade de chuva).  
- **RN03**: Se a probabilidade de chuva for maior que 80%, a interface deve apresentar cor de fundo **laranja**.  
- **RN04**: O sistema não permite entrada de texto livre para bairro, apenas seleção em lista oficial.  
- **RN05**: Em caso de falha na API externa, a aplicação deve exibir a última previsão disponível em cache.  
- **RN06**: O sistema não armazena dados pessoais de usuários.  

##  Perfis de Usuários
- **Cidadão comum**: acessa via navegador ou celular, consulta previsão rápida por bairro, precisa de resposta clara e visual.  
- **Equipe de desenvolvimento**: utiliza o sistema como objeto de estudo da cadeira N705-Proj aplic multiplataf etapa 1 do curso ADS da Unifor, implementando a aplicação, administrando e monitorando.  

##  Histórias de Usuário
- **HU01**: Como morador de Fortaleza, quero selecionar meu bairro e ver a previsão das próximas 6h, 12h e 24h, para planejar meus deslocamentos.  
- **HU02**: Como usuário, quero entender facilmente se vai chover no meu bairro através de frases simples e cores, sem precisar interpretar gráficos.  
- **HU03**: Como usuário, quero saber quando a previsão foi atualizada pela última vez, para confiar na informação apresentada.  
- **HU04**: Como usuário, quero que o sistema funcione bem no celular, para poder consultar a previsão em qualquer lugar.  
- **HU05**: Como usuário, quero que o sistema continue exibindo dados mesmo se houver falha no serviço externo, para não ficar sem informação.  
