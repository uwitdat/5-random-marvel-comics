import React from 'react';
import styles from '../styles/comics.module.css';
import { Comic } from 'pages';

const Comics = ({ comics }: { comics: Comic[] }) => {
  if (!comics) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <h1>5 Random Marvel Comics W/ NextJS & Bun</h1>
      <ul className={styles.comics}>
        {comics.map((comic) => (
          <li className={styles.comic} key={comic.id}>
            <h2>{comic.title}</h2>
            <img
              src={`${comic.sprite.path}.${comic.sprite.extension}`}
              alt="comic img"
              width={300}
              height={300}
            />
            <a href={`/comics/${comic.id}`}>
              <button>View More</button>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comics;
