import React, { useState, useRef, useEffect } from 'react';

const AuthCodeInput = ({ length = 6, onComplete }) => {
  const [code, setCode] = useState(Array(length).fill(''));
  const inputs = useRef([]);

  useEffect(() => {
    inputs.current[0].focus();
  }, []);

  useEffect(() => {
    if (code.every(digit => digit !== '')) {
      onComplete(code.join(''));
    }
  }, [code, onComplete]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newCode = [...code];
    newCode[index] = element.value;
    setCode(newCode);

    if (element.nextSibling && element.value !== '') {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').slice(0, length);
    const newCode = [...code];
    for (let i = 0; i < pastedData.length; i++) {
      if (isNaN(pastedData[i])) continue;
      newCode[i] = pastedData[i];
    }
    setCode(newCode);
    inputs.current[Math.min(pastedData.length, length - 1)].focus();
  };

  return (
    <div style={{ display: 'flex', gap: '8px' }} onPaste={handlePaste}>
      {code.map((digit, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(ref) => (inputs.current[index] = ref)}
          style={{
            width: '40px',
            height: '40px',
            fontSize: '24px',
            textAlign: 'center',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
          aria-label={`Digit ${index + 1} of authentication code`}
        />
      ))}
    </div>
  );
};

export default AuthCodeInput;