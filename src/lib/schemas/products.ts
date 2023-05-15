import {z} from 'zod'

export const searchSchema = z.object({
    // no special characters allowed like !@#$%^&*()_+ etc
    country: z.string().regex(/^[a-zA-Z]{2}$/),
    keyword: z.string().min(1).max(255),
})