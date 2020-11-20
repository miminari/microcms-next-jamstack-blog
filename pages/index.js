import Link from 'next/link'
import Header from '../components/Header.js'
import styles from '../styles/Home.module.scss'

export default function Index({blog}) {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <ul className={styles.list}>
          {blog.map(blog => (
            <li key={blog.id}>
              <Link href={`blog/${blog.id}`}>
                <a>
                  <div>
                    {blog.image ? (
                      <picture>
                        <source srcSet={blog.image.url + "?w=160&h=160&fit=crop&dpr=2 2x"} />
                        <img src={blog.image.url + "?w=160&h=160&fit=crop"} alt="" />
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
      </main>
    </>
  );
}

//データをテンプレートに受け渡す部分の処理を記述します
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