import React from 'react';
import axios from 'axios';
import '../styles/word.css';

export default function Word({ word, setWord }) {
  const searchFor = async () => {
    const searchWord = word.replace(/[.,/\\!?'"`;+|{}()%$@#*^&]/g, '');
    const response = await axios.get(`http://localhost:3001/${searchWord}`);
    setWord(response.data);
  };

  return (
    <span onClick={searchFor}>
      <span className='link'>{word}</span>{' '}
    </span>
  );
}
