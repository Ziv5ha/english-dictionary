import React from 'react';
import { useRef } from 'react';
import axios from 'axios';
import '../styles/search.css';

export default function Search({ setWord }) {
  const wordRed = useRef(null);
  const posRef = useRef(null);
  const searchFor = async (e) => {
    e.preventDefault();
    const word = wordRed.current.value;
    const pos = posRef.current.value;
    const searchUrl = !pos
      ? `https://0ogm50f5ie.execute-api.eu-west-1.amazonaws.com/dev/${word}`
      : `https://0ogm50f5ie.execute-api.eu-west-1.amazonaws.com/dev/${word}/${pos}`;
    const response = await axios.get(searchUrl);
    setWord(response.data);
    wordRed.current.value = '';
    posRef.current.value = null;
  };
  const posArr = [
    'n.',
    'prep.',
    'a.',
    'v.',
    'adv.',
    'p.',
    'interj.',
    'conj.',
    'pron.',
  ];
  const options = posArr.map((pos) => (
    <option key={pos} value={pos}>
      {pos}
    </option>
  ));

  return (
    <form onSubmit={searchFor}>
      <input type='text' ref={wordRed} />
      <div>
        <select defaultValue='' ref={posRef}>
          <option value='' disabled></option>
          {options}
        </select>
        <button type='submit'>Search</button>
      </div>
    </form>
  );
}
