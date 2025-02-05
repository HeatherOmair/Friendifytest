import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import React, { useState, useEffect } from 'react';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import '../CSS/Drawer.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import WindowIcon from '@mui/icons-material/Window';

export default function DrawerNav(){
    
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    };

    const theme = createTheme({
        palette: {
            mode: isDarkMode ? 'dark' : 'light',
        },
    });

    const MySwal = withReactContent(Swal);
  
    const handleLogout = async () => {
      const result = await MySwal.fire({
        title: 'Are you sure?',
        text: 'You will be logged out!',
        showCancelButton: true,
        confirmButtonText: 'Yes, log me out!',
        cancelButtonText: 'Cancel',
        reverseButtons: true,
        customClass: {
            popup: 'custom-popup',           // Custom style for the popup
            title: 'custom-title',           // Custom style for the title
            content: 'custom-content',       // Custom style for the content
            confirmButton: 'custom-confirm', // Custom style for the confirm button
            cancelButton: 'custom-cancel',   // Custom style for the cancel button
        },
      });
  
      if (result.isConfirmed) {
        // Trigger the logout action here
        // Redirect or perform the logout action as needed
        window.location.href = '/signin';
      }
    };

    const goToFeed = () => {
        window.location.href = '/feedpage'
    }

    useEffect(() => {
        // Adding the aurora gradient styles dynamically to the head of the document
        const style = document.createElement('style');
        style.innerHTML = `
          /* Define the keyframe for the aurora effect */
          @keyframes auroraGlow {
            0% {
              background-position: 0% 0%;
            }
            50% {
              background-position: 100% 100%;
            }
            100% {
              background-position: 0% 0%;
            }
          }
    
          /* Light mode aurora gradient */
          .light-mode {
            background: linear-gradient(45deg, #ffb3d9, #b3d9ff, #ffb3ff, #d0d8ff);
            background-size: 400% 400%;
            animation: auroraGlow 10s ease infinite;
          }
    
          /* Dark mode aurora gradient */
          .dark-mode {
            background: linear-gradient(45deg, #00ff00, #00b3b3, #ff007f, #8000ff);
            background-size: 400% 400%;
            animation: auroraGlow 10s ease infinite;
          }
    
          /* Fullscreen background container */
          .fullscreen-background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
          }
    
          /* Styling for the button */
          .theme-toggle-btn {
            color: white;
            margin-top: 50px;
          }
        `;
        
        // Append the created style tag to the document head
        document.head.appendChild(style);
    
        // Cleanup the injected styles when component unmounts
        return () => {
          document.head.removeChild(style);
        };
      }, [isDarkMode]); // Re-run when `isDarkMode` changes

    return (
        <>
        <ThemeProvider theme={theme}>

        <Box sx={{ flexGrow: 1 }}>
            <AppBar className='appbar'>
                <Toolbar className='toolbar'>
                    <WindowIcon sx={{cursor:'pointer'}} onClick={goToFeed}/>
                 
                    <Typography onClick={goToFeed} variant="h6" sx={{ flexGrow: 1, fontFamily:'monospace', textDecoration:'none', color:'inherit', cursor:'pointer' }}>
                        Friendify©
                    </Typography>

                    <CssBaseline />


                    <Button isDarkMode={isDarkMode} onClick={toggleTheme} color="inherit"><Brightness4Icon/></Button>

                    <Button onClick={handleLogout}>
                        <PowerSettingsNewIcon className="logoutbtn" />
                    </Button>
                    
                    <Button><img style={{width:'24px', height:'24px', borderRadius: '25px'}} src="https://www.citypng.com/public/uploads/preview/white-user-member-guest-icon-png-image-701751695037005zdurfaim0y.png" alt="user" /></Button>
                    
                </Toolbar>
            </AppBar>
        </Box>  
        <div className={`fullscreen-background ${isDarkMode ? 'dark-mode' : 'light-mode'}`}></div>

    </ThemeProvider>
    </>
    )
}
