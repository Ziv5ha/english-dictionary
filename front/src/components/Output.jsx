import React from 'react';
import Word from './Word';

export default function Output({ word, setWord }) {
  if (!word) return <div>Try searching for a word</div>;
  if (word.length === 0) return <div>Could Not Find Word</div>;
  return word.map((dict) => (
    <div>
      <h3>{dict.word}</h3>
      <p>{dict.pos}</p>
      {dict.definitions.map((def) => {
        const slicedDef = def.split(' ');
        return (
          <div>
            {slicedDef.map((word) => (
              <Word word={word} setWord={setWord} />
            ))}
          </div>
        );
      })}
    </div>
  ));
}