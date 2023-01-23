import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const userDataFromLocalStorage: any = atomWithStorage('userData', null);

export const quizStartAtLocalStorage: any = atomWithStorage(
  'quizStartAt',
  null
);

export const questionFromLocalStorage: any = atomWithStorage('questions', null);

export const currentQuestionNumberLocalStorage: any = atomWithStorage(
  'currentQuestion',
  0
);

export const isQuizOngoing = atom(false);
export const isQuizStart = atom(false);

export const scoreFromLocalStorage = atomWithStorage<number>('score', 0);

export const userAnswerLocalStorage = atomWithStorage<any[]>('userAnswer', []);
