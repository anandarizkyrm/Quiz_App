interface ResultProps {
  score: number;
  userAnswer: number[];
}

const Result = ({ score, userAnswer }: ResultProps) => {
  return (
    <div className="w-full pb-24">
      <h1 className="text-5xl font-bold">Here Is Your Result</h1>
      <div className="mt-12">
        <h1 className="text-4xl ">Correct Answer {score}</h1>
        <h1 className="text-4xl ">Incorrect Answer {5 - score}</h1>
        <h1 className="text-4xl ">You Answered {userAnswer.length} Question</h1>
      </div>
    </div>
  );
};

export default Result;
