import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Favoritos = () => {
  const [hoteisFavoritos, setHoteisFavoritos] = useState([]);

  useEffect(() => {
    const hoteisSalvos = JSON.parse(localStorage.getItem('hoteis')) || [];
    const hoteisFavoritosFiltrados = hoteisSalvos.filter(hotel => hotel.favorito);
    setHoteisFavoritos(hoteisFavoritosFiltrados);
  }, []);

  return (
    <div>
      <h1>Hotéis Favoritos</h1>
      {hoteisFavoritos.length > 0 ? (
        <div className="lista-hoteis-favoritos">
          {hoteisFavoritos.map((hotel, index) => (
            <div key={index} className="card-hotel">
              <img src={hotel.imagem} alt={hotel.nome} />
              <h2>{hotel.nome}</h2>
              <p>{hotel.cidade}, {hotel.estado}</p>
              <p>Classificação: {hotel.classificacao} estrelas</p>
              <p>Diária: R${hotel.preco}</p>
              <Link to={`/detalhes/${index}`}>Ver Detalhes</Link>
            </div>
          ))}
        </div>
      ) : (
        <p>Nenhum hotel marcado como favorito.</p>
      )}
      <Link to="/">Voltar para a Lista de Hotéis</Link>
    </div>
  );
};

export default Favoritos;
