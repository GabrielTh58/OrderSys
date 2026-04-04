import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/AuthRoutes';
import productsRoutes from './routes/ProductsRoutes';
import { setupSwagger } from './config/swagger';
import { ErrorHandler } from './middleware/ErrorHandler';

dotenv.config();
const PORT = process.env.PORT || 4000;

const app = express();
setupSwagger(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send('ping');
});

app.use('/auth', authRoutes);
app.use('/products', productsRoutes);

app.use(ErrorHandler)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});