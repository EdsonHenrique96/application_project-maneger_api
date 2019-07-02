const route = require('express').Router();
const projects = require('./projectsModel');

const verifyProjectExists = (req, res, next) => {
  const { id } = req.params;
  const project = projects[id];

  if(!project) return res.json({ message: `the project with id:${id} does not exists` });
  return next();
};
  
route.get('/', (req, res) => {
  return res.json({ message: 'Sucess' });
});

route.post('/projects', (req, res) => {
  const { id, title } = req.body;

  const newProject = { id, title, tasks: [] }
  projects.push(newProject);

  return res.status(210).json(newProject);
});

route.get('/projects', (req, res) => {
  const allProject = projects;

  return res.json(allProject);
});

route.put('/projects/:id', verifyProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects[id].title = title;

  return res.status(200).json({ message: `The project title has been update` });
});

route.delete('/projects/:id', verifyProjectExists, (req, res) => {
  const { id } = req.params;

  projects.splice(id, 1);

  return res.status(200).json({ message: 'The project has been delete' });
});

route.post('/projects/:id/tasks', verifyProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects[id].tasks.push(title);

  return res.status(201).json({ message: `The task has been add on project ${id}` });
});

 module.exports = route;
