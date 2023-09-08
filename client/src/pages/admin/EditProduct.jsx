import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {HiOutlineArrowNarrowLeft} from 'react-icons/hi';

const EditProduct = () => {

    const params = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState('');

    // GET SINGLE PRODUCT 
    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/api/v1/product/get-product/${params.slug}`);
            setName(data.product.name);
            setId(data.product._id);
            setDescription(data.product.description);
            setPrice(data.product.price);
            setPrice(data.product.price);
            setQuantity(data.product.quantity);
            setCategory(data.product.category);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getSingleProduct();
        //eslint-disable-next-line
    }, []);


    // ================ EDIT PRODUCT ===========
    const editProduct = async (e) => {
        e.preventDefault();
        try {
          const productData = new FormData();
          productData.append("name", name);
          productData.append("description", description);
          productData.append("price", price);
          productData.append("quantity", quantity);
          photo && productData.append("photo", photo);
          productData.append("category", category);
          const { data } = axios.put(
            `http://localhost:8080/api/v1/product/update-product/${id}`,
            productData
          );
          if (data?.success) {
            alert(data?.message);
          } else {
            alert("Product Updated Successfully");
            navigate("/dashboard/admin/products");
          }
        } catch (error) {
          console.log(error);
          alert("something went wrong");
        }
      };



    return <>
        <section className="add-product-container">
            <form method="post" onSubmit={editProduct}>
                <HiOutlineArrowNarrowLeft className="back-icon" onClick={()=>navigate('/dashboard/admin/products')}/>

                <h2>Edit Product</h2>

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
                        <input type="file" id="image" onChange={(e) => setPhoto(e.target.files[0])} accept='image/*' required />
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


                <button >Edit Product</button>

            </form>
        </section>
    </>
};

export default EditProduct;