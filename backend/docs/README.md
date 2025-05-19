# Metropole Garage API Documentation

## 📋 Português

### 🚀 Sobre a API

A API do Metropole Garage é uma API RESTful desenvolvida em Node.js com Fastify, que gerencia veículos e usuários. A API oferece funcionalidades para gerenciar carros, incluindo criação, busca e spawn de veículos.

### 📁 Estrutura do Projeto

```
backend/
├── src/
│   ├── controllers/    # Controladores da aplicação
│   ├── routes/         # Rotas da API
│   ├── services/       # Serviços de negócio
│   ├── repositories/   # Repositórios de dados
│   └── interfaces/     # Interfaces e tipos
├── prisma/             # Configuração do Prisma
└── docker-compose.yml  # Configuração do Docker
```

### 🔐 Autenticação

A API utiliza um sistema de autenticação baseado em token JWT. Alguns endpoints requerem autenticação, que é verificada através do middleware de autenticação.

### 🌐 Endpoints

#### Veículos

- `GET /cars/:owner` - Lista carros de um proprietário específico
- `GET /cars/plate/:plate` - Busca carro por placa
- `GET /cars` - Lista meus carros (requer autenticação)
- `POST /cars/spawn` - Spawn de carro (requer autenticação)
- `POST /cars` - Cria novo carro (requer autenticação)

#### Usuários

- `POST /user/auth` - Autentica o usuário
- `GET /available` - Lista carros disponíveis para o usuário (requer autenticação)

### 🛠️ Tecnologias Utilizadas

- Node.js
- Fastify
- TypeScript
- Prisma
- JWT
- Docker

## 📋 English

### 🚀 About the API

The Metropole Garage API is a RESTful API developed in Node.js with Fastify, managing vehicles and users. The API provides functionalities for managing cars, including creation, search, and spawning of vehicles.

### 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/    # Application controllers
│   ├── routes/         # API routes
│   ├── services/       # Business services
│   ├── repositories/   # Data repositories
│   └── interfaces/     # Interfaces and types
├── prisma/             # Prisma configuration
└── docker-compose.yml  # Docker configuration
```

### 🔐 Authentication

The API uses a JWT token-based authentication system. Some endpoints require authentication, which is verified through an authentication middleware.

### 🌐 Endpoints

#### Vehicles

- `GET /cars/:owner` - List cars of a specific owner
- `GET /cars/plate/:plate` - Search car by plate
- `GET /cars` - List my cars (requires authentication)
- `POST /cars/spawn` - Spawn car (requires authentication)
- `POST /cars` - Create new car (requires authentication)

#### Users

#### Usuários

- `POST /user/auth` - Authenticate user
- `GET /users/available-cars` - List available cars for user (requires authentication)

### 🛠️ Technologies Used

- Node.js
- Fastify
- TypeScript
- Prisma
- JWT
- Docker

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- pnpm (Node.js package manager)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

3. Copy the environment file:

```bash
cp .env.example .env
```

4. Configure your environment variables in the `.env` file

5. Run the application:

```bash
pnpm dev
```

### 🛠️ Development

The project uses TypeScript for type safety and Prisma as the ORM. The API follows RESTful principles and uses Fastify for high performance.

### 📝 License

MIT License
