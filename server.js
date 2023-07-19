import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import { mainRoute } from './routes/index.js';
import SwaggerUI from 'swagger-ui-express';

import { createRequire } from "module";          
const require = createRequire(import.meta.url);
const swaggerDocument = require("./swagger.json");

// import assert from 'assert';
// import swaggerDocument from "./swagger.json" assert { type: "json"};

const { auth, requiresAuth } = pkg;
import pkg from 'express-openid-connect';




const app = express();
dotenv.config();

const PORT = process.env.PORT || 8000;

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.AUTH_CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL
};    

app
    .use(bodyParser.json())
    .use(cors())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use(auth(config))
    .use('/api-docs', SwaggerUI.serve, SwaggerUI.setup(swaggerDocument))
    .use('/', mainRoute);

app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
    });

mongoose
    .connect(process.env.MONGODB_URI)
    .then(result => {
        app.listen(process.env.port || PORT);
        console.log(`Web server is listing at port ${PORT}`);
    })
    .catch(err => {
        console.log(err);
    });
