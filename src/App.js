import { Box } from '@chakra-ui/react';
import './App.css';
import InpComp from './Components/InpComp';

function App() {
  return (
    <Box
      w='100%'
      minHeight='100vh'
      display='flex'
      justifyContent='center'
      alignItems='center'
      className='App' 
    >
      <InpComp />
    </Box>
  );
}

export default App;
