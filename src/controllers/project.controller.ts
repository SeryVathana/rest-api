import { RequestHandler } from 'express';
import ProjectModel from '../models/projects.model';

type projectReqParams = {
  id: string;
};

type LinksObject = {
  github: string;
  live: string;
};

type newProjectBody = {
  title: string;
  description: string;
  displayImg: string;
  tech: string[];
  order: number;
  links: LinksObject;
};

type updateProjectBody = {
  title?: string;
  description?: string;
  displayImg?: string;
  tech?: string[];
  order?: number;
  links?: LinksObject;
};

const getProjects: RequestHandler = async (req, res) => {
  const projects = await ProjectModel.find();
  res.json(projects);
};

const getProject: RequestHandler<projectReqParams, unknown, unknown, unknown> = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ error: 'Bad Request' });
    }

    const project = await ProjectModel.findById(id);

    if (!project) {
      return res.status(404).send({ status: 404, message: 'Project not found' });
    }

    res.status(200).json(project);
  } catch (err) {
    console.error(err);
    res.status(400).send({ status: 400, message: err });
  }
};

const createProject: RequestHandler<unknown, unknown, newProjectBody, unknown> = async (req, res) => {
  const data = req.body;
  try {
    const newProject = await ProjectModel.create(data);
    res.status(200).json(newProject);
  } catch (err) {
    console.error(err);
    res.status(400).send({ status: 400, message: err });
  }
};

const updateProject: RequestHandler<projectReqParams, unknown, updateProjectBody, unknown> = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    if (!id) {
      return res.status(400).json({ error: 'Bad Request' });
    }

    await ProjectModel.findOneAndUpdate({ _id: id }, { $set: updates }).exec();

    res.status(200).json({ message: `id: ${id} updated successfully` });
  } catch (err) {
    console.error(err);
    res.status(400).send({ status: 400, message: err });
  }
};

const deleteProject: RequestHandler<projectReqParams, unknown, unknown, unknown> = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ error: 'Bad Request' });
    }

    const project = await ProjectModel.findById(id);

    if (!project) {
      return res.status(404).send({ message: 'project not found' });
    }

    await ProjectModel.deleteOne({ _id: id }).exec();

    res.status(200).json({ message: `id: ${id} deleted successfully` });
  } catch (err) {
    console.error(err);
    res.status(400).send({ status: 400, message: err });
  }
};

export { getProjects, getProject, createProject, updateProject, deleteProject };
