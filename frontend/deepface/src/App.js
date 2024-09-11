import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import FaceSignUp from './components/facesignup';
import CameraFeed from './components/facelogin';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './components/App.css'





function App() {
    return (
        <div>
            <ChakraProvider>
                <BrowserRouter>
                <Routes>
                    <Route path = '/' element = {<CameraFeed/>} />
                    <Route path = '/signup' element = {<FaceSignUp/>} />
                </Routes>
                </BrowserRouter>
            </ChakraProvider>
        
        </div>
    );
}

export default App;
