import React from 'react'
import { ReactComponent as LogoSVG } from './../../../icons/logo-gauler-admin.svg'
import { ReactComponent as DoorCloseSVG } from './../../../icons/door-close.svg'
import { Link } from 'react-router-dom';
import { NavbarHomeDContainer, UnlistNavbarHomeD } from './styles/sNavbarHomeD'
import { listItemsNavbar } from './listItemsNavbar';
import ItemNavbarHomeD from './ItemNavbarHomeD'

export default function NavbarHomeD() {
  const lastListItemsNavbar = [
    {
      nameItem: 'Cerrar sesión',
      icon: <DoorCloseSVG />,
      link: '/',
      item: 'signOut',
    },
  ]

  return (
    <NavbarHomeDContainer>
      <div className='logoNavbarAHomeD'>
        <Link to="/admin/home" aria-label='Logo Gauler'>
          <LogoSVG />
        </Link>
      </div>
      <UnlistNavbarHomeD>
        {
          listItemsNavbar.map((item) => <ItemNavbarHomeD key={item.nameItem} {...item} />)
        }
      </UnlistNavbarHomeD>
      <UnlistNavbarHomeD>
        {
          lastListItemsNavbar.map((item) => <ItemNavbarHomeD key={item.nameItem} {...item} />)
        }
      </UnlistNavbarHomeD>
    </NavbarHomeDContainer>
  );
}
