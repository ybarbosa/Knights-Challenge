# Knights Challenge

## 📌 Overview
**Knights Challenge** é um sistema para gerenciar cavaleiros, permitindo cadastro, edição, visualização e exclusão de registros. Além disso, há uma listagem dos cavaleiros falecidos.

## 🚀 Stack Tecnológica
Este projeto utiliza as seguintes tecnologias:

- [Node.js](https://nodejs.org/en) - Backend
- [Prisma ORM](https://www.prisma.io/) - ORM para banco de dados
- [MongoDB](https://www.mongodb.com/) - Banco de dados NoSQL
- [Docker](https://www.docker.com/) - Gerenciamento de containers
- [Vue.js](https://vuejs.org/) - Frontend
- [Vuex](https://vuex.vuejs.org/) - Gerenciamento de estado do Vue.js

## 🔥 Funcionalidades
- ✅ Cadastro de Cavaleiros
- ✅ Exclusão de Cavaleiros
- ✅ Visualização de Detalhes dos Cavaleiros
- ✅ Listagem de Cavaleiros Falecidos
- ✅ Edição de Informações dos Cavaleiros

## 🔧 Requisitos
Antes de iniciar, certifique-se de ter as seguintes ferramentas instaladas:

- [Docker](https://www.docker.com/)
- [Node.js v22](https://nodejs.org/en)
- [Yarn](https://yarnpkg.com/)

## ⚙️ Configuração
1. Clone o repositório:
   ```bash
   git clone https://github.com/ybarbosa/Knights-Challenge.git
   cd Knights-Challenge
   ```
2. Copie o arquivo de variáveis de ambiente:
   ```bash
   cp .env.example .env
   ```
3. Instale as dependências do projeto:
   ```bash
   yarn install
   ```

## ▶️ Executando o Projeto
No diretório raiz do projeto, execute os seguintes comandos:

### 1️⃣ Iniciar o Banco de Dados
```bash
docker compose up db -d
```

### 2️⃣ Criar Estrutura no Banco e Popular com Dados Iniciais
```bash
yarn prisma:push && yarn prisma:seed
```

### 3️⃣ Iniciar o Backend
```bash
yarn start:backend
```

### 4️⃣ Iniciar o Frontend
```bash
yarn start:frontend
```

## 🧪 Testes
Para rodar os testes do backend, execute:
```bash
yarn test:backend
```

## ⚠️ Observações
Por padrão, as portas utilizadas são:

- **Backend:** `3000` (variáveis `API_PORT` e `VUE_APP_API_PORT`)
- **Frontend:** `3001` (variável `VUE_APP_APP_PORT`)

Caso necessário, você pode alterá-las no arquivo `.env`.

## 📖 Documentação e Acesso
- **API Docs:** [http://localhost:3000/api](http://localhost:3000/api)
- **Frontend:** [http://localhost:3001](http://localhost:3001)

## 📬 Contato
- [LinkedIn](https://www.linkedin.com/in/ybarbosa/)