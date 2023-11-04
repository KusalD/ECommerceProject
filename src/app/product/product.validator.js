const {z} = require("zod")

const ProductCreateSchema = z.object({
    name: z.string().min(3),
    description: z.string(),
    category: z.string(),
    brand: z.string(),
    price: z.string().regex(/\d/).min(1),
    discount: z.string().regex(/\d/).min(0).max(100).default(0),
    seller: z.string(),
    isFeatured: z.boolean().default(false),
    tags: z.array(z.string()),
    stock: z.string().regex(/\d/).min(0).default(0),
    status:z.string().regex(/active|inactive/).nonempty().default('inactive')
})

const ProductUpdateSchema = z.object({
    name: z.string().nonempty().min(3),
    description: z.string(),
    category: z.string(),
    brand: z.string(),
    price: z.string().regex(/\d/).min(1),
    discount: z.string().regex(/\d/).min(0).max(100).default(0),
    seller: z.string(),
    isFeatured: z.boolean().default(false),
    tags: z.array(z.string()),
    stock: z.string().regex(/\d/).min(0).default(0),
    status:z.string().regex(/active|inactive/).nonempty().default('inactive')
})

module.exports = {
    ProductCreateSchema,
    ProductUpdateSchema
}