import {Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import PageNotFound from './pages/PageNotFound';
import PrivateRoute from './components/Routes/Private';
import Dashboard from './pages/user/Dashboard';
import EditProfile from './pages/user/EditProfile';
import UserOrders from './pages/user/UserOrders';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminEditProfile from './pages/admin/AdminEditProfile';
import Products from './pages/admin/Products';
import AddProduct from './pages/admin/AddProduct';
import EditProduct from './pages/admin/EditProduct';
import CartPage from './pages/CartPage';
import Wishlist from './pages/Wishlist';
import ProductDetails from './pages/ProductDetails';
import Search from './pages/Search';
import AdminOrders from './pages/admin/AdminOrders';

const App = ()=>{
    return <>
    <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/cart' element={<CartPage/>}/>
        <Route path='/wishlist' element={<Wishlist/>}/>
        <Route path='/product-details/:slug' element={<ProductDetails/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/dashboard' element={<PrivateRoute/>}>
            <Route path='user' element={<Dashboard />}/>
            <Route path='user/edit-profile' element={<EditProfile/>}/>
            <Route path='user/orders' element={<UserOrders/>}/>
        </Route>

        <Route path='/dashboard' element={<AdminRoute/>}>
            <Route path='admin' element={<AdminDashboard/>}/>
            <Route path='admin/edit-profile' element={<AdminEditProfile/>}/>
            <Route path='admin/products' element={<Products/>}/>
            <Route path='admin/add-product' element={<AddProduct/>}/>
            <Route path='admin/edit-product/:slug' element={<EditProduct/>}/>
            <Route path='admin/orders' element={<AdminOrders/>}/>
        </Route>

        <Route path='*' element={<PageNotFound/>}/>
    </Routes>
    </>
};

export default App;