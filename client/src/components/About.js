import React from "react";
import transition from "../transition";
import { Container, Box,Text,Link, SimpleGrid , Grid, GridItem} from "@chakra-ui/react";
import { motion } from "framer-motion";

const About = ( ) => {
    const email1 = '1155157022@link.cuhk.edu.hk'
    const email2 = 'yikki1125@gmail.com'
    return (
        <><motion.div
          initial={{ opacity: 0}}
          animate={{ opacity: 1}}
          transition={{ duration: 1.6 }}
          style={{ backgroundColor: "white"}}
        >
         <Container className="about" maxW="container.xl" centerContent>
         
         <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 3,
            ease: "easeOut"
          }}
        >
          <Text as="h1" fontSize="3xl" fontWeight="bold" padding="20px">
            About page
          </Text>
        </motion.div>
            
                
        <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  duration: 6,
                  ease: "easeOut"
                }}
        ><Box  w="75vw" h="50%" display="flex" alignItems="center" justifyContent="center"  flexDirection="column" textAlign="left" margin="auto" bg="white" boxShadow="0 0 10px rgba(0, 0, 0, 0.5)" borderRadius="20px" >
          <Text fontSize="md" mb={2} paddingTop="20px">
            This Web Application is built for performing subtitle generation tasks asynchronously as a CSCI4140 Project.
          </Text>
          <Text fontSize="md" mb={2}>
            Creator: Pak Yik Ki Student ID: 1155157022
          </Text>
          <Text fontSize="md" fontWeight="bold" mt={4} mb={2}>
            Features:
          </Text>
          <Text fontSize="md" ml={4} mb={2}>
            - Quick subtitle embedding to video files.
          </Text>
          <Text fontSize="md" ml={4} mb={2}>
            - Quick subtitle generation for selected video files.
          </Text>
          <Text fontSize="md" ml={4} mb={2}>
            - Subtitle generation with language options for selected video files.
          </Text>
          <Text fontSize="md" ml={4} mb={2}>
            - Subtitle editing with real-time preview.
          </Text>
          <Text fontSize="md" ml={4} mb={2}>
            - Video preview.
          </Text>
          <Text fontSize="md" ml={4}>
            - Video saving from URL.
          </Text>
          <Text fontSize="md" fontWeight="bold" mt={4} mb={2}>
            Remarks:
          </Text>
          <Text fontSize="md" ml={4} mb={2}>
            This Web Application only supports Windows Users.
            
          </Text>
          <Text fontSize="md" fontWeight="bold" mt={4} mb={2}>
            Contact for more information:
          </Text>
          <Text fontSize="md" ml={4} mb={2}>
            <Link href={`mailto:${email1}`} color="blue.500" textDecoration="underline">
            {email1}
            </Link>
            
            
          </Text>
          <Text fontSize="md" ml={4} mb={2} paddingBottom="20px">
            <Link href={`mailto:${email2}`} color="blue.500" textDecoration="underline">
            {email2}
            </Link>
            
            
          </Text></Box>
        </motion.div>
            
                
        
          </Container>
          </motion.div>
        </>

    );
}

export default transition(About);