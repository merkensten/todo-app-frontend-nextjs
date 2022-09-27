import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Bars2Icon } from '@heroicons/react/24/outline';

import { AuthContext } from '../../../context/AuthContext';
import { useLockScroll } from '../../../hooks';

import HeaderModal from './header-modal/HeaderModal';

import styles from '../../../styles/components/navigation/Header.module.scss';

function GuestHeader() {
  const [isOpen, setIsOpen] = React.useState(false);

  const { lockScroll, unlockScroll } = useLockScroll();

  const handleOpenModal = () => {
    lockScroll();
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    unlockScroll();
    setIsOpen(false);
  };
  const HeaderItems = [
    {
      name: 'Logga in',
      link: '/login',
      type: 'link',
    },
    {
      name: 'Registrera',
      link: '/signup',
      type: 'link',
    },
  ];
  return (
    <header className={styles.header}>
      {!isOpen && (
        <>
          <Link href="/">
            <a className={styles.header_logo}>Todo App</a>
          </Link>
          <div className={styles.mobileMenu}>
            <Bars2Icon onClick={handleOpenModal} className={styles.menuIcon} />
          </div>
          <nav className={styles.desktopMenu}>
            <Link href="/login">
              <button className="btn-secondary">Logga in</button>
            </Link>
            <Link href="/signup">
              <button className="btn-primary">Registrera</button>
            </Link>
          </nav>
        </>
      )}
      {isOpen && (
        <HeaderModal
          onCloseModal={handleCloseModal}
          navbarItems={HeaderItems}
        />
      )}
    </header>
  );
}
function AppHeader() {
  const router = useRouter();

  const { logoutUser } = React.useContext(AuthContext);
  const [isOpen, setIsOpen] = React.useState(false);
  const { lockScroll, unlockScroll } = useLockScroll();

  const HeaderItems = [
    {
      name: 'Mitt konto',
      link: '/app/konto',
      type: 'link',
    },
    {
      name: 'Logga ut',
      link: '/logga-ut',
      type: 'btn',
    },
  ];

  function logoutUserFunc() {
    logoutUser();
    router.push('/login');
  }

  const handleOpenModal = () => {
    lockScroll();
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    unlockScroll();
    setIsOpen(false);
  };

  return (
    <header className={styles.header}>
      {!isOpen && (
        <>
          <Link href="/">
            <a className={styles.header_logo}>Todo App</a>
          </Link>
          <div className={styles.mobileMenu}>
            <Bars2Icon onClick={handleOpenModal} className={styles.menuIcon} />
          </div>
          <nav className={styles.desktopMenu}>
            <Link href="/app/konto">
              <button className="btn-secondary">Mitt konto</button>
            </Link>
            <button className="btn-primary" onClick={logoutUserFunc}>
              Logga ut
            </button>
          </nav>
        </>
      )}
      {isOpen && (
        <HeaderModal
          onCloseModal={handleCloseModal}
          navbarItems={HeaderItems}
        />
      )}
    </header>
  );
}

function Header() {
  const { isUserAuthenticated } = React.useContext(AuthContext);

  return (
    <>
      {isUserAuthenticated && <AppHeader />}
      {!isUserAuthenticated && <GuestHeader />}
    </>
  );
}

export default Header;
