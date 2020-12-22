const express = require('express')
const mongoose = require('mongoose');
const Article = require('./models/article')
const articleRouter = require('./routes/articles');
const app = express()
const methodOverride = require('method-override');
const port = process.env.PORT || 3000
require('dotenv').config()

const dev_db_url = 'mongodb+srv://pranavvp10:forvpblog@cluster0.xyof8.mongodb.net/vpblog?retryWrites=true&w=majority'
mongoose.connect(process.env.MONGODB_URI || dev_db_url,
{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex: true
})




app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended:false }))

app.use(methodOverride('_method'))

app.get('/', async (req, res) => {

    const articles= await Article.find().sort({
        dateCreated: 'desc'
    })

    res.render('articles/index', {articles:articles})
})

app.use('/articles',articleRouter)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))