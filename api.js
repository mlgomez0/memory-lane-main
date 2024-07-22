import express from 'express'
import pkg from 'sqlite3'
import multer from 'multer'
const { Database } = pkg
import cors from 'cors'

const app = express()
const upload = multer()
const port = 4001
const db = new Database('memories.db')

app.use(express.json())
app.use(cors({
  origin: '*'
}))


db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS memories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      description TEXT,
      timestamp DATE,
      image BLOB,
      imagename TEXT
    )
  `)
})

const parseBase64 = (rows) => {
  rows.forEach(row => {
    const image64 = row.image.toString('base64')
    row.image = image64
  })
}

app.get('/memories', (req, res) => {
  db.all('SELECT * FROM memories ORDER BY timestamp DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    parseBase64(rows)
    res.json({ memories: rows })
  })
})

app.post('/memories', upload.single('image'), (req, res) => {
  const { name, description, timestamp } = req.body
  const image = req.file?.buffer
  
  const imageName = req.file?.originalname

  if (!name || !description || !timestamp || !image) {
    res.status(400).json({
      error: 'Please provide all fields: name, description, timestamp, image',
    })
    return
  }
  
  const stmt = db.prepare(
    'INSERT INTO memories (name, description, timestamp, image, imagename) VALUES (?, ?, ?, ?, ?)'
  )
  stmt.run(name, description, timestamp, image, imageName, (err) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.status(201).json({ message: 'Memory created successfully' })
  })
})

app.get('/memories/:id', (req, res) => {
  const { id } = req.params
  db.get('SELECT * FROM memories WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    if (!row) {
      res.status(404).json({ error: 'Memory not found' })
      return
    }
    parseBase64([row])
    res.json({ memory: row })
  })
})

app.put('/memories/:id', upload.single('image'), (req, res) => {
  const { id } = req.params
  const { name, description, timestamp } = req.body
  const image = req.file?.buffer
  const imageName = req.file?.originalname

  if (!name || !description || !timestamp) {
    res.status(400).json({
      error: 'Please provide all fields: name, description, timestamp',
    })
    return
  }

  let query = 'UPDATE memories SET name = ?, description = ?, timestamp = ?'
  const params = [name, description, timestamp]

  if (image) {
    query += ', image = ?, imagename = ?'
    params.push(image, imageName)
  }

  query += ' WHERE id = ?'
  params.push(id)

  const stmt = db.prepare(query)
  stmt.run(params, (err) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ message: 'Memory updated successfully' })
  })
})


app.delete('/memories/:id', (req, res) => {
  const { id } = req.params
  db.run('DELETE FROM memories WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ message: 'Memory deleted successfully' })
  })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
