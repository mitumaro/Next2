import React from 'react';
import  styles  from '../app/app.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Top Twitch Streams</h1>
      <p className={styles.preface}>現在Twitch配信中のトップストリーマーやクリップを見てみよう！
      </p>
      <div className={styles.explanationBox}>
        <p className={styles.subtitle}>Twitchとは？</p>
        <p className={styles.paragraph}>Twitchは、Amazonが運営するライブストリーミングプラットフォームです。</p>
      </div>
      <div className={styles.explanationBox}>
        <p className={styles.subtitle}>トップストリーマーとは？</p>
        <p className={styles.paragraph}>トップストリーマーは、Twitchで最も人気のある配信者のことです。</p>
      </div>
      <div className={styles.explanationBox}>
        <p className={styles.subtitle}>クリップとは？</p>
        <p className={styles.paragraph}>クリップは、Twitchの配信中に視聴者が面白い部分を切り取って保存したものです。</p>
      </div>
    </div>
  );
}