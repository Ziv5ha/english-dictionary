import React from 'react';
import axios from 'axios';
import '../styles/word.css';

export default function Word({ word, setWord }) {
  const searchFor = async () => {
    const searchWord = word.replace(/[.,/\\!?'"`;+|{}()%$@#*^&]/g, '');
    const response = await axios.get(
      `https://0ogm50f5ie.execute-api.eu-west-1.amazonaws.com/dev${searchWord}`
    );
    setWord(response.data);
  };

  return (
    <span onClick={searchFor}>
      <span className='link'>{word}</span>{' '}
    </span>
  );
}
