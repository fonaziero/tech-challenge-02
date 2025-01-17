import { Chart, ArcElement, Legend, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useEffect, useState } from 'react';

Chart.register(ArcElement, Legend, Tooltip);

export default function InvestmentsCard() {
  const [legendPosition, setLegendPosition] = useState<'right' | 'bottom'>('right');

  useEffect(() => {
    const updateLegendPosition = () => {
      if (window.innerWidth <= 768) {
        setLegendPosition('bottom');
      } else {
        setLegendPosition('right');
      }
    };

    updateLegendPosition();
    window.addEventListener('resize', updateLegendPosition);

    return () => {
      window.removeEventListener('resize', updateLegendPosition);
    };
  }, []);

  const data = {
    labels: ['Fundos de investimento', 'Tesouro Direto', 'Previdência Privada', 'Bolsa de Valores'],
    datasets: [
      {
        data: [25, 25, 25, 25],
        backgroundColor: ['#FF8C00', '#1E90FF', '#FF69B4', '#8A2BE2'],
        hoverBackgroundColor: ['#FF8C00', '#1E90FF', '#FF69B4', '#8A2BE2'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        display: true,
        position: legendPosition,
        align: 'center',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 10,
          boxWidth: 15,
          font: {
            size: 16,
            family: 'Inter, sans-serif',
          },
          color: '#ffffff',
        },
      },
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10,
      },
    },
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <h3 className="text-lg font-bold text-black">Investimentos</h3>
      <span className="text-lg text-darkBlue">Total: R$ 50.000,00</span>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
        <div className="flex flex-col bg-darkBlue w-full min-h-[95px] h-full items-center justify-center gap-3 rounded-lg">
          <h4 className="text-sm text-white">Renda Fixa</h4>
          <span className="text-md text-white">R$ 36.000,00</span>
        </div>
        <div className="flex flex-col bg-darkBlue w-full min-h-[95px] h-full items-center justify-center gap-3 rounded-lg">
          <h4 className="text-sm text-white">Renda variável</h4>
          <span className="text-md text-white">R$ 14.000,00</span>
        </div>
      </div>
      <h4 className="text-md text-black">Estatísticas</h4>
      <div className="bg-darkBlue flex lg:flex-row flex-col items-center justify-center rounded-lg w-full h-full">
        <div className="w-full  flex items-center justify-center">
          <Doughnut data={data} options={options as any} />
        </div>
      </div>
    </div>
  );
}
