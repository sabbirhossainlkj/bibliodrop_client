import React, { Suspense } from 'react';
import PaymentPage from './PaymentPage';

const Payment = () => {
    return (
        <Suspense>
            <PaymentPage></PaymentPage>
        </Suspense>
    );
};

export default Payment;