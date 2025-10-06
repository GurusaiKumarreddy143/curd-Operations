import React, { useEffect,useState } from "react";
import {Box,Typography} from '@mui/material'

import {useParams,useNavigate} from 'react-router-dom'




const ViewDetails =()=>{
    const [productData,setProductData]= useState([])
    const navigate = useNavigate()

    const {studentid} = useParams();

    useEffect(()=>{
        fetch(`http://localhost:8000/products/${studentid}`)
        .then((res)=>res.json())
        .then((data)=>setProductData(data))

    },[])

    const handleBack =(e)=>{
        e.preventDefault();
        navigate("/")
    }
    return(


        <div className="container">
            <h2>View Details</h2>

            <card>
            <Box className="card-view"></Box>
            <Typography variant="h6">ID: {productData.id}</Typography>
            <Typography variant="h6">Name: {productData.productName}</Typography>
            <Typography variant="h6">Category: {productData.category}</Typography>
            <Typography variant="h6">Price: {productData.price}</Typography>
            <Typography variant="h6">Stock: {productData.stock}</Typography>
<Box display="flex" justifyContent="flex-end">
  <button className="btn btn-info" onClick={handleBack}>Back</button>
</Box>

            </card>
        </div>
            
        
    )
}

export default ViewDetails;