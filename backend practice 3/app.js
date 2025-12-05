// Express.js Framwork  / //


import express from 'express'

const app = express()


app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Hello ziyan')
})

app.use((req, res, next) => {
    console.log("middlware running");
    next()

})

app.get('/about', (req, res, next) => {
    return next(new Error("somthing went wrong"))
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something went wronge!')
})

app.listen(3000, () => {
    console.log('Server is running')
})























