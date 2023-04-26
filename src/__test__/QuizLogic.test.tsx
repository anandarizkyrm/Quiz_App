import { userDataFromLocalStorage } from '../atoms';
import Home from '../pages/Home';
import {
  act,
  cleanup,
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from '@testing-library/react';
import fetchMock from 'fetch-mock';
import { useAtom } from 'jotai';
import { BrowserRouter } from 'react-router-dom';
import { describe } from 'vitest';

const mockUserData = { username: 'John Doe', password: 'dsdsd' };

const mockQuestion = {
  response_code: 0,
  results: [
    {
      category: 'Entertainment: Video Games',
      type: 'multiple',
      difficulty: 'easy',
      question:
        'What&#039;s the name of the main protagonist in the &quot;Legend of Zelda&quot; franchise?',
      correct_answer: 'Link',
      incorrect_answers: ['Mario', 'Zelda', 'Pit'],
    },
    {
      category: 'Entertainment: Film',
      type: 'multiple',
      difficulty: 'medium',
      question:
        'What does TIE stand for in reference to the TIE Fighter in &quot;Star Wars&quot;?',
      correct_answer: 'Twin Ion Engine',
      incorrect_answers: [
        'Twin Iron Engine',
        'Twin Intercepter Engine',
        'Twin Inception Engine',
      ],
    },
    {
      category: 'Entertainment: Video Games',
      type: 'multiple',
      difficulty: 'medium',
      question:
        'In what Half-Life expansion can you find Gordon&#039;s picture in an &quot;Employee of the Month&quot; picture frame?',
      correct_answer: 'Half-Life: Opposing Force',
      incorrect_answers: [
        'Half-Life: Blue Shift',
        'Half-Life: Decay',
        'They Hunger',
      ],
    },
    {
      category: 'Entertainment: Cartoon & Animations',
      type: 'multiple',
      difficulty: 'medium',
      question:
        'Who is the &quot;dumb blonde&quot; character in Nickelodeon&#039;s &quot;The Loud House&quot;?',
      correct_answer: 'Leni',
      incorrect_answers: ['Luan', 'Luna', 'Lincoln'],
    },
    {
      category: 'Sports',
      type: 'boolean',
      difficulty: 'easy',
      question: 'Roger Federer is a famous soccer player.',
      correct_answer: 'False',
      incorrect_answers: ['True'],
    },
  ],
};

const url = `https://opentdb.com/api.php?amount=${
  import.meta.env.VITE_TOTAL_QUESTIONS
}`;

const renderApp = () =>
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
const { result } = renderHook(() => useAtom(userDataFromLocalStorage));
const [, setUser] = result.current;

act(() => {
  setUser(JSON.stringify(mockUserData));
});

afterEach(() => {
  fetchMock.restore();
  cleanup();
});
describe('Quiz Logic', () => {
  it('Quiz Logic Render Correctly', async () => {
    renderApp();

    // check if the welcome message is correct
    const welcomeWithUsername = await screen.findByText(
      `Welcome ${mockUserData.username}`
    );

    expect(welcomeWithUsername).toBeInTheDocument();
  });

  it('Quiz Start Number Checking', async () => {
    renderApp();

    // check quiz start logic
    const btnStart = await screen.getByTestId('start-quiz');

    fetchMock.get(url, JSON.stringify(mockQuestion));

    expect(btnStart).toBeInTheDocument();
    fireEvent.click(btnStart);

    await waitFor(() => {
      const optA = screen.getByTestId('option-0');
      mockQuestion.results.forEach((item, idx) => {
        const number = screen.getByTestId(`number-${idx + 1}`);
        expect(number).toBeInTheDocument();
        fireEvent.click(optA);
      });
    });
    // return home btn test
    const returnHome = await screen.getByTestId('return-home-btn');
    fireEvent.click(returnHome);
  });

  it('Quiz Choose the right answer and make sure the result is correct', async () => {
    renderApp();

    // check quiz start logic
    const btnStart = await screen.getByTestId('start-quiz');

    fetchMock.get(url, JSON.stringify(mockQuestion));

    expect(btnStart).toBeInTheDocument();
    fireEvent.click(btnStart);

    await waitFor(async () => {
      // choose the right answer
      const optionNumber1 = await screen.getByText('Link');
      expect(optionNumber1).toBeInTheDocument();
      fireEvent.click(optionNumber1);

      const optionNumber2 = await screen.getByText('Twin Ion Engine');
      expect(optionNumber2).toBeInTheDocument();
      fireEvent.click(optionNumber2);

      const optionNumber3 = await screen.getByText('Half-Life: Opposing Force');
      expect(optionNumber3).toBeInTheDocument();
      fireEvent.click(optionNumber3);

      const optoptionNumber4 = await screen.getByText('Leni');
      expect(optoptionNumber4).toBeInTheDocument();
      fireEvent.click(optoptionNumber4);

      const optionNumber5 = await screen.getByText('False');
      expect(optionNumber5).toBeInTheDocument();
      fireEvent.click(optionNumber5);

      // check result

      const correctAnswer = screen.getByTestId('correct-answer');
      expect(correctAnswer.innerHTML).toEqual('5');

      const incorrectAnswer = screen.getByTestId('incorrect-answer');
      expect(incorrectAnswer.innerHTML).toEqual('0');

      const answeredQuestions = screen.getByTestId('answered-questions');
      expect(answeredQuestions.innerHTML).toEqual('5');

      const totalQuestions = screen.getByTestId('total-questions');
      expect(totalQuestions.innerHTML).toEqual('5');

      // return home btn test

      const returnHome = await screen.getByTestId('return-home-btn');
      fireEvent.click(returnHome);
    });
  });
});
