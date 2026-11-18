# OnTime — Instruções para agentes de programação

## 1. Contexto do projeto

O OnTime é uma plataforma de transportes públicos que pretende disponibilizar informação sobre paragens, percursos e transportes, permitindo aos utilizadores consultar informação e acompanhar os seus trajetos.

O projeto está organizado como um monorepo, permitindo partilhar código entre diferentes aplicações e preparar a expansão futura para outras plataformas.

### Objetivos principais

- Desenvolver uma Progressive Web App (PWA).
- Disponibilizar uma API própria para gerir e fornecer os dados da aplicação.
- Utilizar dados geográficos para representar paragens e percursos.
- Preparar a arquitetura para permitir uma futura aplicação Android nativa.
- Manter o código modular, reutilizável e fácil de manter.

## 2. Stack tecnológica

Não substituir tecnologias ou alterar decisões arquiteturais sem autorização explícita.

| Área | Tecnologia |
|---|---|
| Monorepo | pnpm Workspaces |
| Gestão de tarefas | Turborepo |
| Frontend | Next.js |
| Linguagem frontend | TypeScript |
| Backend | NestJS |
| Linguagem backend | TypeScript |
| Base de dados | PostgreSQL |
| Extensão geográfica | PostGIS |
| ORM / acesso à BD | Prisma 8 |
| Ambiente da BD | Docker |
| Aplicação web | PWA |

### Decisões importantes

- O backend deve continuar a utilizar NestJS. Não substituir por ASP.NET ou outra framework.
- O frontend deve continuar a utilizar Next.js.
- A primeira plataforma a desenvolver é a PWA.
- A arquitetura deve permitir a criação posterior de uma aplicação Android nativa, sem obrigar a reconstruir o backend.
- O PostgreSQL deve continuar a utilizar PostGIS para funcionalidades geográficas.
- Utilizar TypeScript nos projetos de programação.
- Utilizar Prisma Schema Language (`.prisma`) para definir os modelos da base de dados.

## 3. Estrutura do monorepo

A organização geral do projeto deve seguir esta estrutura:

```text
OnTime/
│
├── apps/
│   ├── web/
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── map/
│   │   │   │   ├── stops/
│   │   │   │   ├── routes/
│   │   │   │   └── favorites/
│   │   │   ├── components/
│   │   │   │   ├── layout/
│   │   │   │   ├── map/
│   │   │   │   ├── stops/
│   │   │   │   ├── common/
│   │   │   │   └── pwa/
│   │   │   ├── features/
│   │   │   │   ├── tracking/
│   │   │   │   ├── favorites/
│   │   │   │   ├── notifications/
│   │   │   │   └── search/
│   │   │   ├── services/
│   │   │   │   ├── api/
│   │   │   │   ├── location/
│   │   │   │   └── speech/
│   │   │   ├── hooks/
│   │   │   ├── stores/
│   │   │   └── types/
│   │   ├── package.json
│   │   └── next.config.ts
│   │
│   └── api/
│       ├── src/
│       │   ├── prisma/
│       │   ├── app.controller.ts
│       │   ├── app.module.ts
│       │   ├── app.service.ts
│       │   └── main.ts
│       ├── prisma.config.ts
│       ├── package.json
│       └── tsconfig.json
│
├── packages/
│   ├── shared-types/
│   ├── validation/
│   ├── api-client/
│   └── shared-logic/
│
├── data/
│   └── gtfs/
│
├── docs/
│   ├── architecture/
│   ├── api/
│   └── guides/
│
├── infrastructure/
│   └── docker/
│
├── AGENTS.md
├── package.json
├── pnpm-workspace.yaml
├── pnpm-lock.yaml
└── turbo.json
```

Esta estrutura representa a organização pretendida. Não criar ficheiros ou pastas vazias apenas para reproduzir a árvore. Implementar cada módulo quando existir necessidade real.

### Responsabilidades das pastas

**apps/web**

Contém toda a aplicação frontend Next.js.

- `app/`: páginas e rotas da aplicação.
- `components/`: componentes visuais reutilizáveis.
- `features/`: funcionalidades organizadas por domínio.
- `services/`: comunicação com APIs e serviços externos.
- `hooks/`: hooks React reutilizáveis.
- `stores/`: gestão de estado.
- `types/`: tipos específicos do frontend.
- `public/`: imagens, ícones e outros recursos estáticos.

**apps/api**

Contém o backend NestJS.

- Controllers: recebem pedidos HTTP.
- Services: implementam a lógica de negócio.
- Modules: organizam funcionalidades.
- Prisma: acesso e comunicação com a base de dados.

**packages**

Contém código partilhado entre aplicações.

- `shared-types/`: interfaces e tipos comuns.
- `validation/`: esquemas e validações partilhadas.
- `api-client/`: cliente para comunicar com a API.
- `shared-logic/`: lógica independente da plataforma.

Não duplicar código entre frontend e backend quando este puder ser partilhado de forma adequada.

