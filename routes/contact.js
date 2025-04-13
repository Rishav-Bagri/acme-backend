const express = require("express")
const z = require("zod")
const rateLimit = require("express-rate-limit")
const { Contact } = require("../DB/user")
const router = express.Router()

// 🛡️ Zod schema for validating contact input
const contactSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  email: z.string().email(),
  phoneNumber: z.string(),
  subject: z.string(),
  details: z.object({
    Budget: z.string(),
    Company: z.string(),
    Timeline: z.string(),
    Message: z.string()
  })
})


// ⏳ Limit to 5 submissions per IP per 10 minutes
const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5,
  message: {
    status: 429,
    message: "Too many contact submissions. Please wait 10 minutes."
  }
})

// 🧠 Validation middleware using Zod
const inputCheckMiddleware = (req, res, next) => {
  const parsed = contactSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: parsed.error.errors
    })
  }
  next()
}

// 📬 POST /contact (with rate limit + validation)
router.post("/", contactLimiter, inputCheckMiddleware, async (req, res) => {
  try {
    const body = { ...req.body, createdAt: new Date() }

    const newContact = await Contact.create(body)
    res.status(201).json({ message: "Contact saved", data: newContact })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Something went wrong" })
  }
})

module.exports = router
