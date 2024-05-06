import React from "react";
import transition from "../transition";
import { useToast , FormLabel,RadioGroup,HStack,Radio,FormHelperText , ButtonGroup,  Container, Box, Button, Heading, Text,  Input,  FormControl,  FormErrorMessage} from '@chakra-ui/react';
import {useRef, useState, useEffect} from 'react'
import axios_service from '../axios/service.js';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

const Upload = ( ) => {

    const [file, setFile] = useState(null);
    const [fileError, setFileError] = useState('');
    const navigate = useNavigate(); const toast = useToast();
    const handleFileUpload = async () => {
        if (!file) {
          setFileError('Please select a file');
          return;
        }
       
        const formData = new FormData();
        formData.append('file', file);
        window.location.href = 'localhost:3000/'
        try {
          const response = await axios_service.uploadFile(formData);
    
          setFile(null);
          setFileError('');
          if (response.status === 200) {
            toast({
              title: 'Success',
              description: 'File uploaded successfully',
              status: 'success',
              duration: 5000,
              isClosable: true,
            });
            navigate("/");
          }
         
        } catch (error) {
          //console.error('Error uploading file:', error);
          toast({
            title: 'Error',
            description: 'Failed to upload file',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
  
        } 
      };
    const handleURLSubmit = () => {
        if (!file) {
          setFileError('Please enter a URL');
          toast({
            title: 'Error',
            description: 'Please enter a URL',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
          return;
        }
        toast({
            title: 'Success',
            description: 'URL submitted successfully',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        window.location.href = `/video-preview?url=${encodeURIComponent(file)}`;
      };
    return (
        <>
        <motion.div
          initial={{ opacity: 0}}
          animate={{ opacity: 1}}
          transition={{ duration: 1.6 }}
          style={{ backgroundColor: "white"}}
        >
        <Container className="home" maxW="container.xl" centerContent>

        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 3,
           
          }}
        >
          <Text as="h1" fontSize="3xl" fontWeight="bold" padding="20px">
            Upload page
          </Text>
        </motion.div>
        <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  duration: 6,
                  ease: "easeOut"
                }}
        >
            <Box className="App" textAlign="center" p={5}>
                
                <Box p={5} borderWidth={1} borderRadius="md">
        
          
          <FormControl isInvalid={fileError}>
            <Text mb={3}>Enter a URL of an MP4 video:</Text>
            <Input
              placeholder="Enter URL"
              type="text"
              value={file}
              onChange={(e) => setFile(e.target.value)}
            />
            <FormErrorMessage>{fileError}</FormErrorMessage>
            
          </FormControl>
          <Button
            spacing={6}
            mt={3}
            colorScheme="blue"
            onClick={handleURLSubmit}
          >
            Submit URL
          </Button>
        </Box>
        <Text padding="20px"> OR </Text>
        <Box p={5} borderWidth={1} borderRadius="md">
            <FormControl isInvalid={fileError}>
              <Text mb={3}>Select an MP4 video file:</Text>
              <Input type="file" onChange={(e) => setFile(e.target.files[0])} />
              <FormErrorMessage>{fileError}</FormErrorMessage>
            </FormControl>
            <Button spacing={6} mt={3} colorScheme="blue" onClick={handleFileUpload}>
              Upload File
            </Button>
          </Box>
          </Box></motion.div>

          </Container></motion.div>
        </>

    );
}

export default transition(Upload);