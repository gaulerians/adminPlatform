import React from 'react';
import { ReactComponent as LogoGaulerSVG } from './../../icons/gauler-icon.svg'
import { MainSpinnerContainer } from './styles/sMainSpinner'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'

const Mainspinner = ({ title }) => {
  const [t] = useTranslation("main")
  return (
    <MainSpinnerContainer>
      <Helmet>
        <title>{t("brand.spinner.title")}</title>
        <meta name="robots" content="noindex, nofollow"/>
      </Helmet>
      <div className='spinnerDescription'>
        <LogoGaulerSVG />
        <p>{title}</p>
      </div>
    </MainSpinnerContainer>
  );
}

export default Mainspinner;
