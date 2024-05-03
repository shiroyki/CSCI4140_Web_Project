import React from "react";
import transition from "../transition";
import { Container, Box, FormControl, FormLabel,RadioGroup,HStack,Radio,FormHelperText , ButtonGroup, Button} from "@chakra-ui/react";
const Confirm = ( ) => {
    return (
        <>
         <Container className="confirm" maxW="container.xl" centerContent>
            <Box d="flex" flexDirection="row" alignContent="space-evenly" w="100%">
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
                
            </Box>
          </Container>
          
        </>

    );
}

export default transition(Confirm);