
import React, { useState, useMemo } from 'react';
import type { QuizQuestion as QuizQuestionType } from './types';
import Question from './components/Question';
import Result from './components/Result';
import LoadingSpinner from './components/LoadingSpinner';
import { getAdvice } from './services/geminiService';

const quizQuestions: QuizQuestionType[] = [
  {
    id: 1,
    text: '¿Hoy te ha sonreído de esa forma que te hace olvidar tu propio nombre?',
    options: [
      { text: 'Sí, ¡fue mágico!', score: 2 },
      { text: 'Creo que fue una mueca', score: 0 },
      { text: 'No me ha mirado', score: -1 },
    ],
  },
  {
    id: 2,
    text: 'Al preguntarle "¿Qué te pasa?", ¿su respuesta fue "Nada" en un tono que sugería que "todo" está mal?',
    options: [
      { text: 'Exactamente ese "Nada"', score: -2 },
      { text: 'Dijo "Nada", pero sonaba bien', score: 0 },
      { text: 'Me contó lo que le pasaba', score: 2 },
    ],
  },
  {
    id: 3,
    text: '¿Ha compartido voluntariamente contigo un meme o video gracioso hoy?',
    options: [
      { text: '¡Sí, y nos reímos!', score: 2 },
      { text: 'No, nada de nada', score: -1 },
      { text: 'Me mandó un link de trabajo', score: 0 },
    ],
  },
  {
    id: 4,
    text: '¿Has encontrado tus cosas en su sitio habitual o han sido "reorganizadas" en el abismo?',
    options: [
      { text: 'Todo en su sitio, un milagro', score: 2 },
      { text: 'Algunas bajas, nada grave', score: 0 },
      { text: 'Mi cartera ahora vive en la nevera', score: -2 },
    ],
  },
  {
    id: 5,
    text: '¿Te ha pedido que hagas algo que podrías haber hecho tú solo hace una semana?',
    options: [
      { text: 'Sí, y con fecha límite', score: -2 },
      { text: 'No, hoy todo fluye', score: 2 },
      { text: 'Me lo recordó amablemente', score: 1 },
    ],
  },
  {
    id: 6,
    text: '¿Elige ella la película/serie esta noche?',
    options: [
        { text: 'Sí, y ya sé que es un drama coreano', score: -1},
        { text: 'Me dejó elegir a mí', score: 2},
        { text: 'Vemos lo que sea, juntos', score: 1}
    ]
  }
];

const App: React.FC = () => {
  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  const [resultScore, setResultScore] = useState<number>(0);
  const [advice, setAdvice] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);

  const handleOptionSelect = (questionId: number, score: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
  };
  
  const allAnswered = useMemo(() => {
    return quizQuestions.length === Object.values(answers).filter(v => v !== null).length;
  }, [answers]);

  const calculateScore = () => {
    const totalScore = Object.values(answers).reduce((acc, score) => acc + (score || 0), 0);
    const maxScore = quizQuestions.reduce((acc, q) => acc + Math.max(...q.options.map(o => o.score)), 0);
    const minScore = quizQuestions.reduce((acc, q) => acc + Math.min(...q.options.map(o => o.score)), 0);
    
    // Normalize score to 0-100 range
    const normalizedScore = Math.round(((totalScore - minScore) / (maxScore - minScore)) * 100);
    return Math.max(0, Math.min(100, normalizedScore)); // Clamp between 0 and 100
  };

  const handleSubmit = async () => {
    if (!allAnswered) return;
    setIsLoading(true);
    setShowResult(false);
    
    const score = calculateScore();
    setResultScore(score);
    
    const geminiAdvice = await getAdvice(score);
    setAdvice(geminiAdvice);
    
    setIsLoading(false);
    setShowResult(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResult(false);
    setIsLoading(false);
    setAdvice('');
    setResultScore(0);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 font-sans">
      <div className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800">
          Detector de Felicidad <span className="text-rose-500">Conyugal</span>
        </h1>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
          Responde con honestidad y descubre si necesitas comprar flores, chocolate o simplemente... correr.
        </p>
      </div>

      <div className="w-full max-w-2xl mx-auto">
        {!showResult && !isLoading && (
          <div className="animate-fade-in">
            {quizQuestions.map((q) => (
              <Question
                key={q.id}
                question={q}
                selectedOption={answers[q.id] ?? null}
                onOptionSelect={handleOptionSelect}
              />
            ))}
            <div className="text-center mt-8">
              <button
                onClick={handleSubmit}
                disabled={!allAnswered}
                className="px-10 py-4 bg-teal-500 text-white font-bold text-xl rounded-full shadow-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none transform hover:scale-105 disabled:transform-none"
              >
                ¡Calcular Nivel de Peligro!
              </button>
            </div>
          </div>
        )}

        {isLoading && <LoadingSpinner />}
        
        {showResult && (
            <Result score={resultScore} advice={advice} onReset={handleReset} />
        )}
      </div>

      <footer className="text-center text-gray-500 mt-12">
        <p>Hecho con humor y ❤️ para cónyuges valientes.</p>
        <p>Recuerda: esto es solo por diversión. La comunicación real es la clave.</p>
      </footer>
    </div>
  );
};

export default App;
