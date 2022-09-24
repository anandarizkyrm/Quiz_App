import {
  isQuizOngoing as quizOngoing,
  userDataFromLocalStorage,
  isQuizStart as quizStart,
} from '../atoms';
import ErrorPage from '../components/ErrorPage/ErrorPage';
import { useFetch } from '../hooks/useFetch';
import { useAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { Suspense, lazy } from 'react';

const IsQuizStart = lazy(() => import('../components/IsQuizStart/IsQuizStart'));
const url = `https://opentdb.com/api.php?amount=${
  import.meta.env.VITE_TOTAL_QUESTIONS
}`;

const Home = () => {
  const [userData]: any = useAtom(userDataFromLocalStorage);
  const userDataObj = JSON.parse(userData);
  const { response, error }: any = useFetch(url);
  const [isQuizOngoing, setIsQuizOngoing] = useAtom(quizOngoing);
  const [isQuizStart, setIsQuizStart] = useAtom(quizStart);
  const [time, setTime] = useState<number>(import.meta.env.VITE_TIMER_QUIZ);
  const interval: React.MutableRefObject<any> = useRef(null);
  const isStart = !isQuizStart && !isQuizOngoing;

  const startQuiz = () => {
    clearInterval(interval.current);
    setIsQuizStart(true);
    setIsQuizOngoing(true);
    if (time !== import.meta.env.VITE_TIMER_QUIZ) {
      setTime(import.meta.env.VITE_TIMER_QUIZ);
    }
    interval.current = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);
  };

  useEffect(() => {
    if (time <= 0) {
      setIsQuizOngoing(false);
      return interval.current && clearInterval(interval.current);
    }
  }, [time]);

  if (error) return <ErrorPage code={500} msg={'server error'} />;
  return (
    <section className="mt-24 flex flex-col justify-between h-72 items-center">
      {isStart ? (
        <>
          <div className="text-center">
            <h1 className="text-6xl font-bold">
              Welcome {userDataObj.username}
            </h1>
            <p className="text-gray-500">
              {' '}
              Please Click Start to Start The Quiz
            </p>
          </div>
          <button
            onClick={startQuiz}
            className="bg-gradient-to-r from-indigo-900 to-indigo-700 p-12 w-32 h-32 rounded-full hover:bg-slate-900 hover:font-bold"
          >
            Start
          </button>
        </>
      ) : (
        <Suspense>
          <IsQuizStart time={time} response={response} />
        </Suspense>
      )}
    </section>
  );
};

export default Home;
