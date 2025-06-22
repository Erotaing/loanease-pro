import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/globals.css'
import theme from '../styles/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
      <ToastContainer 
        position="bottom-right"
        toastClassName="!bg-white !text-gray-800 !rounded-lg !shadow-lg"
        progressClassName="!bg-primary-500"
      />
    </ThemeProvider>
  )
}

export default MyApp