import { quizStartAtLocalStorage } from '../../atoms';
import parse from 'html-react-parser';
import { useAtom } from 'jotai';
import { useMemo } from 'react';

interface question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface QuestionProps {
  setCurrentQuestion: any;
  question: question;
  maxQuestion: number;
  currentQuestion: string | number;
  setQuizOngoing: any;
  setScore: any;
  setUserAnswer: any;
}
const Question = ({
  question,
  setCurrentQuestion,
  maxQuestion,
  currentQuestion,
  setQuizOngoing,
  setScore,
  setUserAnswer,
}: QuestionProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setQuizStartAt]: any = useAtom(quizStartAtLocalStorage);
  const options = useMemo(() => {
    return [...question.incorrect_answers, question.correct_answer].sort(
      () => Math.random() - 0.5
    );
  }, [question]);

  const handleAnswerClick = (answer: string | number) => {
    setUserAnswer((prev: any) => [...prev, answer]);
    if (answer === question.correct_answer) {
      setScore((prev: number) => prev + 1);
    }
    if (currentQuestion < maxQuestion - 1) {
      return setCurrentQuestion((prev: any) => prev + 1);
    }
    setQuizStartAt(null);
    return setQuizOngoing(false);
  };

  return (
    <div className="w-full pb-24">
      <div className="mt-6 md:p-12 p-6 rounded-lg input-color">
        <h1 className="md:text-4xl text-2xl">{parse(question.question)}</h1>
        <div className="flex flex-col">
          {options.map((optionAnswer: any, idx: number) => {
            return (
              <div
                key={idx}
                onClick={() => handleAnswerClick(optionAnswer)}
                className="hover:scale-105 ease-in-out duration-75 hover:text-gray-300 cursor-pointer bg-gradient-to-r from-indigo-900 to-indigo-700 p-4 rounded-full mt-6 mb-2 "
              >
                {optionAnswer}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Question;
