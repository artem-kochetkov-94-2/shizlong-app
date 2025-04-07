import { useState, useRef, useEffect } from 'react';

function useKeyboardVisibility() {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const inputRef = useRef<any | null>(null);

  useEffect(() => {
    const handleFocus = () => {
      setIsKeyboardVisible(true);

      if (inputRef.current) {
        inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };

    const handleBlur = () => {
      setIsKeyboardVisible(false);
    };

    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener('focus', handleFocus);
      inputElement.addEventListener('blur', handleBlur);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener('focus', handleFocus);
        inputElement.removeEventListener('blur', handleBlur);
      }
    };
  }, []);

  return { inputRef, isKeyboardVisible, setIsKeyboardVisible };
}

export default useKeyboardVisibility; 