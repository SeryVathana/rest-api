import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    displayImg: { type: String, required: true },
    tech: { type: Array, required: true },
    order: { type: Number, required: true },
    links: { type: Object, required: true },
  },
  { timestamps: true }
);

const ProjectModel = mongoose.model('my-projects', projectSchema);
export default ProjectModel;
