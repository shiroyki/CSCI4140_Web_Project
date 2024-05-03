import React from "react";
import transition from "../transition";
import {  FormLabel,RadioGroup,HStack,Radio,FormHelperText , ButtonGroup,  Container, Box, Button, Heading, Text,  Input,  FormControl,  FormErrorMessage} from '@chakra-ui/react';
import {useRef, useState, useEffect} from 'react'

const Upload = ( ) => {

    const [file, setFile] = useState(null);
    const [fileError, setFileError] = useState('');
    const handleURLSubmit = () => {
        if (!file) {
          setFileError('Please enter a URL');
          return;
        }
    
        window.location.href = `/video-preview?url=${encodeURIComponent(file)}`;
      };
    return (
        <><Container className="home" maxW="container.xl" centerContent>
            <Box className="App" textAlign="center" p={5}>
                <h1>Upload</h1>
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
          </Box>

          </Container>
        </>

    );
}

export default transition(Upload);