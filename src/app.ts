import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import * as argon2 from 'argon2'

const app = express()
const port = 3000

interface IProps {
  id: string
  name: string
  username: string
  email: string
  password: string
}

const data: IProps[] = []

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ work: true })
})

app.get('/user', async (req, res) => {
  res.json(data)
})

app.post('/user', async (req, res) => {
  const { name, username, email, password }: IProps = req.body

  data.push({
    id: uuidv4(),
    name,
    username,
    email,
    password: await argon2.hash(password)
  })

  // res.json({ status: 'Oops something went wrong. Please try again later!' })

  return res.json({ status: 'ok' })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})