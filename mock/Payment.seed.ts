import { CreatePaymentDto } from "src/payments/dto";
import { Currency, PaymentStatus, PaymentProvider } from "@prisma/client";

const paymentSeed: CreatePaymentDto[] = [
    {
        id: "3f3a6a10-2b47-4232-9a3b-5b2e6a7c8d90",
        orderId: "3f3a6a10-2b47-4c0d-9a3b-5b2e6a7c8d90",
        amount: 109497,
        currency: Currency.ARS,
        provider: PaymentProvider.MERCADOPAGO,
        status: PaymentStatus.PENDING,
        providerPaymentId: PaymentProvider.MERCADOPAGO,
    },
];

export default paymentSeed;
