# Amigo Secreto

## Requirements

- [NodeJS](https://nodejs.org/en/download/)
- [Git](https://git-scm.com/downloads)
- [Scoop](https://scoop.sh/)
- [PlanetScale CLI](https://docs.planetscale.com/concepts/planetscale-environment-setup)

## Installation

Antes de tudo lembre-se de instalar todos os requirements

<p>Para instalar o ambiente de desenvolvimento, siga estes passos:</p>

- Clone o projeto com: `git clone ${url do projeto}`
- Instalar as dependências necessárias para a execução do projeto com: `npm install or yarn install`
- Depois de feito esses passos vamos rodar o projeto com: `npm run dev or yarn dev`
- Vamos conectar ao banco no PlanetScale, para isso basta criar um banco de dados MySQL no próprio planetScale e abrir um proxy com o seu localhost e rodar esses comandos, **faça isso para o banco principal e para o banco de testes também**: 
```shell
   # authenticate on planetscale 
   $ pscale auth login

   # create proxy to database
   $ pscale connect $database_name --port $port

```

Com o projeto rodando basta acessar seu [localhost](http://localhost:3000/).