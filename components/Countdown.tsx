import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const ReactConfetti = dynamic(() => import('react-confetti'), { ssr: false });

interface DayInfo {
  image: string;
  text: string;
}

const daysInfo: DayInfo[] = [
  { image: '/imagem-dia-1.gif', text: 'ULTIMO DIA CARALHOOOO AMANHA E UM DIA NOVOOOOO VAMOOOOOOO PAPAPUPU🎆🎇PAPUL🎆🎇🎇🎆FIIILLLPUUUUUPOWPOWPOWPOW🎇🎇🎇🎆🎆🎆PAPAPAPATRATRATRATRATRA🎇🎆🎇🎆🎇🎆🎇🎆🎇TATATATATAFIIIIILLLFIIIIILLLLFIIIIIIILLLPOOOWWWWWW🎇🎆🎇🎆🎇🎆🎇🎇🎆🎇🎆🎇🎆🎇🎆🎇PAPAPAPAPUPUPUPUPU🎉🎉🎉🎊🎊🎊🎊🎉🎉🎉🎊🎊🎊PATAPUTWPULFILPOWPOW' },
  { image: '/imagem-dia-2.jpg', text: '2 DIAAAAAS CHEIRINHO DE VIDA NOVAAAAAA' },
  { image: '/imagem-dia-3.gif', text: '3 dias VAMOOOOOOOOOO 🚜🚜🚜🐴🐴' },
  { image: '/imagem-dia-4.jpg', text: '4 dias pode tenta careca' },
  { image: '/imagem-dia-5.gif', text: '5 dias e so observo tudo pegando fogo #5diaspralilicanta' },
  { image: '/imagem-dia-6.jpg', text: 'O CHEIRINHO DE QUEM NÃO VAI TER OS CLIENTE PE NO SACO #6DIAS' },
  { image: '/imagem-dia-7.gif', text: 'So mais uma semana CARALHOOOOOOOOOO 🥳🥳🥳 #VEMAGRO' },
  { image: '/imagem-dia-8.jpg', text: '🎉TAMO QUASEEEEE CALMAE E RESPIRA GATINHA 🎉' },
  { image: '/imagem-dia-9.gif', text: 'Amanhã é o grande dia! Prepare-se!' },
];

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [currentDayInfo, setCurrentDayInfo] = useState<DayInfo>(daysInfo[0]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiIntensity, setConfettiIntensity] = useState(0);
  const [showYoutubeLink, setShowYoutubeLink] = useState(false);

  useEffect(() => {
    const targetDate = new Date('2024-10-20T00:00:00').getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
        setCurrentDayInfo(daysInfo[Math.min(8, days)]);

        if (days <= 2 && days > 0) {
          setShowConfetti(true);
          setConfettiIntensity(200); 
        } else if (days === 0) {
          setShowConfetti(true);
          setConfettiIntensity(4000); 
          setShowYoutubeLink(true);
        } else {
          setShowConfetti(false);
          setConfettiIntensity(0);
          setShowYoutubeLink(false);
        }
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setCurrentDayInfo(daysInfo[8]);
        setShowConfetti(true);
        setConfettiIntensity(200); 
        setShowYoutubeLink(true);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {showConfetti && (
        <ReactConfetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={confettiIntensity}
        />
      )}
      <h1 className="text-4xl font-bold mb-4 text-center">Contagem Regressiva para 20 de Outubro</h1>
      <p className="text-2xl mb-4 text-center">
        {timeLeft.days} dias, {timeLeft.hours} horas, {timeLeft.minutes} minutos e {timeLeft.seconds} segundos
      </p>
      <div className="relative w-64 h-64 bg-gray-200 flex items-center justify-center overflow-hidden mb-4">
        <Image
          src={currentDayInfo.image}
          alt={`Imagem do dia ${Math.min(9, 9 - timeLeft.days)}`}
          layout="fill"
          objectFit="contain"
        />
      </div>
      <p className="text-xl text-center font-semibold mb-4">{currentDayInfo.text}</p>
      {showYoutubeLink && (
        <a
          href={process.env.NEXT_PUBLIC_YOUTUBE_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Assista ao Vídeo no YouTube!
        </a>
      )}
    </div>
  );
};

export default Countdown;