**data/gtfs**

Contém dados e ficheiros relacionados com GTFS (General Transit Feed Specification).

**docs**

Contém documentação técnica, arquitetura, API e guias de desenvolvimento.

**infrastructure/docker**

Contém configurações e ficheiros relacionados com infraestrutura Docker.

## 4. Regras do monorepo

O projeto utiliza pnpm Workspaces e Turborepo.

### Regras obrigatórias

- Existe apenas um `pnpm-workspace.yaml` principal, na raiz do monorepo.
- Existe apenas um `pnpm-lock.yaml` principal, na raiz do monorepo.
- Não criar workspaces independentes dentro de `apps/web` ou `apps/api`.
- Cada aplicação ou pacote deve ter o seu próprio `package.json`.
- As dependências devem ser instaladas no projeto a que pertencem.
- Não instalar dependências globalmente sem necessidade.
- Não duplicar dependências entre projetos sem justificação.

### Instalação de dependências

Na raiz:

```bash
pnpm install
```

Para adicionar uma dependência ao frontend:

```bash
pnpm --filter <nome-do-pacote-web> add <dependencia>
```

Para adicionar uma dependência ao backend:

```bash
pnpm --filter @OnTime/api add <dependencia>
```

Para adicionar uma dependência de desenvolvimento:

```bash
pnpm --filter @OnTime/api add -D <dependencia>
```

Para adicionar uma dependência partilhada à raiz:

```bash
pnpm add -Dw <dependencia>
```

Não assumir que o nome de uma pasta corresponde ao nome do pacote. Consultar sempre o respetivo `package.json`.

## 5. Frontend — Next.js e PWA

A aplicação web utiliza Next.js com App Router e TypeScript.

### Regras de desenvolvimento

- Utilizar componentes React funcionais.
- Preferir Server Components quando não for necessária interatividade no cliente.
- Utilizar Client Components apenas quando necessário.
- Separar componentes visuais da lógica de negócio.
- Evitar componentes excessivamente grandes.
- Reutilizar componentes e hooks quando apropriado.
- Manter as funcionalidades organizadas por domínio.

### PWA

A aplicação deve ser progressivamente preparada para funcionar como PWA.

Ter em consideração:

- Web App Manifest.
- Service Worker.
- Instalação no dispositivo.
- Ícones e identidade visual.
- Estratégias de cache.
- Funcionamento offline quando possível.
- Gestão de atualizações da aplicação.

A configuração do manifest deve permanecer integrada com o sistema de App Router do Next.js.

A PWA deve utilizar APIs web e funcionalidades compatíveis com navegadores modernos.

Não introduzir dependências específicas de Android na aplicação web sem necessidade.

## 6. Backend — NestJS

O backend utiliza NestJS com TypeScript.

### Organização

Organizar as funcionalidades em módulos independentes.

Sempre que uma funcionalidade crescer, criar uma estrutura semelhante a:

```text
src/
├── modules/
│   └── stops/
│       ├── stops.module.ts
│       ├── stops.controller.ts
│       ├── stops.service.ts
│       └── dto/
├── prisma/
├── app.module.ts
└── main.ts
```

### Regras

- Os controllers devem tratar os pedidos HTTP.
- Os services devem conter a lógica de negócio.
- Utilizar DTOs para estruturar os dados recebidos.
- Validar os dados de entrada.
- Utilizar códigos HTTP adequados.
- Evitar colocar lógica de negócio diretamente nos controllers.
- Manter os módulos independentes sempre que possível.

### Configuração atual

O backend utiliza o prefixo global:

```text
/api/v1
```

A API deve estar disponível na porta `3001` durante o desenvolvimento, salvo configuração diferente através de variáveis de ambiente.

O CORS deve permitir a origem configurada em `WEB_ORIGIN`, utilizando `http://localhost:3000` como valor de desenvolvimento predefinido.

### Swagger

A documentação OpenAPI é disponibilizada através do NestJS Swagger.

URL de desenvolvimento:

```text
http://localhost:3001/api/docs
```

Ao criar novos endpoints, adicionar documentação através dos decorators apropriados, como:

- `@ApiTags()`
- `@ApiOperation()`
- `@ApiResponse()`
- `@ApiParam()`
- `@ApiQuery()`

Documentar os DTOs e os respetivos campos.

## 7. Base de dados — PostgreSQL, PostGIS e Prisma

A base de dados utiliza PostgreSQL com a extensão PostGIS.

### Docker

A base de dados é executada num container Docker.

Configuração atual conhecida:

- Container: `OnTime-database`
- Imagem: `postgis/postgis:17-3.5`
- Base de dados: `OnTime`
- Volume persistente: `docker_OnTime_data`

Não substituir a base de dados Docker por uma instalação PostgreSQL local sem autorização.

Não remover volumes nem executar comandos que possam apagar os dados persistidos sem autorização explícita.

### PostGIS

