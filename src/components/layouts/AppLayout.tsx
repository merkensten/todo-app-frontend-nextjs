import React from 'react';
import { Header, Footer } from '../navigation';

type Props = {
  children: React.ReactNode;
};

function AppLayout({ children }: Props) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default AppLayout;
