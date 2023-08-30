This is template to initialize backend projects
NodeJS + Express + Typescript

Follow this step
--Install typescript
yarn add express ts-node tsconfig-paths
yarn add --dev typescript ts-node-dev @types/node @types/express
npx tsc --init
yarn add cors
yarn add --dev @types/cors

--create .gitignore + add 
node_modules
.env
yarn-error.log

--add in package.json
{
  "name": "workshop-backend",
  "version": "1.0.0",
  ...
}

--add script in package.json

{
  ...
  "scripts": {
    "dev": "ts-node-dev -r tsconfig-paths/register src/main.ts",
    "start": "ts-node -r tsconfig-paths/register src/main"
  },
  ...
}

--create src/main.ts

--start project by yarn dev / yarn start

------------------------------------------------------------------------

--install validate library
yarn add io-ts io-ts-extra fp-ts


--install lib to connect to PostgresSQL
yarn add pg
yarn add --dev @types/pg

--install Prisma ORM
yarn add --dev prisma
yarn add @yarnpkg/pnpify
npx prisma init --datasource-provider postgresql

--create .env and add environment variables
DATABASE_URL="postgresql://postgres:password@localhost:5432/postgres?schema=xxxxxxx"
(This may be any link up to database that we use)

--create prisma/schema index.prisma test.prisma(this name up to project)

--add script to package.json
"scripts": {
    ...
    "prisma:merge": "cat prisma/schema/**.prisma > prisma/schema.prisma",
    "prisma:format": "npx prisma format",
    "prisma:migrate": "yarn pnpify migrate dev --name init --schema prisma/schema.prisma",
    "prisma:generate": "yarn pnpify prisma generate --schema=prisma/schema.prisma"
  }

Explain 
prisma:merge => Combine code from index.prisma and test1.prisma together and add to schema.prisma
prisma:format => Format and check code
prisma:migrate => Migrate new schema to database 
prisma:generate => Generate all connection that build with prisma such as create connect etc.

This flow should run in this order every time that we change schema

--install jest for unit testing
yarn add --dev jest ts-jest @types/jest

--add file jest.config.ts

--add script to package.json
  "scripts": {
    ...
    "test": "jest --verbose",
    "test:xxxx": "jest -- src/xxxx"
  }

  the name is up to project

  ------------------------------------------------------------------------

--add 
routes.ts => this will be collection path of all API
folder test1API
-resolver.ts => start with this, this file will be the one to connect to database via prisma
-handler.ts => this will check codec of input and mange response with/without error
-interface.ts => declare type
-spec.ts => test each API response


If clone this project to use pls change these things
1.Schema at test.prisma => change file name and add schema detail inside
2.in .env => change DATABASE_URL to your URL
3.Package.json => change "test:xxxxx": "jest -- src/xxxxx" to your project name this will ticker wile .spec.ts in src folder
4.Start with resolver file write code to connect db then interface to mange input then handler then route.ts and lastly spec.ts to test