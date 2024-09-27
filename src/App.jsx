import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ThemeContext } from './ThemeContext';


import ListagemHoteis from './pages/ListagemHoteis';
import DetalhesHotel from './pages/DetalhesHotel';
import CadastroHotel from './pages/CadastroHotel';
import EditarHotel from './pages/EditarHotel';
import Favoritos from './pages/Favoritos';

function App() {
  const { tema, alternarTema } = useContext(ThemeContext);

  return (
    <div className={`app ${tema}`}>
      <Router>
        <header>
          <nav>
            <Link to="/">Início</Link>
            <Link to="/cadastro">Cadastrar Hotel</Link>
            <Link to="/favoritos">Favoritos</Link>
            <button onClick={alternarTema}>
              Alternar para tema {tema === 'claro' ? 'escuro' : 'claro'}
            </button>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<ListagemHoteis />} />
          <Route path="/detalhes/:id" element={<DetalhesHotel />} />
          <Route path="/cadastro" element={<CadastroHotel />} />
          <Route path="/editar/:id" element={<EditarHotel />} />
          <Route path="/favoritos" element={<Favoritos />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
