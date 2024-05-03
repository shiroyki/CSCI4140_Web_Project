import React from "react";
import transition from "../transition";
import ReactPlayer from "react-player";
import {useRef, useState, useEffect} from 'react';
import { Container, Box, SimpleGrid } from "@chakra-ui/react";
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
            <button onClick={() => setResume(!resume)}>Play</button>
            <span>{subtitlePath}</span>
          </div> </Container>
        </>

    );
}

export default transition(VideoPreview);