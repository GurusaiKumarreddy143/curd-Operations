import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Link ,useNavigate} from "react-router-dom";

const StudentTable = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/products")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
         setProducts(data);
      })
      .catch((err) => {
        console.log("Error: ", err.message);
      });
  }, []);


  const handleDelete =(id)=>{
   fetch(`http://localhost:8000/products/${id}`,{
    method:"DELETE"
   })
   .then((res)=>{
    if(!res.ok){
      throw new Error("failed ti delete")
    }
    return res.json()
   })
   .then((data)=>{
    console.log("delete",data);

   })
   .catch((err)=>{
    console.log("error deleting :", err.message);
   })

   const deleteItem = products.filter((eachItem)=>{
   return  eachItem.id !== id
   })

   setProducts(deleteItem)


  }
  



  return (
    <Box className="container">
      <h2>products records</h2>
      <Box className="Table-container">
        <Link to="/student/create" className="btn btn-add">
          Add new Product
        </Link>
      </Box>
      <Box sx={{ marginTop: "40px" }}>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>category</th>
              <th>price</th>
              <th>stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.productName}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                  <td>{item.stock}</td>
                <td>
                  <button  className="btn btn-primary" onClick={() => navigate(`/student/edit/${item.id}`)}
>
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={()=>handleDelete(item.id)}>
                    Delete
                  </button>
                  <button className="btn btn-info" onClick={() => navigate(`/student/view/${item.id}`)}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  );
};

export default StudentTable;
