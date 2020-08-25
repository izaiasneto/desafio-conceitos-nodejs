const express = require("express");
const cors = require("cors");
const { uuid } = require('uuidv4')

// const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
   return response.send(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs} = request.body

  const repo = { id: uuid(), title, url, techs, likes: 0}

  repositories.push(repo)

  return response.json(repo)
  
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs} = request.body;

  const repoIndex = repositories.findIndex(rep => rep.id === id)

  if( repoIndex < 0) {
    return response.status(400).json({error : 'Project not found.'})
  }

  const likes = repositories[repoIndex].likes

  const repo = {
    id,
    title,
    url,
    techs,
    likes
  }

  repositories[repoIndex] = repo;

  response.json(repo)
  
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params

  const repoIndex = repositories.findIndex(rep => rep.id === id)

  if( repoIndex < 0) {
    return response.status(400).json({error : 'Project not found.'})
  }

  repositories.splice(repoIndex, 1)

  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params

  const repoIndex = repositories.findIndex(rep => rep.id === id)

  if( repoIndex < 0) {
    return response.status(400).json({error : 'Project not found.'})
  }

  const title = repositories[repoIndex].title
  const url = repositories[repoIndex].url
  const techs = repositories[repoIndex].techs
  const likes = repositories[repoIndex].likes + 1

  const rep = {
    id,
    title,
    url,
    techs,
    likes
  }

  repositories[repoIndex] = rep;
  
  return response.json(rep)
});

module.exports = app;
