import DashboardLayout from 'components/dashboard-layout'
import { Exchange, Home, OpenOrders, OrderTransactionPage } from 'pages'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route element={<DashboardLayout />}>
                    <Route path='/home' element={<Exchange />} />
                    <Route path='/open-orders' element={<OpenOrders />} />
                    <Route path='/open-orders/:id' element={<OrderTransactionPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter