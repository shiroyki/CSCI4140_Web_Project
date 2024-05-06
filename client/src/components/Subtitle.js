import React from "react";
import transition from "../transition";
import { Container, Box, SimpleGrid , Grid, GridItem} from "@chakra-ui/react";

import axios_service from '../axios/service.js';


const Button = () => {
    return (
        <>

        </>
    )

}
const Subtitle = ( ) => {
    return (
        <>
         <Container className="subtitle" maxW="container.xl" centerContent>
            <Box d="flex" flexDirection="row" alignContent="space-evenly" w="100%">
                <h1>Subtitle Generation</h1>
            
                
            </Box>
          </Container>
          
        </>

    );
}

export default transition(Subtitle);