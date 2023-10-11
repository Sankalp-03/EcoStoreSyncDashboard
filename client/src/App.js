import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "theme";  
import Dashboard from "scenes/dashboard";
import Layout from "scenes/layout";
import Products from "scenes/products";
import Customers from "scenes/customers";
import Transactions from "scenes/transactions";
import Geography from "scenes/geography";
import Overview from "scenes/overview";
import Daily from "scenes/daily";
import Monthly from "scenes/monthly";
import BreakDown from "scenes/breakdown";
import Admin from "scenes/admin";
import Performance from "scenes/performance";
function App() {
  const mode = useSelector((state) => state.global.mode); // way to grab the state(mode) we just created in state/index.js file.
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
    {/* Theme provider uses context feature of react to pass the theme down to the components. */}
    {/* CSSBaseline is used to add defaults of css to an project */}
    {/* Using BrowserRouter to create routes for the navbar */}
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline /> 
        <Routes>
          <Route element={<Layout />}>
            {/* Any component coming in this route will have Layout as its parent component*/}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            {/* 'replace' keyword is used such that current entry in history stack is replaced with the new one. */}
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Above two routes tell that when we visit the root path we will be redirected to the dashboard page */}
            <Route path="/products" element={ <Products /> } />
            <Route path="/customers" element={<Customers />} />
            <Route path="/transactions" element = { <Transactions /> } />
            <Route path="/geography" element = { <Geography />} />
            <Route path="/overview" element = { <Overview /> } />
            <Route path="/daily" element = { <Daily /> } />
            <Route path="/monthly" element = { <Monthly />} />
            <Route path="/breakdown" element = { <BreakDown />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/performance" element={<Performance />} />
          </Route>
        </Routes>
      </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
