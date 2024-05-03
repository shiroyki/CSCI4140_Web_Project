import logo from './logo.svg';
import './App.css';
import { Route, Router, Routes, useLocation} from "react-router-dom"
import NavBar from "./components/NavBar"
import Home from "./components/Home"
import About from "./components/About"
import VideoPreview from "./components/VideoPreview"
import Upload from "./components/Upload"
import Config from "./components/Config"
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
      <Route path="/config" element={<Config/>}/>


      </Routes>

     
     </AnimatePresence>
   
      
    </>
  );
}

export default App;
