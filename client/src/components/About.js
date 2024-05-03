import React from "react";
import transition from "../transition";
import { Container, Box, SimpleGrid , Grid, GridItem} from "@chakra-ui/react";
const About = ( ) => {
    return (
        <>
         <Container className="about" maxW="container.xl" centerContent>
            <Box d="flex" flexDirection="row" alignContent="space-evenly" w="100%">
                <h1>About</h1>
            
                
            </Box>
          </Container>
          
        </>

    );
}

export default transition(About);