
import React from 'react';

interface ResultProps {
  score: number;
  advice: string;
  onReset: () => void;
}

const Result: React.FC<ResultProps> = ({ score, advice, onReset }) => {
  const getResultDetails = () => {
    if (score >= 80) {
      return {
        title: "¡Felicidad Máxima! ¡Eres una estrella!",
        bgColor: "bg-green-100",
        textColor: "text-green-800",
        borderColor: "border-green-500",
        progressColor: "bg-green-500",
        emoji: "🎉",
      };
    } else if (score >= 50) {
      return {
        title: "Zona Neutral: Terreno estable, pero mejorable.",
        bgColor: "bg-yellow-100",
        textColor: "text-yellow-800",
        borderColor: "border-yellow-500",
        progressColor: "bg-yellow-500",
        emoji: "🤔",
      };
    } else {
      return {
        title: "¡Alerta Roja! Procede con cautela (y chocolate).",
        bgColor: "bg-red-100",
        textColor: "text-red-800",
        borderColor: "border-red-500",
        progressColor: "bg-red-500",
        emoji: "🚨",
      };
    }
  };

  const { title, bgColor, textColor, borderColor, progressColor, emoji } = getResultDetails();

  return (
    <div className={`w-full max-w-2xl p-8 rounded-2xl shadow-lg border-2 ${borderColor} ${bgColor} text-center transition-all duration-500 ease-in-out transform animate-fade-in`}>
      <h2 className={`text-2xl md:text-3xl font-bold ${textColor} mb-4`}>{emoji} {title}</h2>
      
      <div className="my-6">
        <p className={`text-lg font-medium ${textColor} mb-2`}>Nivel de Felicidad Detectado</p>
        <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden border">
          <div
            className={`h-8 rounded-full ${progressColor} flex items-center justify-center text-white font-bold transition-all duration-1000 ease-out`}
            style={{ width: `${score}%` }}
          >
            {score}%
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-white/70 rounded-xl">
        <h3 className="text-xl font-semibold text-gray-700 mb-3">Consejo del Oráculo Digital:</h3>
        <p className="text-gray-600 text-lg whitespace-pre-wrap">{advice}</p>
      </div>

      <button
        onClick={onReset}
        className="mt-8 px-8 py-3 bg-pink-500 text-white font-bold rounded-full hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 transition-transform transform hover:scale-105"
      >
        Analizar de Nuevo
      </button>
    </div>
  );
};

export default Result;
