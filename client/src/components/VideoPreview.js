import React from "react";
import transition from "../transition";
import ReactPlayer from "react-player";
import {useRef, useState, useEffect} from 'react';
import {  FormLabel,RadioGroup,HStack,Radio,FormHelperText , ButtonGroup,    Button, Heading, Text,  Input,  FormControl,  FormErrorMessage,Container, Box, SimpleGrid } from "@chakra-ui/react";
const VideoPreview = ( ) => {
    const [resume, setResume] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');
    const [subtitlePath, setSubtitlePath] = useState('')
    const [trackLang, setTrackLang] = useState()
    const player = useRef()
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
    const url = urlParams.get('url');
    const path = urlParams.get('path');
    const subtitle = urlParams.get('subtitle');
    if (url) {
      setVideoUrl(url);
    } 
    if(path) {
        setVideoUrl(path);
    }
    if(subtitle) {
        setSubtitlePath(subtitle);
    }

    })
    return (
        <><Container className="home"  maxW="container.xl" centerContent> 
          <h1>VideoPreview</h1>
          <div>
            <ReactPlayer
            config={{
                file: {
                  attributes: {
                    crossOrigin: 'anonymous',
                  },
                  //tracks: {kind: 'subtitles', src:''}
                },
              }}
              controls
              muted
              loop
              url={videoUrl}
              playing={resume}
              useRef= {player}
              >

            </ReactPlayer>

            <Button onClick={() => setResume(!resume)}>Play</Button>


            <span>{subtitlePath}</span>

          </div> 
          <div className="form">
          <h1>Confirm</h1>
                <FormControl as='fieldset'>
  <FormLabel as='legend'>Generate Subtitle</FormLabel>
  <RadioGroup defaultValue='en'>
    <HStack spacing='24px'>
      <Radio value='fr'>France</Radio>
      <Radio value='chin'>Chinese</Radio>
      <Radio value='en'>English</Radio>
      <Radio value='jp'>Japanese</Radio>
    </HStack>
  </RadioGroup>
  <FormHelperText>Select the desired language for subtitle generation.</FormHelperText>
</FormControl>
<ButtonGroup variant='outline' spacing='6'>
  <Button colorScheme='blue'>Proceed</Button>
 <a href="/"><Button>Back to Home</Button></a>
</ButtonGroup>
            
            </div></Container>
        </>

    );
}

export default transition(VideoPreview);