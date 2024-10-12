import Countdown from '@/components/Countdown';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>#CONTAGEM PARA A LILI CANTAR</title>
        <meta name="description" content="Contagem de demissão do momozi pra um lugar melhor" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Countdown />
      </main>
    </>
  );
};

export default Home;