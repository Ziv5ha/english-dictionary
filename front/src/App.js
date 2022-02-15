import { useState } from 'react';
import Output from './components/Output';
import Search from './components/Search';

function App() {
  const [word, setWord] = useState(null);
  return (
    <div className='App'>
      <Search setWord={setWord} />
      <Output word={word} setWord={setWord} />
    </div>
  );
}

export default App;
