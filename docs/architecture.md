# Arquitetura do FinFlow

## Visão Geral

- **Backend**: Rails API-only (JSON)
- **Web**: Angular SPA consumindo a API
- **Mobile**: React Native consumindo a mesma API
- Autenticação: JWT
- Temas: gerenciados no frontend (local storage + preferência do usuário)

## Temas

### Light
Cores limpas, fundo claro, texto escuro.

### Dark
Fundo escuro, contraste alto.

### Mercenary (Pago)
Inspirado em Deadpool & Wolverine:
- Vermelho vivo (#E31C25)
- Preto profundo
- Amarelo dourado (#FFD700)
- Texturas de "rasgado" / estilo comic

## Endpoints principais (planejados)

- `POST /auth/login`
- `POST /auth/register`
- `GET /transactions`
- `POST /transactions`
- `GET /categories`
- `GET /goals`
- `GET /dashboard/summary`
