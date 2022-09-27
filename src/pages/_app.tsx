import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { AppLayout } from '../components/layouts';
import { AuthProvider } from '../context/AuthContext';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
