import { AppProps } from 'next/app'
import { GlobalStyle } from '../styles/globalStyle'
import { ThemeProvider } from 'styled-components'
import { theme } from '../styles/theme'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '../lib/react-query'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <GlobalStyle />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
