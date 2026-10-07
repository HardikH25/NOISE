import ProtectedRoute from './components/ProtectedRoute.jsx';
import PublicRoute from './components/PublicRoute.jsx';
import Home from './Pages/Home';
import Landing from './Pages/Landing';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Products from './Pages/Products';
import ProductDetails from './Pages/ProductDetails';
import Wishlist from './Pages/Wishlist';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PublicRoute><Landing /></PublicRoute>}></Route>
        <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
        <Route path='/products' element={<ProtectedRoute><Products /></ProtectedRoute>}></Route>
        <Route path='/products/:id' element={<ProtectedRoute><ProductDetails /></ProtectedRoute>}></Route>
        <Route path='/wishlist' element={<ProtectedRoute><Wishlist /></ProtectedRoute>}></Route>
        <Route path='/signup' element={<PublicRoute><Signup /></PublicRoute>}></Route>
        <Route path='/login' element={<PublicRoute><Login /></PublicRoute>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
