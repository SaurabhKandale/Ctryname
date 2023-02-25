import React, {useEffect, useState } from 'react'
import './Modal.css'
import { CloseIcon } from '@chakra-ui/icons'
import axios from 'axios'
import { Box, Spinner } from '@chakra-ui/react'

const Modal = (props) => {
    const [data,setData]=useState([]);

    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/name/${props.name}`)
            .then((res) => {
                setData(res.data[0]);
            })
            .catch((err) => console.log(err));
    }, [])

    if(data.length===0){
        return (
            <Box className="modal" >
                <div className="modal_content" style={{"minHeight":"55vh","justifyContent":"center"}}>
                    <Spinner color='red' size='xl' />
                </div>
            </Box>
        )
    }
    else{
        return (
            <Box className="modal" >
                <div className="modal_content">
                    <img src={data?.flags?.png} alt='' className="modal_image" />
                    <div className="modal_text">
                        <span className="fa fa-times" onClick={() => { props.setTrue(false) }}><CloseIcon color="black" /></span>
                        <h2>{props.name}</h2>
                        <p>Official Name : {data?.name?.official}</p>
                        <p>Capital : {data?.capital}</p>
                        <p>Region : {data?.region}</p>
                        <p>Population : {data?.population}</p>
                    </div>
                </div>
            </Box>
        )
    }
}

export default Modal;