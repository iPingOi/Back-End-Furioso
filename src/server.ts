import express from 'express'
import cors from 'cors'

const app = express()

import routes from './routes';

app.use(express.json());
app.use(routes)
app.use(cors())


export default function Server(port: number) {
  app.listen(port, () => {
    console.log(`Server Started On http://localhost:${port}. 🚀`);
  })
}