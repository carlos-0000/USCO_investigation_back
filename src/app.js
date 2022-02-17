import express from 'express'
import morgan from 'morgan'
import pkg from '../package.json'

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/users.routes';
import countriesRoutes from './routes/countries.routes';
import regionesRoutes from './routes/regiones.routes';
import municipiosRoutes from './routes/municipios.routes';
import departamentosRoutes from './routes/departamentos.routes';
import documentTypesRoutes from './routes/documentTypes.routes';
import gendersRoutes from './routes/genders.routes';
import civilStatusesRoutes from './routes/civilStatuses.routes';
import ethnicGroupsRoutes from './routes/ethnicGroups.routes';
import rolesRoutes from './routes/roles.routes';
import {educationalEntitiesRouter, noEducationalEntitiesRouter} from './routes/entities.routes';

const app = express();

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

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.use('/api/countries', countriesRoutes);
app.use('/api/regiones', regionesRoutes);
app.use('/api/departamentos', departamentosRoutes);
app.use('/api/municipios', municipiosRoutes);

app.use('/api/documentTypes', documentTypesRoutes);

app.use('/api/genders', gendersRoutes);
app.use('/api/civilStatuses', civilStatusesRoutes);
app.use('/api/ethnicGroups', ethnicGroupsRoutes);

app.use('/api/roles', rolesRoutes);

app.use('/api/educationalEntities', educationalEntitiesRouter);
app.use('/api/nonEducationalEntities', noEducationalEntitiesRouter);

export default app;