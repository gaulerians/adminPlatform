import React, {useContext, useEffect} from 'react';
import { useFirestore } from 'reactfire';
import { Link, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Wrapper, RegisterAndLoginWrapper } from './../../styles/generalStyles'
import { Button } from './../../styles/buttonGeneral'
import { Text } from './../../styles/textGeneral'
import { ImageDesktopRegisterAndLogin, TransparentLR } from './../../styles/boxesGeneral'
import { ReactComponent as LogoSVG } from './../../icons/logo-gauler.svg'
import { ReactComponent as GoogleSVG } from './../../icons/google-fill.svg'
import { MainRegisterContainer, DesktopRegisterContainer } from './styles/sMainRegister'
import registerImage from './../../images/register-image.jpg'

//Import ALGORITHMS
import { SignInWithGoogle } from './algorithms/SignInWithGoogle'

//Import Contexts
import { AppContext } from '../../App'

const MainRegister = () => {

    const db = useFirestore()
	const {currentUser, dataOfUser} = useContext(AppContext)
    const navigate = useNavigate()
    const [t] = useTranslation("main")

	useEffect(()=>{
		currentUser && dataOfUser && navigate('/home')
	},[currentUser])

    return(
		<main>
			<DesktopRegisterContainer>
				<ImageDesktopRegisterAndLogin>
					<TransparentLR />
					<img src={registerImage} alt="Matricúlate en Gauler" />
				</ImageDesktopRegisterAndLogin>
				<Wrapper>
					<RegisterAndLoginWrapper>
						<MainRegisterContainer>
							<div className='mainRegisterAndLogin'>
								<div>
									<a href="/">
										<LogoSVG className="logoFooterLanding" />
									</a>
								</div>
								<Text>
									{t('initialRegisterMessage')}
								</Text>
								<Button type="button" google onClick={()=> SignInWithGoogle(db, navigate)}>
									<GoogleSVG />
									{t('signUpWithGoogle')}
								</Button>
							</div>
							<div className='footerRegisterAndLogin'>
								<Text className='registerAndLoginFooter'>{t('areYouEnrolled')}</Text>
								<Link to="/login"><Button tertiary>{t('signIn')}</Button></Link>
							</div>
						</MainRegisterContainer>
					</RegisterAndLoginWrapper>
				</Wrapper>
			</DesktopRegisterContainer>
		</main>
  )
}

export default MainRegister;
