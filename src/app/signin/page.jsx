import React, { Suspense } from 'react';
import SignInPage from './SignInPage';

const Signin = () => {
    return (
        <Suspense>
            <SignInPage></SignInPage>
        </Suspense>
    );
};

export default Signin;