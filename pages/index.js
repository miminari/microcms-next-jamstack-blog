import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.scss'

export default function Home({ blog }) {
  return (
    <div>
      <Head>
        <title>miminari Next.js x microCMS Test</title>
      </Head>
      <header className={styles.header}>
        <h1>miminari microCMS</h1>
        <p>このサイトは</p>
      </header>
      <ul>
        {blog.map(blog => (
          <li key={blog.id}>
            <Link href={`blog/${blog.id}`}>
              <a>
                <div>
                  {blog.image ? (
                    <picture>
                      <source srcSet={blog.image.url + "?w=200&h=200&fit=crop&dpr=2 2x"} />
                      <img src={blog.image.url + "?w=200&h=200&fit=crop"} alt="" />
                    </picture>
                  ) : (
                    <div className={styles.noImage} />
                  )}
                </div>
                {blog.title}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };

  const data = await fetch('https://mimi-blog.microcms.io/api/v1/blog', key)
    .then(res => res.json())
    .catch(() => null);

  return {
    props: {
      blog: data.contents,
    },
  };
};