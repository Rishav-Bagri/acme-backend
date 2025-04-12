const express=require("express")
const z=require("zod")
const { Contact } = require("../DB/user")
const router=express.Router()

const contactSchema=z.object({
    fullName:z.string(),
    email:z.string().email(),
    phoneNumber:z.string(),
    subject:z.string(),
    message:z.string()
})

const inputCheckMiddleware=(req,res,next)=>{
    const body=req.body
    const parsed=contactSchema.safeParse(body)
    if(!parsed.success){
        res.json({
            message:"wrong inputs",
            error: parsed
        })
    }
    next()
}

router.post("/",inputCheckMiddleware,async(req,res)=>{
    try {
        const body = req.body
        body["createdAt"] = new Date()

        const newContact = await Contact.create(body)
        res.status(201).json({ message: "Contact saved", data: newContact })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Something went wrong" })
    }
})


module.exports=router