import express from 'express'
import library from '../routes/library'

const app = express()
const PORT = 8000

app.use('/', library)

app.use('*', (req, res) => {
    return res.send('Not valid')
})

app.listen(PORT, () => {
    console.log('Express up. ' + PORT)
})

export default app