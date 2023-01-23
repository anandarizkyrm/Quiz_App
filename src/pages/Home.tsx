import {
  isQuizOngoing as quizOngoing,
  userDataFromLocalStorage,
  isQuizStart as quizStart,
  quizStartAtLocalStorage,
  currentQuestionNumberLocalStorage,
} from '../atoms';
import ErrorPage from '../components/ErrorPage/ErrorPage';
import { useFetch } from '../hooks/useFetch';
import { getSecondFromDateNow } from '../utlis';
import { useAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { Suspense, lazy } from 'react';

const IsQuizStart = lazy(() => import('../components/IsQuizStart/IsQuizStart'));

const timer = import.meta.env.VITE_TIMER_QUIZ;
const url = `https://opentdb.com/api.php?amount=${
  import.meta.env.VITE_TOTAL_QUESTIONS
}`;

const Home = () => {
  const [userData]: any = useAtom(userDataFromLocalStorage);
  const userDataObj = JSON.parse(userData);
  const {
    response,
    error,
    setResponse,
    questionsLocalStorage,
    fetchData,
    loading,
  } = useFetch(url);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setCurrentQuestionNumber]: any = useAtom(
    currentQuestionNumberLocalStorage
  );

  const [isQuizOngoing, setIsQuizOngoing] = useAtom(quizOngoing);
  const [quizStartAt, setQuizStartAt]: any = useAtom(quizStartAtLocalStorage);
  const [isQuizStart, setIsQuizStart] = useAtom(quizStart);
  const [time, setTime] = useState<number>(timer);
  const interval: React.MutableRefObject<any> = useRef(null);
  const isStart = !isQuizStart && !isQuizOngoing;

  const syncTimerSeconds = Math.floor(
    parseFloat(quizStartAt) + parseFloat(timer) - getSecondFromDateNow()
  );

  const startQuiz = async () => {
    setIsQuizStart(true);
    await fetchData();
    setCurrentQuestionNumber(0);
    clearInterval(interval.current);
    setQuizStartAt(getSecondFromDateNow());
    setTime(
      Math.floor(
        getSecondFromDateNow() + parseFloat(timer) - getSecondFromDateNow()
      )
    );

    setIsQuizOngoing(true);

    if (time !== timer) {
      setTime(timer);
    }

    interval.current = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);
  };

  const resumetQuiz = () => {
    clearInterval(interval.current);
    setIsQuizStart(true);

    setTime(syncTimerSeconds);

    setIsQuizOngoing(true);

    interval.current = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);
  };

  useEffect(() => {
    if (syncTimerSeconds > 0) {
      setResponse(questionsLocalStorage);
      resumetQuiz();
    }
  }, []);

  useEffect(() => {
    if (time < 0) {
      setIsQuizOngoing(false);
      setQuizStartAt(null);
      return interval.current && clearInterval(interval.current);
    }
  }, [time]);

  if (error) return <ErrorPage code={500} msg={'server error'} />;
  return (
    <section className="mt-24 flex flex-col justify-between h-72 items-center">
      {isStart ? (
        <>
          <div className="text-center mt-12">
            <h1 className="md:text-6xl text-4xl font-bold">
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
          <IsQuizStart loading={loading} time={time} response={response} />
        </Suspense>
      )}
    </section>
  );
};

export default Home;
