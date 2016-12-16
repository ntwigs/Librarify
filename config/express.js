import express from 'express'

const PORT = 8000
const app = express()

app.use('*', (req, res) => {
    return res.send('Not valid')
})

app.listen(PORT, () => {
    console.log('Express up. ' + PORT)
})

export default app
