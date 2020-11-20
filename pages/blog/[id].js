import Header from '../../components/Header.js';
import styles from '../../styles/Home.module.scss';

export default function BlogId({ blog }) {
  return (
    <>
      <Header />
      <main className={styles.main}>

        <article>

          <h1 className={styles.title}>{blog.title}</h1>

          {blog.image && (
            <picture>
              <source
                srcSet={blog.image.url + "?w=1280"}
                media="(min-width: 1280px)"
              />
              <source
                srcSet={blog.image.url + "?w=768"}
                media="(min-width: 768px)"
              />
              <source
                srcSet={blog.image.url + "?w=480"}
                media="(min-width: 480px)"
              />
              <img src={blog.image.url + "?w=480"} alt="" />
            </picture>
          )}

          <p className={styles.publishedAt}>{blog.publishedAt}</p>
          <p className={styles.category}>{blog.category && `${blog.category.name}`}</p>
          <div
            dangerouslySetInnerHTML={{
              __html: `${blog.body}`,
            }}
            className={styles.post}
          />

        </article>

      </main>
    </>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };

  const data = await fetch('https://mimi-blog.microcms.io/api/v1/blog', key)
    .then(res => res.json())
    .catch(() => null);

  const paths = data.contents.map(content => `/blog/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async context => {
  const id = context.params.id;

  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };

  const data = await fetch(
    'https://mimi-blog.microcms.io/api/v1/blog/' + id,
    key,
  )
    .then(res => res.json())
    .catch(() => null);

  return {
    props: {
      blog: data,
    },
  };
};