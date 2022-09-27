import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AuthContext } from '../../context/AuthContext';

import styles from '../../styles/components/navigation/Footer.module.scss';

function GuestFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_border}>
        <div className={styles.footer_border_display}></div>
      </div>
      <div className={styles.footer_wrapper}>
        <Link href="/">
          <a className={styles.footer_logo}>Todo Next Nest App</a>
        </Link>
        <nav>
          <Link href="/login">
            <button className="btn-secondary">Logga in</button>
          </Link>
          <Link href="/signup">
            <button className="btn-primary">Registrera</button>
          </Link>
        </nav>
      </div>
    </footer>
  );
}
function AppFooter() {
  const { logoutUser } = React.useContext(AuthContext);
  const router = useRouter();
  function logoutUserFunc() {
    logoutUser();
    router.push('/');
  }
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_border}>
        <div className={styles.footer_border_display}></div>
      </div>
      <div className={styles.footer_wrapper}>
        <Link href="/">
          <a className={styles.footer_logo}>Todo Next Nest App</a>
        </Link>
        <nav>
          <Link href="/app/konto">
            <button className="btn-secondary">Mitt konto</button>
          </Link>
          <button className="btn-primary" onClick={logoutUserFunc}>
            Logga ut
          </button>
        </nav>
      </div>
    </footer>
  );
}
function Footer() {
  const { isUserAuthenticated } = React.useContext(AuthContext);

  return (
    <>
      {isUserAuthenticated && <AppFooter />}
      {!isUserAuthenticated && <GuestFooter />}
    </>
  );
}

export default Footer;
