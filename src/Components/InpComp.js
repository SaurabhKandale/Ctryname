import { Input, Button, Container } from '@chakra-ui/react'
import axios from 'axios';
import { useEffect, useState } from "react";
import '../App.css';
import Modal from './Modal.js';

const InpComp = () => {
    const [isTrue,setTrue]=useState(false);
    const [value, setValue] = useState("");
    const [data, setData] = useState([]);

    const onChange = (event) => {
        setValue(event.target.value);
    };

    async function callApi() {
        axios.get("https://restcountries.com/v3.1/all")
        .then((response)=>{
            setData(response.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    useEffect(() => {
        callApi();
    }, []);

    return (
        <Container   className='input'>
            <Container align='center' display="block" width="">
                <Container display="flex" flexDirection={{base:"column", md:"row"}} alignItems="center" justifyContent="space-around" py={8}>
                    <Input border='2px' borderColor='black' placeholder='Enter Country Name' size='md' width={{base:200, sm:300}} m="12px" value={value} onChange={onChange} focusBorderColor="black" _hover="blackAlpha" />
                    <Button colorScheme='blackAlpha' m={{base:"1em", md:"0"}} onClick={() => {setTrue(true);}}>View Details</Button>
                </Container>
            </Container>
            {(data.length===0)?<></>:
            (
                <div className="dropdown">
                    {data
                        .filter((item) => {
                            const searchTerm = value?.toLowerCase();
                            const fullName = item.name.common?.toLowerCase();

                            return (
                                searchTerm &&
                                fullName.startsWith(searchTerm) &&
                                fullName !== searchTerm
                            );
                        })
                        .slice(0, 8)
                        .map((item) => (
                            <div
                                onClick={() => {setTrue(true);setValue(item.name.common)}}
                                className="dropdown-row"
                                key={item.name.common}
                            >
                                {item.name.common}
                            </div>
                        ))}
                </div>
            )}

            {isTrue && <Modal name={value} setTrue={setTrue} />}
        </Container>
    )
}

export default InpComp;