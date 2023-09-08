import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdOutlineDelete } from 'react-icons/md';
import { LiaEditSolid } from 'react-icons/lia';
import { AiOutlineShopping } from "react-icons/ai";
import AdminHeader from "../../components/AdminHeader";

const Products = () => {

    const [products, setProducts] = useState([]);

    // GET ALL PRODUCTS
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get("http://localhost:8080/api/v1/product/get-product");
            setProducts(data.products);
        } catch (error) {
            console.log(error);
            alert("Someething Went Wrong");
        }
    };

    //lifecycle method
    useEffect(() => {
        getAllProducts();
    }, []);


    // DELETE PRODUCT 
    const deleteProduct = async (id) => {
        const { data } = await axios.delete(`http://localhost:8080/api/v1/product/delete-product/${id}`);
        if (data.success) {
            alert("Product deleted successfully!");
        }
        else {
            alert("Something went wrong");
        }
    }

    const navigate = useNavigate();

    return <>
        <AdminHeader />
        <section id="admin_products">
            <button onClick={() => navigate("/dashboard/admin/add-product")}>Add Product <AiOutlineShopping className="add-product-icon" /></button>
            <table className="admin_products_table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((p) => (
                            <tr key={p._id}>
                                <td data-aria-label="Image"> <img src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`} alt={p.name} /></td>
                                <td data-aria-label="Name">{p.name}</td>
                                <td data-aria-label="Price">₹ {p.price}</td>
                                <td data-aria-label="Category">{p.category}</td>
                                <td data-aria-label="Quantity">{p.quantity}</td>
                                <td data-aria-label="Actions">
                                    <Link to={`/dashboard/admin/edit-product/${p.slug}`}><LiaEditSolid className="edit-icon" /></Link>
                                    <MdOutlineDelete className="del-icon" onClick={() => deleteProduct(p._id)} />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </section>
    </>
};

export default Products;