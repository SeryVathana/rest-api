import express from 'express';
import { createProject, deleteProject, getProject, getProjects, updateProject } from '../controllers/project.controller';

const route = express.Router();

//Get All Projects
route.get('/', getProjects);

//Get Specific Project
route.get('/:id', getProject);

route.post('/', createProject);

route.patch('/:id', updateProject);

route.delete('/:id', deleteProject);

export default route;
