// components/navbar.tsx
import Link from 'next/link';
import styles from './navbar.module.css';

interface NavbarProps {
  showLinks: boolean; // Adiciona a propriedade showLinks
}

const Navbar = ({ showLinks }: NavbarProps) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
      <Link href="/">
          <img src="https://encurtador.com.br/aDF19" alt="Logo" />
        </Link>
      </div>
      {showLinks && (
        <div className={styles.links}>
          <Link href="/clientes">CLIENTES</Link>
          <Link href="/pedidos">PEDIDOS</Link>
          <Link href="/produtos">PRODUTOS</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
