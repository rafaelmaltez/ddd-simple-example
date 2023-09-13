import app from './web/express/server'
import 'express-async-errors'

app.listen(3000, ()=> console.log("running"));