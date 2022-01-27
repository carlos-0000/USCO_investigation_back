import express from 'express'
import morgan from 'morgan'
import pkg from '../package.json'

import {createRoles} from './libs/initialSetup';

import productsRoutes from './routes/products.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/users.routes';
import countriesRoutes from './routes/countries.routes';
import municipiosRoutes from './routes/municipios.routes';
import departamentosRoutes from './routes/departamentos.routes';
import tiposDocumentosRoutes from './routes/tiposDocumentos.routes';

const app = express();
createRoles();

app.set('pkg', pkg);

app.use(morgan('dev')); // ver consoles
app.use(express.json());

app.get('/', (request, response) => {
    response.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    });
})

app.use('/api/products', productsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/countries', countriesRoutes);
app.use('/api/municipios', municipiosRoutes);
app.use('/api/departamentos', departamentosRoutes);
app.use('/api/tiposDocumentos', tiposDocumentosRoutes);

export default app;