import express from 'express';
import authRoutes from './routes/AuthRoutes.js';
import petRoutes from './routes/PetRoutes.js';
import ownerRoutes from  './routes/OwnerRoutes.js';
import vetRoutes from  './routes/VetRoutes.js';
import appointmentRoutes from './routes/AppointmentRoutes.js'
import eventRoutes from './routes/EventsRoutes.js'
import cors from 'cors'; 

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors()); 

app.use('/v1/auth', authRoutes);
app.use('/v1/pet', petRoutes);
app.use('/v1/owner', ownerRoutes);
app.use('/v1/vet', vetRoutes);
app.use('/v1/appointment', appointmentRoutes);
app.use('/v1/event', eventRoutes);


app.get('/', (req, res) => {
  res.send('API is running!');
});

const PORT = process.env.PORT || 5000;

if(process.env.ENTORNO == "Test"){
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
