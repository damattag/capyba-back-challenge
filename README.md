# capyba-back-challenge
This repository is intended for the Capyba Software challenge

## Stack for this project

1. Typescript;
2. Node.Js;
3. Express;
4. Jest;
5. Docker.

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

# ###### GENERAL SETTINGS #######
PROJECT_NAME=capyba-challenge

# ###### SERVER SETTINGS #######
SERVER_PORT=3001
NODE_ENV=development

# ###### DATABASE SETTINGS #######
DATABASE_TYPE=postgres
DATABASE_HOST=${PROJECT_NAME}-db
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=docker
DATABASE_DB=${PROJECT_NAME}
DATABASE_URL=${DATABASE_TYPE}://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_DB}

# ###### TEST DATABASE SETTINGS #######
DATABASE_TEST_TYPE=postgres
DATABASE_TEST_HOST=localhost
DATABASE_TEST_PORT=5433
DATABASE_TEST_USER=postgres
DATABASE_TEST_PASSWORD=docker
DATABASE_TEST_DB=${PROJECT_NAME}-test-db
DATABASE_TEST_URL=postgres://postgres:docker@localhost:5433/capyba-challenge-test

# ###### JWT SETTINGS #######
JWT_SECRET=secret

# ###### MAIL SETTINGS #######
EMAIL=teste.damatta@gmail.com
EMAIL_PASSWORD="bhyp tggt gkbf dpxc"


```
  
5. To run the development server, run
```bash
docker-compose up --build
```

6. To run the migrations, run the server as described and on a new terminal, run:
```bash
yarn migration
```

7. To run seed file, run the server and the migrations as described and on terminal, run:
```bash
yarn seed
```

8. Now the server should be running!
