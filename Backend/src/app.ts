import express, { Request, Response } from 'express'
import { File, Web3Storage } from 'web3.storage'

import dotenv from 'dotenv'

dotenv.config({ path: '../.env' })
const app = express()
app.use(express.json())

const client = new Web3Storage({ token: process.env.WEB3_STORAGE_API_KEY! })

app.post('/upload', async (req: Request, res: Response) => {
  try {
    const jsonObject = req.body
    if (!jsonObject || typeof jsonObject !== 'object') {
      return res.status(400).send({ message: 'Please provide a JSON object in the request body' })
    }

    const jsonString = JSON.stringify(jsonObject)
    const file = new File([jsonString], 'file.json', { type: 'application/json' })

    const cid = await client.put([file])

    res.status(200).send({ message: 'JSON object uploaded successfully', cid: cid.toString() })
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: 'Error uploading JSON object' })
  }
})

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 'http://localhost'
app.listen(PORT, () => {
  console.log(`Server is running on ${HOST}:${PORT}`)
})
