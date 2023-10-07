const {z} = require("zod")

const registerSchema = z.object({
    name: z.string().regex(/^[^0-9][a-zA-Z]+$/).max(50).min(2).nonempty(),
    email: z.string().email().nonempty(),
    role: z.string().regex(/admin|customer|seller/).nonempty(),
    address: z.string().nonempty(),
    phone: z.string().regex(/^(\+\d{1,3}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/).nonempty()
})

module.exports = {
    registerSchema,
}