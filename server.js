import express from 'express';
import winston from 'winston';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import webpackMiddleware from 'webpack-dev-middleware';
import webpack from 'webpack';
import validator from 'express-validator';
import webpackConfigDev from './webpack.config.dev';
import path from 'path';
import userRouter from './server/routes/userRouter';
import articleRouter from './server/routes/articleRouter';
import commentRouter from './server/routes/commentRouter';

dotenv.load();

mongoose.connect(process.env.DATABASE_URL);

let db = mongoose.connection;

const server = express();
const port = process.env.PORT || 3000;

server.use(express.static('./client/')); // configure static files folder
server.use(express.static('./client/public/')); // configure static files folder

if (process.env.NODE_ENV === 'development') {
	server.use(webpackMiddleware(webpack(webpackConfigDev)));
}

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(validator());

server.use('/api/v1/users', userRouter);
server.use('/api/v1/articles', articleRouter);
server.use('/api/v1/comments', commentRouter);

server.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, './client/index.html'));
});

server.listen(port);

winston.info('App connected to port: ' + port);
