import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import './responsive.css';
import { AuthProvider } from './context/auth';
import { CartProvider } from './context/cart';
import { WishlistProvider } from './context/wishlist';
import { SearchProvider } from './context/search';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<>
    <AuthProvider>
        <SearchProvider>
            <WishlistProvider>
                <CartProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </CartProvider>
            </WishlistProvider>
        </SearchProvider>
    </AuthProvider>
</>)