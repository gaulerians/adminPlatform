import React from 'react';
import MainRegister from '../components/registerAndLogin/MainRegister'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'

const Register = () => {
    const [t] = useTranslation("main")
    return(
        <>
            <Helmet>
                <title>Registro | Gauler</title>
                <meta name="description" content="Gauler - Educación virtual" />
                <meta property="og:title" content="Registro | Gauler" />
                <meta property="og:description" content="Gauler - Educación virtual" />
                <meta property="twitter:title" content="Registro | Gauler" />
                <meta property="twitter:description" content="Gauler - Educación virtual" />
            </Helmet>
            <MainRegister/>
        </>
    )
};

export default Register;