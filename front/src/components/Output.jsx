import React from 'react';
import Word from './Word';
import '../styles/output.css';

export default function Output({ word, setWord }) {
  if (!word) return <div>Try searching for a word</div>;
  if (word.length === 0) return <div>Could Not Find Word</div>;
  return word.map((dict) => (
    <div key={dict.pos}>
      <h3>{dict.word}</h3>
      <p className='pos'>{dict.pos}</p>
      {dict.definitions.map((def, i) => {
        const slicedDef = def.split(' ');
        return (
          <div key={slicedDef[i]}>
            {slicedDef.map((word, i) => (
              <Word key={word + i} word={word} setWord={setWord} />
            ))}
          </div>
        );
      })}
    </div>
  ));
}
