/* eslint-disable @typescript-eslint/no-unused-vars */
import { isQuizStart } from '../../atoms';
import { useAtom } from 'jotai';

interface ResultProps {
  score: number;
  userAnswer: number[];
}

const Result = ({ score, userAnswer }: ResultProps) => {
  const totalQuestion: any = import.meta.env.VITE_TOTAL_ANSWER;
  const [restartQuiz, setRestartQuiz] = useAtom(isQuizStart);

  return (
    <div className="w-full border input-color border-gray-700 p-6 rounded-lg flex flex-col  justify-center mt-12">
      <div>
        <h1 className="text-4xl font-bold">Here Is Your Result</h1>
        <div className="mt-6 text-gray-500">
          <table className="text-2xl">
            <tbody>
              <tr>
                <td>Correct Answers : </td>
                <td className="pl-12 text-gray-300 font-bold"> {score}</td>
              </tr>
              <tr>
                <td>Incorrect Answers : </td>
                <td className="pl-12 text-gray-300 font-bold">
                  {' '}
                  {totalQuestion - score}
                </td>
              </tr>
              <tr>
                <td>Answered Questions: </td>
                <td className="pl-12 text-gray-300 font-bold">
                  {' '}
                  {userAnswer.length}
                </td>
              </tr>
              <tr>
                <td>Total Questions: </td>
                <td className="pl-12 text-gray-300 font-bold">
                  {' '}
                  {totalQuestion}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button
          onClick={() => setRestartQuiz(false)}
          className="bg-blue-700 p-2 rounded-lg float-right px-2 hover:bg-blue-800 font-bold"
        >
          Return Home ?
        </button>
      </div>
    </div>
  );
};

export default Result;
