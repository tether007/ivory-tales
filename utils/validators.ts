import { z } from 'zod';

export const reachOut = z.object({
    email: z.email('Invalid email address'),
    name: z.string().min(2, 'Name must be at least 2 characters').max(100),
});