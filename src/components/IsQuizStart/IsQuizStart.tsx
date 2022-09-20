import { isQuizFinish } from '../../atoms';
import Loading from '../Loading/Loading';
import Question from '../Question/Question';
import Result from './Result';
import { useAtom } from 'jotai';
import { useState } from 'react';

const IsQuizStart = ({ response, time }: any) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizFinish, setQuizFinish] = useAtom(isQuizFinish);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState<number[]>([]);

  console.log(userAnswer);
  return (
    <div className="w-full">
      {!response ? (
        <Loading />
      ) : (
        <>
          {quizFinish ? (
            <Result userAnswer={userAnswer} score={score} />
          ) : (
            <>
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-5xl font-bold">
                    Question Number {currentQuestion + 1}
                  </h1>
                  <p className="py-4 text-gray-500">
                    click to the right answer
                  </p>
                </div>
                <h1 className="text-6xl font-bold">{time}</h1>
              </div>
              <Question
                question={response.results[currentQuestion]}
                setCurrentQuestion={setCurrentQuestion}
                maxQuestion={response.results.length}
                setUserAnswer={setUserAnswer}
                currentQuestion={currentQuestion}
                setQuizFinish={setQuizFinish}
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
