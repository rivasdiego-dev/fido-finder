import z from 'zod';

export const petFormSchema = z.object({
    name: z.string().nonempty("El nombre no puede estar vacío")
        .min(2, "El nombre debe tener al menos 2 caracteres")
        .max(20, "El nombre no puede tener más de 20 caracteres"),
    description: z.string()
        .nonempty("La descripción no puede estar vacía")
        .min(10, "La descripción debe tener al menos 10 caracteres")
        .max(120, "La descripción no puede tener más de 120 caracteres"),
    breed: z.string().nonempty("La raza no puede estar vacía"),
    color: z.string().nonempty("El color no puede estar vacío"),
});

export type typePetFormSchema = z.infer<typeof petFormSchema>;