const { response } = require('express')
const express = require('express')
const mongo = require('mongoose')
const shortURL = require('./models/shortUrlModel')
const app = express()
const PORT = 3000

mongo.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, db) => {
    if (err) return res.send(`Error ${err}`)
    const dataBase = db
    console.log(`Connected To DataBase`)
})

// Cant Read Request Body Without This
app.use(express.urlencoded({
    extended: false
}))

// Set's The View Engine To Render EJS File
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index', { url: "" })
})

app.post('/shrink', async(req, res) => {
    await shortURL.create({
        fullURL: req.body.fullURL
    }).then(
        (response) => { res.render('index', { url: response.shortURL }) }
    )
})

app.get('/:short', async(req, res) => {
    short = req.params.short
    if (short == 'favicon') return
    await shortURL.findOne({
        shortURL: short
    }).then(
        (response) => {
            response.clicks++
                response.save()
            res.redirect(response.fullURL)
        }
    ).catch(
        (err) => {
            res.status(404)
            res.send(`The Page You Are Trying To Reach Doesn't Exists\n Error 404`)
        }
    )
})


app.listen(PORT, () => {
    console.log(`Listening On Port ${PORT}`)
})