import React from "react";
import transition from "../transition";
import ReactPlayer from "react-player";
import {useRef, useState, useEffect} from 'react';
import {  useToast ,FormLabel,RadioGroup,HStack,Radio,FormHelperText ,Spinner, ButtonGroup,    Button, Heading, Text,  Input,  FormControl,  FormErrorMessage,Container, Box, SimpleGrid } from "@chakra-ui/react";
import axios_service from '../axios/service.js';
import { useNavigate } from 'react-router-dom';
import {motion} from "framer-motion"
const VideoPlayer = () => {
    return (
        <>

        </>
    )
}



const LanguageOption = (props) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();
    let url = props.url;
    //let file;
    console.log("url to be saved:", url)
    const saveVideo = async () => {
        try {
          if(url != "") {
            setLoading(true);
            const response = await axios_service.save_video({ urlReq: url });console.log('Status code:', response.status); 
            if(response.status!= 200) {
                setLoading(true);
            }
            if(response.status== 200){
                console.log('Video processed successfully!');setLoading(false); 
                toast({
                    title: 'Success',
                    description: 'Video processed successfully',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                  });
                 
                navigate('/');
            }
            else {
                setLoading(false); // Set loading state to false in case of non-200 response
              }
            
    
            
          }
        
          
          
        } catch (error) {
          console.error('Error saving video:', error);setLoading(false);
        }
      };
    return (
        <>
        
        <div className="form">
          <h1>Confirm</h1>
          <FormControl as="fieldset">
            <FormLabel as="legend">Save File from URL</FormLabel>
            
            
          </FormControl>
          {loading ? (
  <Spinner size="xl" />
) : (
    <ButtonGroup variant="outline" spacing="6">
    <Button colorScheme="blue" onClick={saveVideo}>Save</Button>
    <a href="/"><Button>Back to Home</Button></a>
  </ButtonGroup>
)}
          
        </div>
      
        
        </>
    )
}

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
   // const subtitleLoc = 'http://localhost:8088/subtitle/' + subtitle;
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
    const subtitleLoc = subtitlePath ? `http://localhost:8088/subtitle/${subtitlePath}` : false;

  const config1 = {
    file: {
      attributes: {
        crossOrigin: 'anonymous',
      },
      tracks: [{ kind: 'subtitles', src: subtitleLoc }],
    },
  };

  const config2 = {
    file: {
      attributes: {
        crossOrigin: 'anonymous',
      },
      tracks: [],
    },
  };

  const playerConfig = subtitleLoc ? config1 : config2;
    return (
        <>
        
        <Container className="home"  maxW="container.xl" centerContent> <motion.div
          initial={{ opacity: 0}}
          animate={{ opacity: 1}}
          transition={{ duration: 2 }}
          style={{ backgroundColor: "white"}}
        >
          <h1>VideoPreview</h1>
          <div>
            <ReactPlayer
            config={{
                playerConfig
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
          <LanguageOption url={videoUrl}/></motion.div>
          </Container>
        </>

    );
}

export default transition(VideoPreview);