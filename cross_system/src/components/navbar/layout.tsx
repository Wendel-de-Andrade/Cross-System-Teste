import Navbar from './navbar';
import styles from './layout.module.css';

interface LayoutProps {
    children: React.ReactNode;
    showLinks?: boolean; // Adiciona uma nova propriedade opcional
}

const Layout = ({ children, showLinks = true }: LayoutProps) => { // O padrão é true
    return (
        <div className={styles.layout}>
            <Navbar showLinks={showLinks} />
            <main className={styles.mainContent}>{children}</main>
        </div>
    );
};

export default Layout;
