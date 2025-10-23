
export interface QuizOption {
  text: string;
  score: number;
}

export interface QuizQuestion {
  id: number;
  text: string;
  options: QuizOption[];
}
