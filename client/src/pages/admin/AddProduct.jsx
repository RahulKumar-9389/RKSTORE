import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [photo, setPhoto] = useState("");

    const navigate = useNavigate();

    // ADD PRODUCT
    const addProduct = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            productData.append("photo", photo);
            productData.append("category", category);
            const { data } = axios.post(
                "http://localhost:8080/api/v1/product/create-product",
                productData
            );
            if (data?.success) {
                alert(data?.message);
            } else {
                alert("Product Created Successfully");
                navigate("/dashboard/admin/products");
            }
        } catch (error) {
            console.log(error);
            alert("something went wrong");
        }
    };

    return <>
        <section className="add-product-container">
            <form method="post" onSubmit={addProduct}>

                <h2>Add Product</h2>

                <div className="input_container">
                    <div>
                        <label htmlFor="name">Product Name</label>
                        <input type="text" id="name" required value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="category">category</label>
                        <input type="text" id="category" required value={category} onChange={(e) => setCategory(e.target.value)} />
                    </div>
                </div>

                <div className="input_container">
                    <div>
                        <label htmlFor="price">price</label>
                        <input type="number" id="price" required value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="quantity">quantity</label>
                        <input type="number" id="quantity" required value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                    </div>
                </div>

                <div className="des-container">
                    <label htmlFor="description">description</label>
                    <textarea id="description" required value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>

                <div className="input_container">
                    <div>
                        <label htmlFor="image">Image</label>
                        <input type="file" id="image"  onChange={(e) => setPhoto(e.target.files[0])} accept='image/*' required/>
                    </div>

                    <div>
                        {photo && (
                            <div>
                                <img
                                    src={URL.createObjectURL(photo)}
                                    alt="product_photo"
                                    height={"70px"}
                                />
                            </div>
                        )}
                    </div>
                </div>


                <button >add product</button>

            </form>
        </section>
    </>
};

export default AddProduct;