import type { NextPage } from 'next';
import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/pages/Home.module.scss';
import { useRouter } from 'next/router';
import { AuthContext } from '../context/AuthContext';
import Link from 'next/link';

const Home: NextPage = () => {
  const router = useRouter();
  const { isUserAuthenticated } = React.useContext(AuthContext);

  React.useEffect(() => {
    // checks if the user is authenticated
    if (isUserAuthenticated === true) {
      router.push('/app');
    }
  }, [router, isUserAuthenticated]);

  return (
    <>
      <Head>
        <title>Todo Next.js Nest JS app</title>
        <meta name="description" content="Todo Next.js Nest JS app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.home_wrapper}>
        <div className={styles.home_content_section}>
          <h1 className={styles.title}>NextJS todo app</h1>

          <div>
            <Link href="/login">
              <button className="btn-secondary">Logga in</button>
            </Link>
            <Link href="/signup">
              <button className="btn-primary">Registrera</button>
            </Link>
          </div>
        </div>
        <Image src="/hero.svg" width={1000} height={1000} alt="hero img" />
      </div>
    </>
  );
};

export default Home;
