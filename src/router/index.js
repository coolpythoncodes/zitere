import DashboardLayout from 'components/dashboard-layout'
import { Exchange, ExchangeTransactionPage, Home, OpenOrders, OrderTransactionPage, Transactions } from 'pages'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route element={<DashboardLayout />}>
                    <Route path='/home' element={<Exchange />} />
                    <Route path='/home/:id' element={<ExchangeTransactionPage />} />
                    <Route path='/open-orders' element={<OpenOrders />} />
                    <Route path='/open-orders/:id' element={<OrderTransactionPage />} />
                    <Route path='/transactions' element={<Transactions />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter