import { z } from "zod"

export const formSchema = z.object({
    name: z.string().min(1, { message: "Nome não pode ser vazio" }),
    ri_number: z.string().optional(),
    status: z.enum(["SOON_RELEASE", "RELEASE", "iN_PROGRESS", "READY"]),
    purpose: z.enum(["residencial", "commercial"]),
    address: z.object({
      district: z.string(),
      city: z.string(),
      street: z.string(),
      state: z.string(),
      number: z.coerce.string().min(1, { message: "O número é obrigatório" }),
      cep: z.string().min(8).max(9)
    })
  })
  
  export type FormType = z.infer<typeof formSchema>