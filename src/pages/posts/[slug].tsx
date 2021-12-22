import { GetServerSideProps, GetStaticProps } from 'next';
import Head from 'next/head';

import getPrismicClient from '../../services/prismic';

import styles from './post.module.scss';
import { RichText } from 'prismic-dom';
import { getSession } from 'next-auth/client';

type PostProps = {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  }
}

function Post({post}: PostProps) {
  return (
    <>
      <Head>
        <title>{post.title} | Ignews</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div dangerouslySetInnerHTML={{__html: post.content}} className={styles.postContent} />
        </article>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const session = getSession({req});
  const { slug } = params;

  const prismic = getPrismicClient(req)

  const response = await prismic.getByUID('post', String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content),
    updatedAt: new Date(response.last_publication_date as string).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }
  
  return {
    props: {
      post
    }
  }
}

export default Post;