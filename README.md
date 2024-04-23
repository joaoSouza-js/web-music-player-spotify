# web  music player 

Um  "clone" da interface e principais funcionalidades do  spotify

![image](https://github.com/joaoSouza-js/web-music-player-spotify/assets/84108989/460b4b0e-3e20-46e4-9b25-3c7cc86ae732)

## requesitos
### requesitos funcionais
- [x] deve ser possível  reproduzir um audio 

### requesitos não funcionais

- [x] utilizar  o supabase  para   salvar audios
- [x] utilizar o supabase para  banco de dados
- [x] utilizar web worker para streaming de dados

## front-end

![image](https://github.com/joaoSouza-js/web-music-player-spotify/assets/84108989/460b4b0e-3e20-46e4-9b25-3c7cc86ae732)

*pricipais tecnologias*

- next js (13)
- tailwindcss
- axios
- web webworkers

* Á fazeres
  - [x] funções básicas de um player
    - [x]   parar a reprodução 
    - [x]   inicar a repdrodução
    - [x]   avançar para  á  próxíma faixa
    - [x]   retroceder para um faixa anterior
    - [x]   aumentar o volume
    - [x]   diminuir o volume 
    - [x]   mutar o volume

  - [x] conectar com  á api  para receber os dados
  - [x] funções avançadas
    - [x] receber  pedações de um audio (chunk)   com a propóxito  ede reproduzir um audio  com mais efficiencia
    - [ ] refator o código

## Iniciando


## Pré-requisitos

- Node.js (recomendada a versão 18 ou superior)
## Instalação

1. **Clonar ou Baixar o Projeto:**
   ```bash
   git clone https://github.com/joaoSouza-js/web-music-player-spotify
    ```
  

2. **Navegar para o Diretório do Projeto:**
   Use o terminal para navegar até o diretório raiz do projeto.
      ```bash
     cd web-music-player-spotify
    ```

4. **Instalar Dependências:**
 
 - com  o npm  
   ```bash
   npm i 
   ```

 - com  o yarn 
   ```bash
   yarn 
   ```

- com  o pnpm   
   ```bash
   pnpm install  
   ```


## Scripts Disponíveis

O arquivo `package.json` geralmente inclui scripts para tarefas de desenvolvimento e produção. O Next.js fornece alguns scripts comuns, que você pode personalizar ou 

## Explicação dos Scripts 

- **Servidor de Desenvolvimento (hot reloading):**
    Descrição: Inicia um servidor em mode desenvolvimento
-  com  o npm 
     ```bash
     npm run dev
     ```
   -  com  o yarn 
     ```bash
     yarn  dev
     ```

  -  com  o pnpm 
     ```bash
     pnpm run dev  
     ```

- **Compilação para Produção:**

  Descrição: Cria uma compilação otimizada para produção do seu aplicativo Next.js. Esse processo de compilação
     
-  com  o npm 

  ```bash
   npm run build
   ```

- com o yarn
  
   ```bash
   yarn  build
   ```

- com o pnpm   
   ```bash
   pnpm run build  
   ```

   
- **Servidor de Produção:**
  Descrição: Inicia o servidor de produção para servir os arquivos de compilação otimizados gerados pelo script `build`. Este servidor é usado para implantar seu a

- com o pnpm   
  ```bash
   npm run start
   ```

- com o yarn
   ```bash
   yarn  start
   ```

-  com o pnpm   
   ```bash
   pnpm run start  
   ```
- **Linting de Código (Opcional):**



## back-end

![image](https://github.com/joaoSouza-js/web-music-player-spotify/assets/84108989/d5059087-c97b-488d-8484-2f9b7c498a43)

*pricipais tecnologias*

- fastify
- prisma
- swagger

  Á fazeres
    - [x] utilizar um orm (prisma)
    - [x] conectar com  um banco de dados externo (postgresql) 
    - [x] cria rotas para o 
      - [x] envio de informações sobre um único album
      - [x] envio informações sobre  muitos albums
      - [x] envio informaçõs sobre um  único artistas
      - [x] envio informações sobre muitos artistas
      - [x] envio informações sobre uma uníca múcica
      - [x] envio informações sobre uma  muitas música
  - [x] adicinar filtragem em rotas que precisam

    ## Iniciando


## Pré-requisitos

- Node.js (recomendada a versão 18 ou superior)
## Instalação

1. **Clonar ou Baixar o Projeto:**
   ```bash
   git clone https://github.com/joaoSouza-js/web-music-player-spotify
    ```
  

2. **Navegar para o Diretório do Projeto:**
   Use o terminal para navegar até o diretório raiz do projeto.
      ```bash
     cd web-music-player-spotify
    ```

4. **Instalar Dependências:**
 
 - com  o npm  
   ```bash
   npm i 
   ```

 - com  o yarn 
   ```bash
   yarn 
   ```

- com  o pnpm   
   ```bash
   pnpm install  
   ```

## Explicação dos Scripts 

- **Servidor de Desenvolvimento (hot reloading):**
    Descrição: Inicia um servidor em mode desenvolvimento
-  com  o npm 
     ```bash
     npm run dev
     ```
   -  com  o yarn 
     ```bash
     yarn  dev
     ```

  -  com  o pnpm 
     ```bash
     pnpm run dev  
     ```

