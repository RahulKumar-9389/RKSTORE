import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

const WishlistProvider = ({children})=>{
    const [item, setItem] = useState([]);

    useEffect(() => {
        let existingWishlistItem = localStorage.getItem("wishlist");
        if (existingWishlistItem) setItem(JSON.parse(existingWishlistItem));
      }, []);

    return <>

    <WishlistContext.Provider value={[item, setItem]}>
        {children}
    </WishlistContext.Provider>
    
    </>
};

// custom hook
const useWishlist = () => useContext(WishlistContext);

export { useWishlist, WishlistProvider };