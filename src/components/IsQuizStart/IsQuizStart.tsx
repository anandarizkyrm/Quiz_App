import {
  currentQuestionNumberLocalStorage,
  isQuizOngoing,
  scoreFromLocalStorage,
  userAnswerLocalStorage,
} from '../../atoms';
import Loading from '../Loading/Loading';
import Question from '../Question/Question';
import Result from './Result';
import { useAtom } from 'jotai';

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

  const [score, setScore] = useAtom(scoreFromLocalStorage);
  const [userAnswer, setUserAnswer] = useAtom(userAnswerLocalStorage);

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
                <h1 className="md:text-5xl text-4xl font-semibold mt-12 text-gray-300">
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
