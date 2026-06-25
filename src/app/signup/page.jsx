import React, { Suspense } from 'react';
import SignupPage from './SignupPage';

const Signup = () => {
    return (
        <Suspense>
            <SignupPage></SignupPage>
        </Suspense>
    );
};

export default Signup;