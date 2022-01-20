import React from 'react';
import { useRef } from 'react';
import axios from 'axios';

export default function Search({ setWord }) {
  const wordRed = useRef(null);
  const posRef = useRef(null);
  const searchFor = async (e) => {
    e.preventDefault();
    const word = wordRed.current.value;
    const pos = posRef.current.value;
    const searchUrl = !pos
      ? `http://localhost:3001/${word}`
      : `http://localhost:3001/${word}/${pos}`;
    const response = await axios.get(searchUrl);
    console.log(response);
    setWord(response.data);
    wordRed.current.value = '';
    posRef.current.value = null;
  };

  return (
    <form onSubmit={searchFor}>
      <input type='text' ref={wordRed} />
      <select defaultValue='' ref={posRef}>
        <option value='' disabled>
          - select POS -
        </option>
        <option value='placeholder'>placeholder</option>
        <option value='placeholder'>placeholder</option>
        <option value='placeholder'>placeholder</option>
        <option value='placeholder'>placeholder</option>
        <option value='placeholder'>placeholder</option>
        <option value='placeholder'>placeholder</option>
        <option value='placeholder'>placeholder</option>
        <option value='placeholder'>placeholder</option>
      </select>
      <button type='submit'>Search</button>
    </form>
  );
}
