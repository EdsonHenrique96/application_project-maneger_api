const routes = require("express").Router();
const projects = require("./model/projects");

const verifyProjectExists = (req, res, next) => {
  const { id } = req.params;
  const project = projects.find(element => element.id === id);

  if (!project)
    return res.json({ message: `the project with id:${id} does not exists` });
  return next();
};

routes.post("/projects", (req, res) => {
  const { id, title } = req.body;

  const newProject = { id, title, tasks: [] };
  projects.push(newProject);

  return res.status(210).json(newProject);
});

routes.get("/projects", (req, res) => {
  const allProject = projects;

  return res.status(200).json(allProject);
});

routes.put("/projects/:id", verifyProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(element => element.id === id);
  project.title = title;

  return res.status(200).json({ message: `The project title has been update` });
});

routes.delete("/projects/:id", verifyProjectExists, (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(element => element.id === id);
  project.splice(projectIndex, 1);

  return res.status(200).json({ message: "The project has been delete" });
});

routes.post("/projects/:id/tasks", verifyProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(element => element.id === id);
  project.tasks.push(title);

  return res
    .status(201)
    .json({ message: `The task has been add on project ${id}` });
});

module.exports = routes;
