import React, { useContext, useEffect } from 'react';
import { useFirestore } from 'reactfire';
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from "react-i18next"
import { Wrapper, RegisterAndLoginWrapper } from '../../styles/generalStyles'
import { Button } from '../../styles/buttonGeneral'
import { Text } from '../../styles/textGeneral'
import { ImageDesktopRegisterAndLogin, TransparentLR } from '../../styles/boxesGeneral'
import { ReactComponent as LogoSVG } from './../../icons/logo-gauler.svg'
import { ReactComponent as GoogleSVG } from './../../icons/google-fill.svg'
import { MainRegisterContainer, DesktopRegisterContainer } from './styles/sMainRegister'
import loginImage from './../../images/aula-gauler.jpeg'

//Import ALGORITHMS
import { SignInWithGoogle } from './algorithms/SignInWithGoogle'

//Import Contexts
import {AppContext} from '../../App'

// Import Hooks
import useMounted from '../../hooks/useMounted'

import MainSpinner from '../../components/spinner/MainSpinner';

const Mainlogin = () => {

  const db = useFirestore()
  const navigate = useNavigate()
  const {setCurrentUser, currentUser, dataOfUser} = useContext(AppContext)
  const [t] = useTranslation("main");

  useEffect(()=>{
    currentUser && dataOfUser && navigate('/home')
  },[currentUser])

  return (
    <main>
    <DesktopRegisterContainer>
      <ImageDesktopRegisterAndLogin>
        <TransparentLR />
        <img src={loginImage} alt="Entra en Gauler" />
      </ImageDesktopRegisterAndLogin>
      <Wrapper>
        <RegisterAndLoginWrapper>
          <MainRegisterContainer>
            <div className='mainRegisterAndLogin'>
              <div>
                <Link to="/">
                  <LogoSVG className="logoFooterLanding" />
                </Link>
              </div>
              <Text>
                {t('initialLoginMessage')}
              </Text>
              <Button type="button" google onClick={() => SignInWithGoogle(db, navigate)}>
                <GoogleSVG />
                {t('signInWithGoogle')}
              </Button>
            </div>
            <div className='footerRegisterAndLogin'>
              {/* <Text className='registerAndLoginFooter'>{t('areYouNotEnrolled')}</Text> */}
              {/* <Link to="/promotions"><Button tertiary>Matricularse</Button></Link> */}
            </div>
          </MainRegisterContainer>
        </RegisterAndLoginWrapper>
      </Wrapper>
    </DesktopRegisterContainer>
  </main>
  );
}

export default Mainlogin;
