import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CreateStudent = ({ editStatus = false }) => {
  const [id, setID] = useState("");
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const navigate = useNavigate();
  const { studentid } = useParams(); // for edit mode

  // Load data if editing
  useEffect(() => {
    if (editStatus && studentid) {
      fetch(`http://localhost:8000/products/${studentid}`)
        .then((res) => res.json())
   
        .then((data) => {
                 console.log(data)
          setID(data.id);
          setProductName(data.productName);
          setCategory(data.category);
          setPrice(data.price);
          setStock(data.stock);
        })
        
        .catch((err) => console.log("Error loading student:", err));
    }
    
  }, [editStatus, studentid]);

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const studentData = { id, productName, category, price, stock };

    try {
      if (editStatus) {
        // PUT request (update)
        await fetch(`http://localhost:8000/products/${studentid}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(studentData),
        });
        alert("Updated successfully ✅");
      } else {
        // POST request (create)
        await fetch("http://localhost:8000/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(studentData),
        });
        alert("Saved successfully ✅");
      }

      navigate("/");
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  return (
    <div className="container">
      <h2>{editStatus ? "Edit Product" : "Add New Product"}</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="id">ID :</label>
        <input
          id="id"
          type="text"
          name="id"
          placeholder="Enter your ID"
          value={id}
          onChange={(e) => setID(e.target.value)}
          disabled={editStatus} // don’t allow editing ID
        />

        <label htmlFor="productName">Product Name :</label>
        <input
          id="productName"
          type="text"
          name="productName"
          placeholder="Enter your Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />

        <label htmlFor="category">Category :</label>
        <select
          id="category"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Home Appliances">Home Appliances</option>
          <option value="Fitness">Fitness</option>
          <option value="Electronics">Electronics</option>
        </select>

        <label htmlFor="price">Price :</label>
        <input
          id="price"
          type="number"
          name="price"
          placeholder="Enter your Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <label htmlFor="stock">Stock :</label>
        <input
          id="stock"
          type="number"
          name="stock"
          placeholder="Enter your Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <div style={{ marginTop: "30px", display: "flex", justifyContent: "flex-end" }}>
          <button type="button" className="btn btn-danger" onClick={() => navigate("/")}>
            Cancel
          </button>
          <button type="submit" className="btn btn-add">
            {editStatus ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateStudent;
