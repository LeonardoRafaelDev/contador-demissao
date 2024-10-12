import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const images: string[] = [
  '/imagem-dia-1.jpg',
  '/imagem-dia-2.jpg',
  '/imagem-dia-3.jpg',
  '/imagem-dia-4.jpg',
  '/imagem-dia-5.jpg',
  '/imagem-dia-6.jpg',
  '/imagem-dia-7.jpg',
  '/imagem-dia-8.jpg',
  '/imagem-dia-9.jpg',
];

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

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
        setCurrentImageIndex(Math.min(8, days));
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setCurrentImageIndex(8);
      }
    };

    calculateTimeLeft(); // Calcula imediatamente ao montar o componente
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4 text-center">Contagem Regressiva para 20 de Outubro</h1>
      <p className="text-2xl mb-4 text-center">
        {timeLeft.days} dias, {timeLeft.hours} horas, {timeLeft.minutes} minutos e {timeLeft.seconds} segundos
      </p>
      <div className="relative w-64 h-64 bg-gray-200 flex items-center justify-center overflow-hidden">
        <Image
          src={images[currentImageIndex]}
          alt={`Imagem do dia ${Math.min(9, 9 - timeLeft.days)}`}
          layout="fill"
          objectFit="contain"
        />
      </div>
    </div>
  );
};

export default Countdown;