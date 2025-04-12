const express=require("express")

const contactRouter=require("./contact")
const router=express.Router()

router.use("/contact",contactRouter)

module.exports=router  
