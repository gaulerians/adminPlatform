import React from 'react'
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./theme/GlobalStyles";
import { Routes, Route, Navigate } from "react-router-dom";
import theme from "./theme/Theme";
import AdminLayout from "./components/layouts/AdminLayout";

//import Routes
import { adminRoutes } from "./routes";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Routes>
        {
          adminRoutes.map((route) => (
            <Route
              path={route.path}
              key={route.path}
              element={<AdminLayout children={route.element} />}
            />
          ))
        }
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </ThemeProvider>
  )
}
