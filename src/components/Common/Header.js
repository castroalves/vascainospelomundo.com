import Link from "next/link";
import Image from "next/image";

import styles from "../../../styles/Home.module.css";
import Logo from "../../../public/logo-vascainos-pelo-mundo.png";

export default function Header() {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>
                <Link href="/">
                    <a>
                        <Image
                            src={Logo}
                            width={200}
                            height={200}
                            alt="Logo Vascaínos Pelo Mundo"
                        />
                    </a>
                </Link>
            </h1>
            <h2 className={styles.subtitle}>
                Comunidade de Vascaínos residentes no exterior
            </h2>
            <p>
                <a
                    href="https://instagram.com/vascainospelomundocom"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Instagram
                </a>
                &nbsp;|&nbsp;
                <a
                    href="https://twitter.com/vascopelomundo"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Twitter
                </a>
            </p>
        </header>
    );
}
