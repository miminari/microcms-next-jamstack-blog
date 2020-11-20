import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.scss'

export default function Header() {
  return (
    <>
      <Head>
        <title>miminari Next.js x microCMS Test</title>
      </Head>
      <header className={styles.header}>
        <h1>みみなり Micro CMS x Next.js テスト</h1>
        <nav>
        <Link href={`/`}>
            <a>HOME</a>
        </Link>
      </nav>
      </header>
    </>
  );
}
