import { envs } from "./env.schema";

const MY_URL_FRONTEND = envs.my_url_frontend;

const corsOptions = {
    origin: [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:3002',
        'http://localhost:4000',
        'http://localhost:5173',
        MY_URL_FRONTEND,
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE',],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

export default corsOptions;