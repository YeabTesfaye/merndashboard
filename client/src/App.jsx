import {CssBaseline, ThemeProvider} from '@mui/material'
import {createTheme} from '@mui/material/styles'
import { themeSettings } from '@/theme'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'

import Dashboard from '@/pages/dashboard/index.jsx'
import Layout from '@/pages/layout/index.jsx'
import Products from '@/pages/products/index.jsx'
import Customers from '@/pages/customers/index.jsx'
import Transactions from '@/pages/transactions/index.jsx'
import Geography from "@/pages/geography/index.jsx"
import Overview from '@/pages/overview/index.jsx'
import Daily from '@/pages/daily/index.jsx'
import Monthly from '@/pages/monthly/index.jsx'
import Breakdown from '@/pages/breakdown/index.jsx'
import Admins from '@/pages/admin/index.jsx'
import Performance from '@/pages/performance/index.jsx'
import NotFound from '@/pages/notfound/index.jsx'
function App(){
  const mode = useSelector((state) => state.global.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  return (
    <div className="app">
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/daily" element={<Daily />} />
              <Route path="/montly" element={<Monthly />} />
              <Route path="/breakdown" element={<Breakdown />} />
              <Route path="/admin" element={<Admins />} />
              <Route path="/performance" element={<Performance />} />
              <Route path='*' element={<NotFound />}  />
            </Route>
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App