import express from 'express';
import authRoutes from './routes/AuthRoutes.js'; 
import cors from 'cors'; 

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors()); 

app.use('/v1/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('API is running!');
});

const PORT = process.env.PORT || 5000;
/*
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});*/

export default app;
