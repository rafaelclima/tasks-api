## Sobre este Projeto
Este é um projeto de API simples que manipula tarefas em um banco de dados JSON local. A aplicação possui funções para realizar operações CRUD (Criar, Ler, Atualizar e Deletar) em uma tabela chamada `tasks`.

### Configuração do Banco de Dados
O arquivo `database.js` é responsável por carregar ou criar o banco de dados (`db.json`). Ele lê os dados do JSON, faz a consulta de tarefas, e permite operações CRUD sobre esses registros.

### Rotas da API
A pasta `routes.js` define as rotas permitidas pela API. A API suporta métodos HTTP como GET (para listar todas as tarefas), POST (para criar uma nova tarefa), PUT/PUT /:id para atualizar a descrição e título de uma tarefa específica, PATCH /:id/complete para marcar uma tarefa como concluída, e DELETE /:id para deletar uma tarefa.

### Servidor
O arquivo `server.js` configura o servidor HTTP que escuta na porta 3100. Ele usa a biblioteca Node.js `http` para criar um servidor HTTP e usar as rotas definidas em `routes.js`.

## Instalação
Para executar este projeto, você precisa ter instaladas as seguintes dependências:
- [Node.js](https://nodejs.org/)
- Um editor de texto (como VSCode) para escrever no código do projeto

### Passo a passo para iniciar o servidor
1. Clone ou faça download do repositório.
2. Abra uma instância do terminal em uma pasta local onde deseja baixar os arquivos do projeto.
3. Acesse o diretório contendo os arquivos `database.js`, `routes.js` e `server.js`.
4. Execute `npm install` para instalar as dependências necessárias (caso não estejam presentes).
5. Execute o comando `node server.js` para iniciar o servidor.
6. O servidor começará a escutar em `http://localhost:3100`. Você pode testar a API com ferramentas de teste HTTP ou cliente JavaScript.
