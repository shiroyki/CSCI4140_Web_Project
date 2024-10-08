import logo from './logo.svg';
import './App.css';
import { Route, Router, Routes, useLocation} from "react-router-dom"
import NavBar from "./components/NavBar"
import Home from "./components/Home"
import About from "./components/About"
import VideoPreview from "./components/VideoPreview"
import VideoPreviewOnly from "./components/VideoPreviewOnly"
import Upload from "./components/Upload"
import Config from "./components/Config"
import EmbedVideoPage from "./components/EmbedVideoPage"
import Confirm from "./components/Confirm"
import { AnimatePresence } from 'framer-motion';
import { Container} from "@chakra-ui/react";
function App() {
  const location = useLocation()
  return (
    <>
    
    <NavBar/>
     <AnimatePresence mode='wait'>
     
     <Routes location={location} key={location.pathname}>
      <Route index element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/upload" element={<Upload/>}/>
      <Route path="/video-preview" element={<VideoPreview/>}/>
      <Route path="/video-preview-only" element={<VideoPreviewOnly/>}/>
      <Route path="/config" element={<Config/>}/>
      <Route path="/embed-review" element={<EmbedVideoPage/>}/>
      <Route path="/confirm" element={<Confirm/>}/>


      </Routes>

     
     </AnimatePresence>
   
      
    </>
  );
}

export default App;
