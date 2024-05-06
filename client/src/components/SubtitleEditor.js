import React from "react";
import transition from "../transition";
import ReactPlayer from "react-player";
import {useRef, useState, useEffect} from 'react';




const VideoPlayer = (props) => {
    //show video from filepath retrieved from server side
    //subtitle path is also retrieved from server side, where these information are stored in json.
    //Info retrieved from server as json format
    return (
        <>
        
        </>
    )
}

const EditOption = (props) => {
    //enable user to edit subtitle while previewing video
    //Done by checking subtitle timestamp from subtitle file and send the modified text for that timestamp to backend to handle modification done on the srt file
    
    return (
        <>
        
        </>
    )
}

const ExportOption = (props) => {
    //alow user export srt file on browser (download srt file to user's desired folder location)
    return (
        <>
        
        </>
    )
}

const EmbedOption = (props) => {
    //embed video with subtitle then save to another folder
    //redirect user back to embedVideoPage for viewing results
    return (
        <>
        
        </>
    )
}



const Editor = ( ) => {
    return (
        <>
         <Container className="editor" maxW="container.xl" centerContent>
            <Box d="flex" flexDirection="row" alignContent="space-evenly" w="100%">
                <h1>Subtitle Editor</h1>
                <VideoPlayer/>
                <EditOption/>
                <EmbedOption/>

            
                
            </Box>
          </Container>
          
        </>

    );
}

export default transition(Editor);