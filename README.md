# API Serverless para Gerenciamento de Usuários

Este projeto consiste em uma API RESTful **serverless** para realizar operações de CRUD (Criar, Ler, Atualizar e Deletar) em uma tabela de usuários. A aplicação é construída com o **Serverless Framework** e implantada na **AWS**. Ela utiliza o **API Gateway** para rotear as requisições HTTP para uma função **AWS Lambda**, que interage com o **DynamoDB** para persistência dos dados. O projeto também está configurado com o **Datadog** para monitoramento e observabilidade.

---

## 🛠 Arquitetura e Tecnologias

O projeto utiliza os seguintes serviços e tecnologias:

- **Serverless Framework**: Facilita a implantação e o gerenciamento da aplicação na nuvem.
- **Node.js (nodejs18.x)**: Ambiente de execução da função Lambda.
- **Express.js**: Utilizado dentro da função Lambda para definir as rotas da API.
- **AWS Lambda**: Executa o código da API.
- **Amazon API Gateway (HTTP API)**: Roteia as requisições para a função Lambda.
- **Amazon DynamoDB**: Banco de dados NoSQL, operando em modo `PAY_PER_REQUEST`.
- **Datadog**: Monitoramento com logs e tracing integrados via `serverless-plugin-datadog`.

---

## 🔗 Endpoints da API

| Método | Endpoint           | Descrição                                                                 |
|--------|--------------------|---------------------------------------------------------------------------|
| POST   | `/users`           | Cria um novo usuário. Corpo da requisição deve conter `userId`, `name` e `email`. |
| GET    | `/users`           | Retorna todos os usuários cadastrados.                                    |
| GET    | `/users/{userId}`  | Retorna os dados de um usuário específico.                                |
| PUT    | `/users/{userId}`  | Atualiza `name` e/ou `email` de um usuário existente.                     |
| DELETE | `/users/{userId}`  | Deleta um usuário com base no `userId`.                                   |

---

## 📁 Estrutura do Projeto

- **`serverless.yml`**: Define a infraestrutura da aplicação na AWS (serviço, funções, permissões, tabela do DynamoDB, etc.).
- **`handler.js`**: Contém o código da função Lambda, usando Express para as rotas e AWS SDK para o DynamoDB.
- **`package.json`**: Lista as dependências (como `express`, `aws-sdk`, `serverless-http`, etc.) e scripts do projeto.
- **`.gitignore`**: Ignora arquivos como `node_modules`, `.env`, `.serverless`, entre outros.

---

## 🚀 Configuração e Implantação

### ✅ Pré-requisitos

- Node.js e npm instalados.
- Serverless Framework instalado globalmente:
  ```bash
  npm install -g serverless
