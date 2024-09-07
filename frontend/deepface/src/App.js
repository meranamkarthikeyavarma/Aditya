import React from 'react';
// import CameraFeed from './components/camerafeed';
// import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import FaceSignUp from './components/facesignup';


function App() {
    return (
        <div>
            <ChakraProvider>
           <FaceSignUp/>
            </ChakraProvider>
        
        </div>
    );
}

export default App;
