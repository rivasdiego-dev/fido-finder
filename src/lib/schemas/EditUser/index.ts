import z from 'zod';

export const editUserSchema = z.object({
    name: z.string().min(1, "El nombre no puede estar vacío")
        .max(20, "El nombre no puede tener más de 20 caracteres"),
    lastname: z.string().min(1, "El apellido no puede estar vacío")
        .max(20, "El apellido no puede tener más de 20 caracteres"),
    dob: z.string()
        .refine((value) => {
            const date = new Date(value);
            const now = new Date();
            if (date > now) {
                return false;
            }
            return true;
        }, "La fecha de nacimiento no puede ser mayor a la fecha actual")
        // Validate that the user is at least 14 years old
        .refine((value) => {
            const date = new Date(value);
            const now = new Date();
            let age = now.getFullYear() - date.getFullYear();
            if (now.getMonth() < date.getMonth() || (now.getMonth() === date.getMonth() && now.getDate() < date.getDate())) {
                age--;
            }
            if (age < 14) {
                return false;
            }
            return true;
        }, "Debes tener al menos 14 años para registrar tu fecha de nacimiento")
        .optional(),
    phone_number: z.string().refine((value) => {
        return value === '' || /^\d{4}-\d{4}$/.test(value);
    }, "El número de teléfono debe estar vacío o tener el formato 0000-0000").optional()
});

export type typeEditUserSchema = z.infer<typeof editUserSchema>;
