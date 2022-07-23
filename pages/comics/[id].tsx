import React from 'react';
import { GetServerSideProps } from 'next/types';
import md5 from 'md5';
import styles from '../../styles/comic.module.css';

interface Comic {
  id: number;
  title: string;
  sprite: { path: string; extension: string };
  price: number;
  desc: string;
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.resolvedUrl.slice(8);

  const ts = Math.floor(Date.now() / 1000);
  const hash = md5(ts + process.env.PRIVATE_KEY + process.env.PUBLIC_KEY);

  const res = await fetch(
    `https://gateway.marvel.com:443/v1/public/comics/${id}?ts=${ts}&apikey=${process.env.PUBLIC_KEY}&hash=${hash}`
  );
  const comic = await res.json();

  return {
    props: {
      data: comic.data.results.map((c) => {
        return {
          id: c.id,
          title: c.title,
          desc: c.description,
          sprite: c.thumbnail,
          price: c.prices[0].price,
        };
      }),
    },
  };
};

const Meme = ({ data }: { data: Comic }) => {
  const { title, desc, price, sprite } = data[0];

  return (
    <div className={styles.container}>
      <a href="/">
        <button className={styles.button}>Back</button>
      </a>
      <section className={styles.comic}>
        <h1>{title}</h1>
        <h3>${price}</h3>
        <img
          src={`${sprite.path}.${sprite.extension}`}
          alt="comic img"
          width={400}
          height={400}
        />
        <p>{desc}</p>
      </section>
    </div>
  );
};
export default Meme;
