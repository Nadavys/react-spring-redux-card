
import CssBaseline from '@mui/material/CssBaseline';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CardListView from './features/counter/Cardlist';
import CardForm from './features/counter/CardForm';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { Divider } from '@mui/material';
import { useSpring, animated } from '@react-spring/web';

function App() {

  const props = useSpring(
    {
      to: { opacity: 1, translateY: 0, scale: 1 },
      from: { opacity: 0, translateY: -50, scale: 5 },
      delay: 300,
 
    }
  );

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <animated.div style={props}>
            <Typography component="h1" variant="h5">
            <ContentCopyIcon sx={{transform:"translatey(3px)"}}/> Card List Demo
            </Typography>
          </animated.div>

          <CardForm />

          <Divider />

          <CardListView />

        </Box>
        <ToastContainer />
      </Container>
  );
}

export default App;
