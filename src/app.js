import express from 'express'
import mongoose from 'mongoose'
import handlebars from'express-handlebars'
import __dirname from './utils.js';
import dotenv from "dotenv"
import indexRouter from './routes/index.router.js'
// import userRouter from'./routes/users.router.js'
import messageRouter from './routes/messages.router.js'
import cartRouter from './routes/carts.router.js'
import productRouter from './routes/products.router.js'


const app = express()
const PORT = 8080

dotenv.config();
console.log(process.env)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log("Conectado a la base de datos")})
    .catch(error => console.error("Error en la conexión", error))
app.use('/', indexRouter)
// app.use('/', userRouter)
app.use('/', messageRouter)
app.use('/', cartRouter)
app.use('/', productRouter)
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
}
)