import React from "react";
import transition from "../transition";
import ReactPlayer from "react-player";
import {useRef, useState, useEffect} from 'react';
import {  useToast ,FormLabel,RadioGroup,HStack,Radio,FormHelperText , ButtonGroup,    Button, Heading, Text,  Input,  FormControl,  FormErrorMessage,Container, Box, SimpleGrid } from "@chakra-ui/react";
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

    let url = props.url;
    //let file;
  
    
    return (
        <>
        
        
          
          <ButtonGroup variant="outline" spacing="6">
            
            <a href="/"><Button>Back to Home</Button></a>
          </ButtonGroup>
    
        
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