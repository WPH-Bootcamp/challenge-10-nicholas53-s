import { z } from 'zod';

export const checkoutSchema = z.object({
  deliveryAddress: z.string().min(10, 'Alamat minimal 10 karakter'),
  phone: z
    .string()
    .min(8, 'Nomor telepon tidak valid')
    .regex(/^[0-9+\-\s]+$/, 'Nomor telepon hanya boleh angka'),
  paymentMethod: z.string().min(1, 'Pilih metode pembayaran'),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
