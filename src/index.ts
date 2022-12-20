
import routes from "./routes/resize"
import express from 'express';


const app =express();
const port =3000;


app.use('/api',routes)




app.listen(port , ()=> {
  console.log('sever started')
})

export default app ;