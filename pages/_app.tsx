import type { AppProps } from 'next/app';
import Background from '../components/Background';
import Footer from '../components/Footer';
import Menu from '../components/Menu';
import '../styles/globals.css';
import { Poppins } from 'next/font/google';
import { useRouter } from 'next/router';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] });

export default function App({ Component, pageProps }: AppProps) {
  const router = typeof window !== 'undefined' ? require('next/router').useRouter() : { pathname: '' };
  const isAdminPage = router.pathname.startsWith('/admin');
  return (
    <div className={poppins.className}>
      <Background />
      {!isAdminPage && <Menu />}
      <div style={{ minHeight: '100vh' }}>
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
} 