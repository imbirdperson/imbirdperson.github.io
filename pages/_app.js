// "use client"; // Add this line at the top
import '../style/index.scss';
import Header from '../components/Header';
import Lenis from '@studio-freight/lenis';
import { useEffect , useState} from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

    // Check if the current route contains '/resume'
    const showHeader = router.pathname !== '/resume';

    useEffect(() => {
        const header = document.querySelector('.header');
        const menu_wrapper = document.querySelector('.menu-wrapper');
        const profile = document.querySelector('.profile');
        if (router.pathname.includes('/art')) {
            document.body.classList.add('art-background');
            if(header){
              header.classList.add('art-header');
              menu_wrapper.classList.add('art-menu');
              profile.classList.add('art-profile');
            }

        } else {
            document.body.classList.remove('art-background');
            if(header){
              header.classList.remove('art-header');
              profile.classList.remove('art-profile');
            }
        }
    }, [router.pathname]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing function
      direction: 'vertical', // Can be 'vertical' or 'horizontal'
      gestureDirection: 'vertical', // Can be 'vertical' or 'horizontal'
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy(); // Cleanup on unmount
  }, []);
  return (
    <>
    <Head>
      <title>Deepak Rajan — +</title>
    </Head>
    <div className='content-main'>
    {showHeader && <Header />}
    <div className='content'>
      <Component {...pageProps} />
    </div>
    </div>
    </>
  );
}

export default MyApp;