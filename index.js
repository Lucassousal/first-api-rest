import express, { request } from "express";
import { StatusCodes } from "http-status-codes";

const app = express(); //iniciando express
const PORT = process.env.PORT || 4000; //porta para a API escutar as requisições

//variável simulando o BD
let users = [
  { id: 1, name: "Lucas", age: 30 },
  { id: 2, name: "Cássia", age: 27 },
];

//iniciando um nitch para que as requisções sejam em json
app.use(express.json());

// iniciando o servidor na porta
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// inciando a raiz do servidor
app.get("/", (request, response) => {
  return response.send("<h1>Trabalhando com servidor express</h1>");
});

//iniciando o /users
app.get("/users", (request, response) => {
  return response.send(users);
});

//iniciando o /users/id
app.get("/users/:userId", (request, response) => {
  const userId = request.params.userId;
  const user = users.find((user) => {
    return user.id === Number(userId);
  });
  return response.send(user);
});

//iniciando o post
app.post("/users", (request, response) => {
  const newUser = request.body;

  users.push(newUser);

  return response.status(StatusCodes.CREATED).send(newUser);
});

//iniciando o put
app.put("/users/:userId", (request, response) => {
  const userId = request.params.userId;
  const updateUser = request.body;

  users = users.map((user) => {
    if (Number(userId) === user.id) {
      return updateUser;
    }

    return user;
  });

  return response.send(updateUser);
});

//iniciando o delete
app.delete("/users/:userId", (request, response) => {
  const userId = request.params.userId;

  users = users.filter((user) => user.id !== Number(userId));

  return response.status(StatusCodes.NO_CONTENT).send();
});
