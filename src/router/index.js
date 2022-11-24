import { Exchange, Home } from 'pages'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/home' element={<Exchange/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter