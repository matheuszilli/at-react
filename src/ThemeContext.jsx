import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const temaInicial = localStorage.getItem('tema') || 'claro';
  const [tema, setTema] = useState(temaInicial);

  useEffect(() => {
    localStorage.setItem('tema', tema);
  }, [tema]);

  const alternarTema = () => {
    setTema((temaAnterior) => (temaAnterior === 'claro' ? 'escuro' : 'claro'));
  };

  return (
    <ThemeContext.Provider value={{ tema, alternarTema }}>
      {children}
    </ThemeContext.Provider>
  );
};
