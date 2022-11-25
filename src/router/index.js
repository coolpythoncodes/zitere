import DashboardLayout from 'components/dashboard-layout'
import { Exchange, Home } from 'pages'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route element={<DashboardLayout />}>
                    <Route path='/home' element={<Exchange />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter