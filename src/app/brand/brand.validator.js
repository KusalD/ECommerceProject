const {z} = require("zod")

const BrandCreateSchema = z.object({
    title: z.string().min(3),
    status:z.string().regex(/active|inactive/).nonempty().default('inactive')
})

const BrandUpdateSchema = z.object({
    title: z.string().min(3),
    status:z.string().regex(/active|inactive/).nonempty().default('inactive')
})

module.exports = {
    BrandCreateSchema,
    BrandUpdateSchema
}