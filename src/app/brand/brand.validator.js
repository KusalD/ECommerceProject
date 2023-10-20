const {z} = require("zod")

const BrandCreateSchema = z.object({
    title: z.string().nonempty(),
    status: z.string().regex(/active|inactive/).nonempty().default('inactive')
})
const BrandUpdateSchema = z.object({
    title: z.string().nonempty(),
    status: z.string().regex(/active|inactive/).nonempty().default('inactive')
})

module.exports ={
    BrandCreateSchema,
    BrandUpdateSchema
}