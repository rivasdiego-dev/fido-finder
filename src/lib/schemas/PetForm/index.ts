import z from 'zod';

export const petFormSchema = z.object({
    name: z.string().nonempty("El nombre no puede estar vacío"),
    type: z.string().nonempty("El tipo no puede estar vacío"),
    breed: z.string().nonempty("La raza no puede estar vacía"),
    color: z.string().nonempty("El color no puede estar vacío"),
});

export type typePetFormSchema = z.infer<typeof petFormSchema>;