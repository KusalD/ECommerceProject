const{z} = require("zod")

let registerSchema = z.object({
    name: z.string().regex(/^[^0-9][a-zA-Z0-9\s]+$/).max(50).min(2).nonempty(),
    email: z.string().email().nonempty(),
    role: z.string().regex(/admin|customer|seller/).nonempty(),
    address: z.string().nonempty(),
    phone: z.string().regex(/^(\+\d{3,3}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/).nonempty(),
})
let activateUserSchema = z.object({
    password: z.string().min(8).regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/),
    confirmPassword: z.string().nonempty()
    // name: z.string().regex(/^[^0-9][a-zA-Z0-9\s]+$/).max(50).min(2).nonempty(),
    // email: z.string().email().nonempty(),
    // role: z.string().regex(/admin|customer|seller/).nonempty(),
    // address: z.string().nonempty(),
    // phone: z.string().regex(/^(\+\d{3,3}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirm"],
});

let loginSchema = z.object({
    email: z.string().email().nonempty(),
    password: z.string().nonempty()
})
let meSchema = z.object({
    // name: z.string().regex(/^[^0-9][a-zA-Z0-9\s]+$/).max(50).min(2).nonempty(),
})
let forgotPasswordSchema = z.object({
    email: z.string().email().nonempty(),

})
let setPasswordSchema = z.object({
    password: z.string().min(8).regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/),
    confirmPassword: z.string().nonempty()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirm"],
});

module.exports = {
    registerSchema,
    activateUserSchema,
    loginSchema,
    meSchema,
    forgotPasswordSchema,
    setPasswordSchema
}

