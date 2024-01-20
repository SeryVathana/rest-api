import 'dotenv/config';
import express from 'express';
import cors from 'cors';

//Routers
import ProjectRouter from './routes/project.router';

//Connect to MONGODB server
import './libs/mongodb';

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/projects', ProjectRouter);

app.listen(PORT, () => {
  console.log(`App's listening on port ${PORT}!`);
});
