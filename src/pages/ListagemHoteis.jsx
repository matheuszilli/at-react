import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/ListagemHoteis.css';

const ListagemHoteis = () => {
  const [hoteis, setHoteis] = useState([]);
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [criterioOrdenacao, setCriterioOrdenacao] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const hoteisSalvos = JSON.parse(localStorage.getItem('hoteis')) || [];
    setHoteis(hoteisSalvos);
  }, []);

  const excluirHotel = (index) => {
    const confirmacao = window.confirm('Tem certeza que deseja excluir este hotel?');
    if (confirmacao) {
      const hoteisAtualizados = hoteis.filter((_, i) => i !== index);
      localStorage.setItem('hoteis', JSON.stringify(hoteisAtualizados));
      setHoteis(hoteisAtualizados);
      navigate('/');
    }
  };

  const marcarFavorito = (index) => {
    const hoteisAtualizados = hoteis.map((hotel, i) => {
      if (i === index) {
        return { ...hotel, favorito: !hotel.favorito }; 
      }
      return hotel;
    });
    localStorage.setItem('hoteis', JSON.stringify(hoteisAtualizados));
    setHoteis(hoteisAtualizados); 
  };

  const ordenarHoteis = (criterio) => {
    const hoteisOrdenados = [...hoteis].sort((a, b) => {
      if (criterio === 'preco') {
        return a.preco - b.preco;
      } else if (criterio === 'classificacao') {
        return b.classificacao - a.classificacao;
      }
      return 0;
    });
    setHoteis(hoteisOrdenados);
  };

  const hoteisFiltrados = hoteis.filter(hotel =>
    hotel.nome.toLowerCase().includes(termoPesquisa.toLowerCase())
  );

  return (
    <div>
      <h1>Lista de Hotéis</h1>

      <input
        type="text"
        placeholder="Pesquisar hotéis"
        value={termoPesquisa}
        onChange={(e) => setTermoPesquisa(e.target.value)}
      />

      <select onChange={(e) => setCriterioOrdenacao(e.target.value)}>
        <option value="">Ordenar por</option>
        <option value="preco">Preço</option>
        <option value="classificacao">Classificação</option>
      </select>
      <button onClick={() => ordenarHoteis(criterioOrdenacao)}>Ordenar</button>

      <div className="lista-hoteis">
        {hoteisFiltrados.length > 0 ? (
          hoteisFiltrados.map((hotel, index) => (
            <div key={index} className="card-hotel">
              <img src={hotel.imagem} alt={hotel.nome} />
              <h2>{hotel.nome}</h2>
              <p>{hotel.cidade}, {hotel.estado}</p>
              <p>Classificação: {hotel.classificacao} estrelas</p>
              <p>Diária: R${hotel.preco}</p>
              <div className='acoes-card'>
                <Link to={`/detalhes/${index}`}>Ver Detalhes</Link>
                <Link to={`/editar/${index}`}>Editar Hotel</Link>
                <button onClick={() => excluirHotel(index)}>Excluir Hotel</button>
                <button onClick={() => marcarFavorito(index)}>
                  {hotel.favorito ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum hotel encontrado.</p>
        )}
      </div>

      <Link to="/cadastro">Cadastrar Novo Hotel</Link>
      <Link to="/favoritos">Ver Favoritos</Link>
    </div>
  );
};

export default ListagemHoteis;
