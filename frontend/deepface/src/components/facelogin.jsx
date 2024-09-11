import React, { useEffect, useRef, useState } from 'react';
import { Heading, Button, Stack } from '@chakra-ui/react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Alert,
  AlertIcon,
  
} from '@chakra-ui/react'


const api = 'http://localhost:5000';

const CameraFeed = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [res, setRes] = useState('');
  const [showalert, setShowalert] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    // Request access to the camera
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (video) {
          video.srcObject = stream;

          // Ensure play is called after the video metadata is loaded
          video.onloadedmetadata = () => {
            video.play().catch(err => console.error("Error playing the video: ", err));
          };
        }
      })
      .catch(err => {
        console.error("Error accessing the camera: ", err);
      });

    return () => {
      if (video && video.srcObject) {
        video.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const blobToServer = async (blob) => {
    const formData = new FormData();
    formData.append('image', blob);
    console.log('Sending image to server...');
    try {
      const response = await axios.post(`${api}/verify`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Image sent successfully');
      // document.getElementById('studentname').innerText = response.data.message;
      setRes(response.data.message)
      setShowalert(true)

      setTimeout(() => {
          setShowalert(false)
      }, 3000);


      
    } catch (error) {
      console.error('Error sending image:', error);
    }
  };

  const capture = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (video && canvas && context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(blob => {
        if (blob) {
          blobToServer(blob);
        }
      }, 'image/png');
    }
  };

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
      {/* Top Right Sign Up Button */}
      <Heading
        as="h1"
        size="xl"
        sx={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'radial-gradient(circle, #ff6f61, #d85a9b, #6a11cb, #d64f4f)',
          backgroundSize: '400% 400%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'gradientBackground 10s ease infinite',
        }}
      >
        AST ATTENDENCE
      </Heading>
      <Button 
      colorScheme="teal" 
      variant="solid" 
      style={{ position: 'absolute', top: '20px', right: '20px' }}
    >
      <Link to="/signup" style={{ textDecoration: 'none', color: 'inherit' }}>
        Sign Up
      </Link>
    </Button>

      

      <div style={{ marginBottom: '20px' }}>
        <video ref={videoRef} style={{ width: '100%', maxWidth: '600px', border: '1px solid #ccc', borderRadius: '8px' }} autoPlay />
      </div>

      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <Stack direction='row' spacing={4} align='center'>
        <Button colorScheme='teal' variant='solid' onClick={capture} style={{ width: '600px' }}>
          Attend
        </Button>
      </Stack>
      <div style={{ 
    position: 'absolute', 
    top: '20px', 
    right: '15px', 
    width: '600px' 
  }}>
    
      {showalert && (
        <Alert status='success' variant='solid' style={{ marginTop: '20px', width: '500px' }}>
          <AlertIcon />
          {res}
        </Alert>
      )}

      
      </div>
    </div>
  );
};

export default CameraFeed;
