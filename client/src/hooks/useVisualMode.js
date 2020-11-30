import { useState } from 'react';

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  
  const notify = () => {
    setMode("occupied");
  }

  const cancel = () => {
    setMode("empty");
  }

  return { mode, notify, cancel };
}

export default useVisualMode;