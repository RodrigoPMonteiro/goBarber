import express from 'express';
// src/server.ts

import routes from './routes';

const app = express();

// eslint-disable-next-line arrow-body-style
app.get('/', (request, response) => {
  return response.json({
    message: 'Hello',
  });
});

app.listen(3333, () => {
  console.log('🐱‍🏍🐱‍🏍 - Server started!');
});
