# capyba-back-challenge
This repository is intended for the Capyba Software challenge

# TASKS

## 1. Login e cadastro
[x] Cadastro de usuário;
[x] Termos de uso;
[x] Login;
[x] Logout;

## 2. Área para pessoas logadas
[x] Lista paginada de itens públicos;
[x] Lista deve retornar os objetos da pagina e o total de objetos;
[x] Busca por texto;
[x] Filtragem por um campo do model;

## 3. Meu perfil
[x] editar usuário;

## 4. Confirmação de email
[x] envio do token via email;
[x] validação do token;

## 5. Área restrita
[x] lista paginada de itens privados;
[x] Lista deve retornar os objetos da pagina e o total de objetos;
[x] Busca por texto;
[x] Filtragem por um campo do model;

## Observações
[] testes unitários;
[] documentação seguindo OpenAI;
[x] readme de como rodar o projeto;

## Bônus
[] deploy;
[] admin;
[] confirmação de senha para alterar a senha;
[] cadastro via api do google;
[] seed;

## Running the project

1. Be sure you have **docker/docker-compose** and **yarn** (or **npm**, if you use it) installed.
2. Clone the repository by running 
```bash 
git clone https://github.com/damattag/capyba-back-challenge.git
```
3. Install all the dependencies by running
```bash 
yarn install
# or
npm install
```
4. Create a **.env** file and copy the following content to it:
```dotenv

🚀 in construction... 🛸

```
  
5. To run the development server, run
```bash
docker-compose up --build
```

6. To run the migrations, run the server as described and on a new terminal, run:
```bash
yarn migration
```

7. Now the server should be running!