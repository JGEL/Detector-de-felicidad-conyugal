
import React from 'react';
import type { QuizQuestion as QuizQuestionType, QuizOption } from '../types';

interface QuestionProps {
  question: QuizQuestionType;
  selectedOption: number | null;
  onOptionSelect: (questionId: number, score: number) => void;
}

const Question: React.FC<QuestionProps> = ({ question, selectedOption, onOptionSelect }) => {
  return (
    <div className="mb-8 p-6 bg-white/80 rounded-xl shadow-md backdrop-blur-sm transition-shadow hover:shadow-lg">
      <h3 className="text-xl font-semibold text-gray-800 mb-5 text-center">{question.text}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onOptionSelect(question.id, option.score)}
            className={`p-4 rounded-lg text-center font-medium transition-all duration-200 ease-in-out transform hover:-translate-y-1 ${
              selectedOption === option.score
                ? 'bg-rose-500 text-white shadow-lg scale-105'
                : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
            }`}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
