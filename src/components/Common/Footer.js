import styles from "../../../styles/Home.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <p>Copyright © 2022 | Vascaínos Pelo Mundo</p>
            <p>
                Criado por&nbsp;
                <a
                    href="https://instagram.com/castroalves"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <strong>Cadu de Castro Alves</strong>
                </a>
            </p>
        </footer>
    );
}