A extensão PostGIS é necessária para operações geográficas.

A sua ativação deve ser feita na base de dados:

```sql
CREATE EXTENSION IF NOT EXISTS postgis;
```

Para verificar:

```sql
SELECT PostGIS_Version();
```

Utilizar PostGIS quando forem necessárias operações espaciais, como distâncias, coordenadas, proximidade de paragens e consultas geográficas.

### Prisma 8

O projeto utiliza Prisma 8 Release Candidate.

Ter especial atenção às diferenças entre Prisma 7 e Prisma 8.

- Não assumir que comandos ou configurações de versões anteriores continuam válidos.
- Consultar a documentação correspondente à versão instalada.
- Preservar a configuração gerada pelo Prisma.
- Não substituir automaticamente a arquitetura de acesso à base de dados por exemplos antigos.
- Não alterar versões dos pacotes Prisma sem verificar a compatibilidade.

O backend utiliza ficheiros relacionados com o contrato Prisma, incluindo:

```text
src/prisma/
├── contract.prisma
├── contract.d.ts
├── contract.json
└── db.ts
```

Estes ficheiros fazem parte da configuração atual. Não eliminar nem modificar ficheiros gerados sem compreender o processo de geração.

O comando definido para gerar o contrato é:

```bash
pnpm contract:emit
```

### TypeScript e declarações

O projeto apresentou erros `TS2883` relacionados com a geração de declarações e tipos internos do Prisma.

A configuração do backend deve evitar gerar declarações `.d.ts` desnecessárias.

Não alterar `declaration` para `true` sem verificar previamente se os tipos exportados conseguem ser representados corretamente.

Manter a verificação de tipos, incluindo:

```json
"strict": true
```

Não resolver erros de tipos através da desativação indiscriminada de verificações do TypeScript.

## 8. Variáveis de ambiente e segurança

- Utilizar ficheiros `.env` para configurações locais.
- Nunca colocar passwords, tokens ou credenciais diretamente no código.
- Nunca adicionar ficheiros `.env` ao Git.
- Disponibilizar um `.env.example` com nomes das variáveis e valores ilustrativos, sem credenciais reais.
- Validar as variáveis de ambiente necessárias ao iniciar a aplicação.
- Não expor credenciais da base de dados ao frontend.
- O frontend deve comunicar com o backend através de endpoints HTTP.

As credenciais de desenvolvimento não devem ser reutilizadas em produção.

## 9. Convenções de código

### TypeScript

- Utilizar TypeScript em vez de JavaScript para novo código.
- Definir tipos explícitos quando isso melhorar a clareza.
- Evitar `any`.
- Preferir interfaces ou tipos reutilizáveis.
- Não duplicar definições de tipos partilhados.

### Nomenclatura

- Classes e componentes React: `PascalCase`.
- Variáveis e funções: `camelCase`.
- Constantes: `UPPER_SNAKE_CASE` quando forem constantes globais.
- Ficheiros de componentes: seguir a convenção existente no projeto.
- Nomes de módulos e funcionalidades: claros e relacionados com o domínio.

### Qualidade

- Escrever código simples e legível.
- Evitar abstrações desnecessárias.
- Não adicionar dependências sem justificação.
- Não duplicar lógica.
- Tratar erros de forma explícita.
- Manter a consistência com os padrões existentes.

## 10. Git e alterações ao projeto

Antes de modificar ficheiros de configuração:

1. Analisar a configuração atual.
2. Identificar as dependências afetadas.
3. Explicar alterações arquiteturais relevantes.
4. Preservar configurações que já funcionam.

Não fazer automaticamente:

- Alterações de framework.
- Atualizações de versões principais.
- Remoção de ficheiros de configuração.
- Remoção de dependências.
- Eliminação de volumes Docker.
- Recriação da base de dados.
- Alterações à estrutura geral do monorepo.

Após alterações relevantes, verificar:

- Compilação do projeto.
- Erros de TypeScript.
- Testes existentes.
- Funcionamento dos endpoints afetados.

## 11. Princípios de desenvolvimento

Ao trabalhar no OnTime:

1. Priorizar uma arquitetura simples, modular e escalável.
2. Não antecipar funcionalidades que ainda não são necessárias.
3. Evitar complexidade desnecessária.
4. Reutilizar código através dos packages partilhados quando fizer sentido.
5. Manter frontend e backend independentes, comunicando através da API.
6. Preservar a possibilidade de desenvolver aplicações nativas no futuro.
7. Explicar alterações importantes antes de modificar decisões arquiteturais.
8. Dar preferência a soluções compatíveis com as versões efetivamente instaladas.

**Regra fundamental:** qualquer alteração deve respeitar a arquitetura e as decisões tecnológicas existentes no OnTime. Não substituir tecnologias, reorganizar o monorepo ou remover configurações sem autorização explícita.

<!-- BEGIN:nextjs-agent-rules -->

**## This is NOT the Next.js you know**

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
