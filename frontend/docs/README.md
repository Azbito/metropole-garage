# Frontend Documentation

## 📋 Portuguese

### 🚀 Sobre o Frontend

O frontend do Metropole Garage é uma aplicação web moderna desenvolvida com React, TypeScript e Vite. A aplicação segue uma arquitetura modular e organizada.

### 📁 Estrutura do Projeto

```
frontend/
├── src/
│   │── @types/         # Tipos e interfaces globais
│   │── data/           # Dados e tipos
│   ├── components/     # Componentes reutilizáveis
│   ├── pages/         # Páginas da aplicação
│   │   └── home/      # Página inicial
│   │       ├── components/  # Componentes específicos da página
│   │       └── index.tsx  # Página principal
│   ├── hooks/         # Hooks personalizados
│   │── i18n/          # Internalicionalização
│   ├── lib/           # Bibliotecas modificadas
│   ├── interfaces/    # Interfaces e tipos
│   ├── stores/        # Gerenciamento de estado global
│   ├── services/      # Serviços e chamadas à API
│   ├── styles/        # Estilos globais
│   └── assets/        # Recursos estáticos
```

### 🛠️ Tecnologias Utilizadas

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Zustand (State Management)
- Axios
- ESLint
- Prettier
- Husky

## 📋 English

### 🚀 About the Frontend

The Metropole Garage frontend is a modern web application built with React, TypeScript, and Vite. The application follows a modular architecture.

### 📁 Project Structure

```
frontend/
├── src/
│   │── @types/         # Global types and interfaces
│   │── data/           # Data and types
│   ├── components/     # Reusable components
│   ├── pages/          # Application pages
│   │   └── home/       # Home page
│   │       ├── components/  # Page-specific components
│   │       └── index.tsx      # Main page
│   ├── hooks/          # Custom hooks
│   │── i18n/           # Internationalization
│   ├── lib/            # Modified libraries
│   ├── interfaces/     # Interfaces and types
│   ├── stores/         # Global state management
│   ├── services/       # Services and API calls
│   ├── styles/         # Global styles
│   └── assets/         # Static assets
```

### 🛠️ Technologies Used

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Zustand (State Management)
- React Router
- Axios
- ESLint
- Prettier
- Husky

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (Node.js package manager)

### Installation

1. Navigate to frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
pnpm install
```

3. Run the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

### 📝 Development

The project uses TypeScript for type safety and follows a modular component architecture. The application is built with Vite for fast development and hot module replacement.

### 🛠️ Development Tools

- ESLint for code linting
- Prettier for code formatting
- Husky for git hooks
- Vite for fast development server

### 📝 License

MIT License
