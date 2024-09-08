import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Box, Flex, Heading, Button, Select } from '@chakra-ui/react';
import axios from 'axios';
const api = 'https://facialrecognitionflask.onrender.com'

function FaceSignUp() {

    const [image, setImage] = useState('');
    const [redg, setRedg] = useState('');
    const [name, setName] = useState('');
    const [branch, setBranch] = useState('AIDS');
    const [year, setYear] = useState('1');

    const extractData = async() => {

        const formdata = new FormData();
        formdata.append('name', name);
        formdata.append('redg', redg);
        formdata.append('branch', branch);
        formdata.append('year', year);
        formdata.append('image', image);

      try {

      
       const response = await axios.post(`${api}/retrievedata`, formdata);
        
      //  {
      //     headers: {
      //       'Content-Type':'multipart.form-data',
      //     },
        
      //  })
       console.log(response.data);
       document.getElementById('response').innerText = JSON.stringify(response.data);
    } 
   catch (error) {
    console.error('Error submitting data:', error);

  }  


    const uploadImage = (event) => {

    setImage(event.target.files[0]);
    }
    

  return (
    <Flex
      height="100vh"
      align="center"
      justify="center"
      p={4} 
    >
      <Box width="100%" maxWidth="500px" textAlign="left">
        <Heading as="h1" size="xl" mb={8}>
          Student Registration
        </Heading>

        <FormControl isRequired mb={4}>
          <FormLabel>Regd No</FormLabel>
          <Input placeholder='Ex: 22B91A5488' onChange = {(e) => setRedg(e.target.value)} />
        </FormControl>

        <FormControl isRequired mb={4}>
          <FormLabel>Name</FormLabel>
          <Input placeholder='Ex: Mudunuri Seeta Rama Karthikeya Varma' onChange = {(e) => setName(e.target.value)}/>
        </FormControl>

        <FormControl isRequired mb={4}>
          <FormLabel>Branch</FormLabel>
          <Select onChange={(e) => setBranch(e.target.value)}>
            <option value='option1'>AIDS</option>
            <option value='option2'>AIML</option>
            <option value='option3'>CSE</option>
            <option value='option4'>CIC</option>
            <option value='option5'>CSIT</option>
            <option value='option6'>ECE</option>
            <option value='option7'>IT</option>
            <option value='option8'>EEE</option>
            <option value='option9'>MECH</option>

        </Select>
        </FormControl>

        <FormControl isRequired mb={4}>
          <FormLabel>Year</FormLabel>
          <Select onChange = {(e) => setYear(e.target.value)}>
            <option value='1st Year'>1</option>
            <option value='2nd year'>2</option>
            <option value='3rd Year'>3</option>
            <option value='4th Year'>4</option>
           
        </Select>
        </FormControl>

        <FormControl isRequired mb={4}>
          <FormLabel>Upload your Photo</FormLabel>
          <Input placeholder = 'select'
                 type = 'file'
                 accept = 'image/*'
                 onChange = {uploadImage} 
                 />
                
        </FormControl>

        <Button colorScheme='teal' 
        variant='solid'  
        mt={4} 
        display="block" 
        ml="auto"
        onClick = { extractData }>
            Submit
        </Button>
        <p id = 'response'></p>

      </Box>
    </Flex>
  );
}
}

export default FaceSignUp;
