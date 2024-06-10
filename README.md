# Projeto de Aprendizado

Este é um projeto de aprendizado desenvolvido com o objetivo de explorar e praticar diferentes tecnologias e conceitos no desenvolvimento de uma aplicação web. Durante o desenvolvimento deste projeto, foram explorados diversos recursos e ferramentas, além da implementação de funcionalidades essenciais para uma aplicação, como autenticação de usuários, manipulação de dados no banco de dados e criação de rotas para diferentes partes da aplicação.

## Tecnologias Utilizadas

- **Node.js**: Plataforma de desenvolvimento para construção de aplicações server-side utilizando JavaScript.
- **Express.js**: Framework web para Node.js que simplifica o processo de criação de APIs.
- **Knex.js**: Construtor de consultas SQL para Node.js, utilizado como um ORM (Object-Relational Mapping) para interagir com bancos de dados SQL de forma simplificada.
- **MongoDB**: Banco de dados NoSQL utilizado para armazenamento de dados da aplicação.
- **bcryptjs**: Biblioteca para hash de senhas em JavaScript, utilizada para criptografar senhas de usuários.
- **JWT (JSON Web Tokens)**: Padrão de token de autenticação baseado em JSON, utilizado para autenticação de usuários na API.

## Funcionalidades Implementadas

- **Autenticação de Usuários**: Utilização de JWT para autenticar usuários na API.
- **Manipulação de Dados**: Utilização de modelos e controladores para manipular dados de usuários, categorias e cursos.
- **Validação de Dados**: Implementação de funções para validar dados de entrada na API.
- **Rotas**: Criação de rotas para diferentes partes da aplicação, como usuários, categorias e cursos.

## Principais Arquivos

- **`app.js`**: Arquivo principal da aplicação, responsável por configurar o servidor Express e carregar os controladores e rotas.
- **`config/dbConnect.js`**: Configuração de conexão com o banco de dados.
- **`src/controllers/`**: Diretório contendo os controladores da aplicação, responsáveis por implementar a lógica de negócio.
- **`src/routes/`**: Diretório contendo as definições de rotas da aplicação.

## Como Executar o Projeto

1. Clone este repositório para sua máquina local.
2. Instale as dependências do projeto utilizando `npm install`.
3. Inicie o servidor local utilizando `npm start`.
4. Acesse a aplicação em `http://localhost:3000`.
