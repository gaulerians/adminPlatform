import React, {useEffect} from 'react';
import { ReactComponent as CloseSVG } from './../../icons/close.svg'
import { Overlay, ModalContainer, CenterContainer } from './styles/sMainModal'

export default function MainModal({ children, modalState, setModalState, title }) {
  useEffect(() => {

  }, [])
  return (
    <>
      {
        modalState &&
        <>
          <Overlay onClick={() => {setModalState(false)}}></Overlay>
          <ModalContainer>
            <div>
              <h1>{title}</h1>
              <CloseSVG className='closeModal' onClick={() => {setModalState(false)}} />
            </div>
            {children}
          </ModalContainer>
        </>
      }
    </>
  )
}
