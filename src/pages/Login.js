import React from 'react';
import MainLogin from '../components/registerAndLogin/MainLogin'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'

const Login = () => {
  const [t] = useTranslation("main")
  return (
    <>
      <Helmet>
        <title>Inicia sesión | Gauler</title>
        <meta name="description" content="Gauler - Educación virtual"/>
        <meta property="og:title" content="Inicia sesión | Gauler" />
        <meta property="og:description" content="Gauler - Educación virtual"/>
        <meta property="twitter:title" content="Inicia sesión | Gauler" />
        <meta property="twitter:description" content="Gauler - Educación virtual" />
      </Helmet>
      <MainLogin />
    </>
  );
}

export default Login;
