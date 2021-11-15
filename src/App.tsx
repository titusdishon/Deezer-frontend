import React from 'react';
import ThemeProvider from './theme/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';
import Music from './components/Music';

function App() {
  return (
    <ThemeProvider>
    <CssBaseline />
    <Music/>
  </ThemeProvider>
  );
}

export default App;
