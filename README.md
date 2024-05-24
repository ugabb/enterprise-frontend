<h1 align="center" style="font-weight: bold;">Enterprises Teste Técnico Patriani</h1>

<p align="center">
 • <a href="#tech">Technologies</a> 
 • <a href="#started">Getting Started</a> 
 • <a href="https://github.com/ugabb/enterprise-api">Backend</a>  
 • <a href="#test">test</a>  
</p>

<p align="center">
    <b>Frontend para o teste técnico Patriani</b>
</p>

<h2 id="layout">🎨 Layout</h2>

<p align="center">
    <img src="/public/images/home-page.png" alt="Image Example" width="500px">
    <img src="/public/images/register.png" alt="Image Example" width="500px">
</p>

<h2 id="technologies">💻 Technologies</h2>

- Next.js
- React Query
- Typescript
- React
- Styled components
- Zod
- React hook form
- Playwright(testes e2e)

<h2 id="started">🚀 Getting started</h2>

<h3>Cloning</h3>

Como clonar

```bash
git clone https://github.com/ugabb/challenge-2024
```

<h3>Configurando variaveis de ambiente .env </h2>

Use o `.env.local.example` como referência para criar o seu `.env.local`


```yaml
NEXT_PUBLIC_API_URL="http://localhost:3333" não esquecer de usar a mesma porta do backend
```

<h3>Starting</h3>

Como rodar o projeto

```bash
cd enterprise-frontend
yarn install
yarn dev
```

<h3 id="test">Testes End to End (E2E)</h3>

Foram Criados os seguintes teste:
- Criar Empreendimento
- Editar Empreendimento
- Excluir Empreendimento

obs: teste foram configurados para rodar em sequência, ou seja, um esperando pelo outro. Sendo assim, completando todo o fluxo de ações possíveis do usuário.

```bash
yarn dev:test
```
