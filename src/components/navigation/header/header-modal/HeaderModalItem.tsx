import Link from 'next/link';

// styles
import styles from '../../../../styles/components/navigation/Header.module.scss';

type NavbarItem = {
  name: string;
  link: string;
  type: string;
};

type Props = {
  navItem: NavbarItem;
  onCloseModal: () => void;
  logout?: () => void;
};

export const HeaderModalItem = ({ navItem, onCloseModal, logout }: Props) => {
  const { link, name } = navItem;

  if (navItem.type === 'btn') {
    return (
      <li className={styles.list_item_btn}>
        <button className="btn-primary" onClick={logout}>
          {name}
        </button>
      </li>
    );
  }

  return (
    <li className={styles.list_item}>
      <Link href={link}>
        <a onClick={onCloseModal}>{name}</a>
      </Link>
    </li>
  );
};
