import Countdown from '@/components/Countdown';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Contagem Regressiva de 9 Dias</title>
        <meta name="description" content="Contagem regressiva de 9 dias com imagens" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Countdown />
      </main>
    </>
  );
};

export default Home;