import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ListagemHoteis from './pages/ListagemHoteis';
import DetalhesHotel from './pages/DetalhesHotel';
import CadastroHotel from './pages/CadastroHotel'
import EditarHotel from './pages/EditarHotel';
import Favoritos from './pages/Favoritos';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListagemHoteis />} />
        <Route path="/detalhes/:id" element={<DetalhesHotel />} />
        <Route path="/cadastro" element={<CadastroHotel />} /> 
        <Route path="/editar/:id" element={<EditarHotel />} />
        <Route path="/favoritos" element={<Favoritos />} />
      </Routes>
    </Router>
  )
}

export default App;