import React , { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import axios_service from '../axios/service.js';

const NavBar = ( ) => {
    const [processingFile, setProcessingFile] = useState([]);
    //Subtitle Generation Status
    // useEffect(() => {
    //     const checkProcessingFileStatus = async () => {
    //       try {
    //         const response = await axios_service.getProgress();
    //         const data = await response.json();
    //         setProcessingFile(data.file);
    //       } catch (error) {
    //         console.error("Error checking processing file status:", error);
    //       }
    //     };
    
    //     const interval = setInterval(checkProcessingFileStatus, 2000);
    
    //     return () => {
    //       clearInterval(interval); 
    //     };
    //   }, []);




    return (
        <>
        <div className="nav">
            <div className="nav-links">
                <div className="nav-item">
                    <Link className="nav-link" to="/">
                        Home

                    </Link>

                </div>
                <div className="nav-item">
                    <Link className="nav-link" to="/about">
                        About

                    </Link>

                </div>
                <div className="nav-item">
                    <Link className="nav-link" to="/upload">
                        Upload

                    </Link>

                </div>
                <div className="nav-item">
                    <Link className="nav-link" to="/embed-review">
                        Embedded Videos

                    </Link>

                </div>
            </div>
            {processingFile && (
          <div className="status-bar">
            <Spinner size="sm" color="blue.500" />
            <span>{processingFile}</span>
          </div>
        )}
        </div>
          
        </>

    );
}

export default NavBar;