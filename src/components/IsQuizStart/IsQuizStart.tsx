import { currentQuestionNumberLocalStorage, isQuizOngoing } from '../../atoms';
import Loading from '../Loading/Loading';
import Question from '../Question/Question';
import Result from './Result';
import { useAtom } from 'jotai';
import { useState } from 'react';

const IsQuizStart = ({
  response,
  time,
  loading,
}: {
  response: any;
  time: number;
  loading: boolean;
}) => {
  const [quizOngoing, setQuizOngoing] = useAtom(isQuizOngoing);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState<number[]>([]);

  const [currentQuestionNumber, setCurrentQuestionNumber]: any = useAtom(
    currentQuestionNumberLocalStorage
  );
  return (
    <div className="w-full width">
      {loading ? (
        <Loading />
      ) : (
        <>
          {!quizOngoing ? (
            <Result userAnswer={userAnswer} score={score} />
          ) : (
            <>
              <div className="flex justify-between items-center ">
                <div>
                  <h1 className="text-3xl md:text-5xl font-bold">
                    Question Number {currentQuestionNumber + 1} /{' '}
                    {import.meta.env.VITE_TOTAL_QUESTIONS}
                  </h1>
                  <p className="py-4 text-gray-500">
                    click to the right answer
                  </p>
                </div>
                <h1 className="md:text-5xl text-4xl font-semibold mt-12">
                  {time}
                </h1>
              </div>
              <Question
                question={response.results[currentQuestionNumber]}
                setCurrentQuestion={setCurrentQuestionNumber}
                maxQuestion={response.results.length}
                setUserAnswer={setUserAnswer}
                currentQuestion={currentQuestionNumber}
                setQuizOngoing={setQuizOngoing}
                setScore={setScore}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default IsQuizStart;
