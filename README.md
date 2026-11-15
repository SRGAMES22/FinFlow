# FinFlow 💰

**Gestão Financeira Pessoal Full Stack**  
Dashboard web poderoso + App mobile rápido com biometria e temas exclusivos.

[![GitHub](https://img.shields.io/badge/GitHub-SRGAMES22%2FFinFlow-blue?logo=github)](https://github.com/SRGAMES22/FinFlow)

---

## Stack

| Camada     | Tecnologia                          |
|------------|-------------------------------------|
| Backend    | Ruby on Rails 7.2 (API) + PostgreSQL + JWT |
| Web        | Angular 18 + Tailwind CSS           |
| Mobile     | React Native (Expo) + NativeWind    |
| Temas      | Light / Dark / **Mercenary** (pago) |

---

## Funcionalidades

- Autenticação JWT completa
- Lançamentos de receitas e despesas
- Categorias personalizadas
- Metas financeiras
- Dashboard com resumo (saldo, receitas, despesas)
- **3 Temas**:
  - Light
  - Dark
  - **Mercenary** (exclusivo do plano pago) — cores inspiradas em Deadpool & Wolverine (vermelho + dourado + textura)
- Usuário demo com plano Mercenary já incluso nos seeds

---

## Estrutura

```
FinFlow/
├── backend/          # Rails API
├── web/              # Angular Dashboard
├── mobile/           # React Native (Expo)
├── docs/
└── README.md
```

---

## Como rodar

### 1. Backend (Rails)

```bash
cd backend
bundle install
# Configure o database.yml ou use variáveis de ambiente
rails db:create db:migrate db:seed
rails s -p 3000
```

**Usuário de demonstração:**
- Email: `demo@finflow.app`
- Senha: `123456`
- Já vem com plano **Mercenary** ativado

### 2. Web (Angular)

```bash
cd web
npm install
ng serve
```

Acesse: http://localhost:4200

### 3. Mobile (React Native + Expo)

```bash
cd mobile
npm install
npx expo start
```

> **Importante:** Em device físico, troque `localhost` pelo IP da sua máquina nos arquivos de API.

---

## Temas

| Tema       | Disponibilidade          | Estilo                          |
|------------|--------------------------|---------------------------------|
| Light      | Todos                    | Limpo e profissional            |
| Dark       | Todos                    | Escuro moderno                  |
| Mercenary  | Apenas plano pago        | Vermelho Deadpool + Dourado Wolverine + textura |

---

## Status do Projeto

✅ Backend completo (Auth, Transactions, Categories, Goals, Dashboard)  
✅ Web (Angular) com Login + Dashboard + Theme Switcher  
✅ Mobile (React Native) com Login + Home + Theme System  
✅ Sistema de temas Light / Dark / Mercenary  
✅ Seeds com dados de demonstração  

🚧 Próximos incrementos possíveis:  
- Tela de criar transação no mobile  
- Gráficos no dashboard  
- Biometria real (já preparado com expo-local-authentication)  
- Notificações push  

---

Feito por **[SRGAMES22](https://github.com/SRGAMES22)**  
Projeto criado para fortalecer o portfólio no GitHub.
