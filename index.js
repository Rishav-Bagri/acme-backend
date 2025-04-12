const express= require("express")
const cors=require("cors")
const app=express()
const mainRouter=require("./routes/index")
app.use(cors())

app.use(express.json())

app.use("/api/v1",mainRouter)

app.use((req,res,next)=>{
    res.status(404).send("not found thik h?")
})
app.use((err,req,res,next)=>{
    res.status(404).send("something broke")
})

app.listen(3000)