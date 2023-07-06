import * as argon2 from 'argon2'
import { v4 as uuidv4 } from 'uuid';
import { Router } from 'express'

const routes = Router()

interface IProps {
  id: string
  name: string
  username: string
  email: string
  password: string
}

const data: IProps[] = []

// Home
routes.get('/', (req, res) => res.json({ work: true }))

routes.get('/user', async (req, res) => {
  res.json(data)
})

routes.post('/user', async (req, res) => {
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

export default routes;