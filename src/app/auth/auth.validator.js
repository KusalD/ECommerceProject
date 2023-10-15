const {z} = require("zod")

const registerSchema = z.object({
    name: z.string().regex(/^[^0-9][a-zA-Z0-9\s]+$/).max(50).min(2).nonempty(),
    email: z.string().email().nonempty(),
    role: z.string().regex(/admin|customer|seller/).nonempty(),
    address: z.string().nonempty(),
    phone: z.string().regex(/^(\+\d{1,3}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/).nonempty()
})

const loginSchema = z.object({
    email: z.string().email().nonempty(),
    password: z.string().nonempty(),
})
const activateSchema = z.object({
    password: z.string().min(8).regex(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,15})/),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

module.exports = {
    registerSchema,
    activateSchema,
    loginSchema
}