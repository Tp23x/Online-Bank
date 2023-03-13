import { createTheme } from '@mui/material/styles';

const Theme = createTheme({
  palette: {
    mode: 'light',
    // mode: 'dark',
  },
  typography: {
  "fontFamily": `'Prompt', sans-serif`,
  }
});

export default Theme;