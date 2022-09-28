import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AuthContext } from '../context/AuthContext';
import Link from 'next/link';

import styles from '../styles/pages/NotFound.module.scss';

function NotFound() {
  const { isUserAuthenticated } = React.useContext(AuthContext);
  return (
    <>
      <Head>
        <title>404 - sidan hittades inte</title>
        <meta name="description" content="404 - sidan hittades inte" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.wrapper}>
        <h1>404 - sidan hittades inte</h1>

        {isUserAuthenticated && (
          <Link href="/app">
            <button className="btn-primary">Tillbaka till startsidan</button>
          </Link>
        )}
        {!isUserAuthenticated && (
          <Link href="/">
            <button className="btn-primary">Tillbaka till startsidan</button>
          </Link>
        )}
      </div>
    </>
  );
}

export default NotFound;
