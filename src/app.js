import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import authRouter from './routes/auth.js';
import db from './models/index.js';
import projectRouter from './routes/projectRoutes.js';
import projectMembersRouter from './routes/projectMembersRoute.js'

const app = express()
const port = process.env.PORT;

app.get('/health', (req, res) => {
  res.json({"mess" : "This service is up and running"})
})

app.use(express.json());

app.use('/api/auth', authRouter);

app.use('/api/project', projectRouter)

app.use('/api/projectMembers', projectMembersRouter)

db.sequelize.sync()
  .then(() => {
    console.log('Database synced');
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to sync database:', error);
  });