import { questionFromLocalStorage } from '../atoms';
import { useAtom } from 'jotai';
import React, { useState } from 'react';

export const useFetch = (url: string) => {
  const [response, setResponse] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = useState(false);
  const [questionsLocalStorage, setQuestionLocalStorage]: any = useAtom(
    questionFromLocalStorage
  );

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(url);
      const json = await res.json();
      setResponse(json);
      setLoading(false);
      setQuestionLocalStorage(json);
    } catch (error: any) {
      setError(error);
      setLoading(false);
    }
  };

  return {
    response,
    error,
    fetchData,
    setResponse,
    questionsLocalStorage,
    loading,
  };
};
