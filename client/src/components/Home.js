import React  from "react";
import transition from "../transition";
import { Container, Box, SimpleGrid, Button , Menu, MenuButton, MenuItem, MenuList, useToast,
    Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Select,
  Text,


} from "@chakra-ui/react";
import Video from "../json/output.json"
import HoverVideoPlayer from 'react-hover-video-player';
import Config from "../json/config.json";
import axios_service from '../axios/service.js';
import { motion } from "framer-motion";

import { useEffect, useState } from 'react';
const languageOptions = [
    { label: 'Afrikaans', value: 'af' },
  { label: 'Amharic', value: 'am' },
  { label: 'Arabic', value: 'ar' },
  { label: 'Assamese', value: 'as' },
  { label: 'Azerbaijani', value: 'az' },
  { label: 'Bashkir', value: 'ba' },
  { label: 'Belarusian', value: 'be' },
  { label: 'Bulgarian', value: 'bg' },
  { label: 'Bengali', value: 'bn' },
  { label: 'Tibetan', value: 'bo' },
  { label: 'Breton', value: 'br' },
  { label: 'Bosnian', value: 'bs' },
  { label: 'Catalan', value: 'ca' },
  { label: 'Czech', value: 'cs' },
  { label: 'Welsh', value: 'cy' },
  { label: 'Danish', value: 'da' },
  { label: 'German', value: 'de' },
  { label: 'Greek', value: 'el' },
  { label: 'English', value: 'en' },
  { label: 'Spanish', value: 'es' },
  { label: 'Estonian', value: 'et' },
  { label: 'Basque', value: 'eu' },
  { label: 'Persian', value: 'fa' },
  { label: 'Finnish', value: 'fi' },
  { label: 'Faroese', value: 'fo' },
  { label: 'French', value: 'fr' },
  { label: 'Galician', value: 'gl' },
  { label: 'Gujarati', value: 'gu' },
  { label: 'Hausa', value: 'ha' },
  { label: 'Hawaiian', value: 'haw' },
  { label: 'Hebrew', value: 'he' },
  { label: 'Hindi', value: 'hi' },
  { label: 'Croatian', value: 'hr' },
  { label: 'Haitian Creole', value: 'ht' },
  { label: 'Hungarian', value: 'hu' },
  { label: 'Armenian', value: 'hy' },
  { label: 'Indonesian', value: 'id' },
  { label: 'Icelandic', value: 'is' },
  { label: 'Italian', value: 'it' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Javanese', value: 'jw' },
  { label: 'Georgian', value: 'ka' },
  { label: 'Kazakh', value: 'kk' },
  { label: 'Khmer', value: 'km' },
  { label: 'Kannada', value: 'kn' },
  { label: 'Korean', value: 'ko' },
  { label: 'Latin', value: 'la' },
  { label: 'Luxembourgish', value: 'lb' },
  { label: 'Lingala', value: 'ln' },
  { label: 'Lao', value: 'lo' },
  { label: 'Lithuanian', value: 'lt' },
  { label: 'Latvian', value: 'lv' },
  { label: 'Malagasy', value: 'mg' },
  { label: 'Maori', value: 'mi' },
  { label: 'Macedonian', value: 'mk' },
  { label: 'Malayalam', value: 'ml' },
  { label: 'Mongolian', value: 'mn' },
  { label: 'Marathi', value: 'mr' },
  { label: 'Malay', value: 'ms' },
  { label: 'Maltese', value: 'mt' },
  { label: 'Burmese', value: 'my' },
  { label: 'Nepali', value: 'ne' },
  { label: 'Dutch', value: 'nl' },
  { label: 'Norwegian Nynorsk', value: 'nn' },
  { label: 'Norwegian', value: 'no' },
  { label: 'Occitan', value: 'oc' },
  { label: 'Punjabi', value: 'pa' },
  { label: 'Polish', value: 'pl' },
  { label: 'Pashto', value: 'ps' },
  { label: 'Portuguese', value: 'pt' },
  { label: 'Romanian', value: 'ro' },
  { label: 'Russian', value: 'ru' },
  { label: 'Sanskrit', value: 'sa' },
  { label: 'Sindhi', value: 'sd' },
  { label: 'Slovenian', value: 'si' },
  { label: 'Slovak', value: 'sk' },
  { label: 'Slovenian', value: 'sl' },
  { label: 'Shona', value: 'sn' },
  { label: 'Somali', value: 'so' },
  { label: 'Albanian', value: 'sq' },
  { label: 'Serbian', value: 'sr' },
  { label: 'Sundanese', value: 'su' },
  { label: 'Swedish', value: 'sv' },
  { label: 'Swahili', value: 'sw' },
  { label: 'Tamil', value: 'ta' },
  { label: 'Telugu', value: 'te' },
  { label: 'Tajik', value: 'tg' },
  { label: 'Thai', value: 'th' },
  { label: 'Turkmen', value: 'tk' },
  { label: 'Tagalog', value: 'tl' },
  { label: 'Turkish', value: 'tr' },
  { label: 'Tatar', value: 'tt' },
  { label: 'Ukrainian', value: 'uk' },
  { label: 'Urdu', value: 'ur' },
  { label: 'Uzbek', value: 'uz' },
  { label: 'Vietnamese', value: 'vi' },
  { label: 'Yiddish', value: 'yi' },
  { label: 'Yoruba', value: 'yo' },
  { label: 'Chinese', value: 'zh' }
  ];
  function SubtitleLanguageModal({ isOpen, onClose, onSubmit }) {
    const [selectedLanguage, setSelectedLanguage] = useState('');
  
    const handleLanguageChange = (event) => {
      setSelectedLanguage(event.target.value);
    };
  
    const handleSubmit = () => {
        onSubmit(selectedLanguage);
      };
  
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Subtitle Language Options </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Select a language: </FormLabel>
              <Select value={selectedLanguage} onChange={handleLanguageChange}>
                {languageOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </FormControl>
            <Text fontSize="sm" mt={2} color="gray.500">
            Remark: Selecting a language will generate subtitles with the chosen language. Please choose the correct language for accurate subtitle generation. Default: auto detect language.
          </Text>
          </ModalBody>
          <Button onClick={handleSubmit}>Submit</Button>
        </ModalContent>
      </Modal>
    );
  }

const VideoGrid = (props) => {
    const [videoData, setVideoData] = useState([]);
    const toast = useToast();
    const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedFilename, setSelectedFilename] = useState('');
  useEffect(() => {
    fetchVideoData();
  }, []);

  const fetchVideoData = async () => {
    try {
      const response = await axios_service.fetch_video();
      setVideoData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = async (selectedLanguage) => {
    console.log("selected videoPath when submit:", selectedFilename);
    console.log("selected language when submit:", selectedLanguage);
    try {
      const response = await axios_service.Subtitle_GeneratePlus({
        videoName: selectedFilename,
        language: selectedLanguage,
      });
      if (response.status === 200) {
        toast({
          title: 'Success',
          description: `Subtitle Generated (with language selected) successfully for ${selectedFilename}`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      //console.log(error)

      toast({
        title: 'Error',
        description: `Failed to Generate Subtitle (with language selected) for ${selectedFilename}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  const handleSubtitleGenerate =  async (videoPath) => {
    
    try {
        const response =  await axios_service.Subtitle_Generate({videoName: videoPath}); 
        if(response.status === 200) {
            toast({
                title: 'Success',
                description: `Subtitle Generated successfully for ${videoPath}`,
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        }

    } catch(error) {
        //console.log(error)
        toast({
            title: 'Error',
            description: `Failed to Generate Subtitle for ${videoPath}`,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });

    }
  };
  const handleSubtitleEmbed =  async (videoPath) => {
    
    try {
        const response =  await axios_service.Subtitle_Embed({videoName: videoPath}); 
        if(response.status === 200) {
            toast({
                title: 'Success',
                description: `Subtitle Generated successfully for ${videoPath}`,
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        }

    } catch(error) {
        //console.log(error)
        toast({
            title: 'Error',
            description: `Failed to Generate Subtitle for ${videoPath}`,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });

    }
  };
  

  const handleSubtitleLanguage = (filename) => {
    console.log("filename for opened modal:", filename);
    setSelectedFilename(filename);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitModal = async (language) => {
    setIsModalOpen(false);
    await handleSubmit(language);
    
  };
  return (
    <>
      
      <SimpleGrid minChildWidth="120px" spacingX="40px" spacingY="20px">
        {videoData.map((video, index) => {
          let videoPath =  'http://localhost:8088/videos/' +  video.filename;
          let subtitlePath =  video.subtitle;
          console.log("videoPath:", videoPath);
          return (
            <div key={video.id}>
            <div>
              <Menu>
                <MenuButton as={Button} variant="outline">
                  -
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => handleSubtitleGenerate(video.filename)}>
                    Quick Subtitle Generate 
                  </MenuItem>
                  <MenuItem onClick={() => handleSubtitleEmbed(video.filename)}>
                    Quick Subtitle Embed 
                  </MenuItem>
                  <MenuItem onClick={() => handleSubtitleLanguage(video.filename)}>
                    Subtitle Generate with Language Options
                  </MenuItem>
                  <SubtitleLanguageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitModal}
      />
                </MenuList>
              </Menu>
            </div><motion.div
                initial={{ y: "400%" }}
                animate={{ y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  duration: 2.5,
                  delay: 0.3
                  
                 
                }}
        >
            <div>
              <VideoHover
                videoPath={videoPath}
                videoFilename={video.filename}
                subtitlePath={subtitlePath}
              />
            </div></motion.div>
            
          </div>
          );
        })}
      </SimpleGrid>
    </>
  );
  };
  
  const VideoHover = (props) => {
    const { videoPath, videoFilename,subtitlePath } = props;
    //hoverOverlay={
                 // <div className="hover-overlay">
                  //  <h1>{videoFilename}</h1>
                //  </div>
               // }
    return (
      <>
        <div className="content" key={props.videoId}>
          <h3>{videoFilename}</h3>
          <Box bg="black" height="90px">
            <br />
            <a href={`/video-preview-only?url=${encodeURIComponent(videoPath)}&&subtitle=${encodeURIComponent(subtitlePath)}`}>
              <HoverVideoPlayer
                videoSrc={videoPath}
                
              />
            </a>
          </Box>
        </div>
      </>
    );
  };

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
      <motion.div
          initial={{ opacity: 0}}
          animate={{ opacity: 1}}
          transition={{ duration: 1.7 }}
          style={{ backgroundColor: "white"}}
        >
        <Container className="home" maxW="container.xl" centerContent>
        
          
            <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 3,
            
           
          }}
        ><Text as="h1" fontSize="3xl" fontWeight="bold" padding="20px">
            Homepage
          </Text></motion.div>
            <VideoGrid dir={dir}/>
        </Container></motion.div>
      </>
    );
  };

  export default transition(Home);