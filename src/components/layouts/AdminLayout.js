import React from 'react';
import NavbarHomeD from './../general/nabvar/NavbarHomeD';
import { GridAdminLayout } from './../../styles/generalStyles'

const AdminLayout = ({ children }) => {
  return (
    <>
      <GridAdminLayout>
        <NavbarHomeD />
        <div></div>
        {children}
      </GridAdminLayout>
    </>
  );
}

export default AdminLayout;
