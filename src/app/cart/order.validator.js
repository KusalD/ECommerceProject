const {z} = require("zod")


const orderCreateValidator = z.array(z.object({
    productId: z.string().nonempty(),
    qty: z.number().min(1)
}))

const transactionBodySchema = z.object({
    transactionId : z.string(),
    mode : z.string().regex(/esewa|khalti|cod|bank/),
    payment: z.number().min(1),
    status: z.string().regex(/paid|cancelled|pending/)
})

module.exports = {orderCreateValidator,transactionBodySchema}