import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import bodyParser from 'body-parser';
import router from './Routes/authRouter.js';
import appRouter from './Path/appCor.js';

const app = express();
const PORT = process.env.PORT || 8000;
app.use(bodyParser.json());

app.use(express.json());

await connectDB();

app.use(cors());

app.use('/auth', router);
app.use('/apps', appRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the Winget Server');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
