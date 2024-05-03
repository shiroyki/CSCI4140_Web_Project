import React from "react";
import transition from "../transition";
import { Container, Box, SimpleGrid } from "@chakra-ui/react";
import Video from "../json/output.json"
import HoverVideoPlayer from 'react-hover-video-player';
import Config from "../json/config.json";


import { useEffect, useState } from 'react';
const Home = () => {
    
    let dir = "";
    if (Config && Config.length > 0) {
      const config = Config[0];
      if (config.directory !== "") {
        dir = config.directory;
      } else {
        dir = config.default;
        console.log("dir:",dir)
      }
    }

    const handleHover = (isHovering, videoRef) => {
        if (!isHovering) {
          videoRef.current.currentTime = 0;
        }
      };
    return (
      <>
        <Container className="home" maxW="container.xl" centerContent>
          <SimpleGrid columns={3} minChildWidth="120px" spacingX="40px" spacingY="20px">
            {Video &&
              Video.map(video => {
                let videoPath = dir + video.filename;
                let subtitlePath = dir + video.subtitle;
                console.log("videoPath:", videoPath);
                return (
                  <div className="content" key={video.id}>
                    <Box bg="gray" height="90px">
                     
                      <br /><a href={`/video-preview?url=${encodeURIComponent(videoPath)}&&subtitle=${encodeURIComponent(subtitlePath)}`}>
                      <HoverVideoPlayer
                        videoSrc={videoPath}
                        hoverOverlay={
                          <div className="hover-overlay">
                            <h1 >{video.filename}</h1>
                            
                          </div>
                        }
                      /></a>
                    </Box>
                  </div>
                );
              })}
          </SimpleGrid>
        </Container>
      </>
    );
  };

  export default transition(Home);