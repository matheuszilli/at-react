import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const DetalhesHotel = () => {
    const { id } = useParams();
    const [hotel, setHotel] = useState(null);
    const [imagemPrincipal, setImagemPrincipal] = useState('');
    const [temporizador, setTemporizador] = useState(null); 

    useEffect(() => {
        const hoteisSalvos = JSON.parse(localStorage.getItem('hoteis')) || [];
        const hotelSelecionado = hoteisSalvos[id];
        setHotel(hotelSelecionado);

        if (hotelSelecionado) {
            setImagemPrincipal(hotelSelecionado.imagem);
        }
    }, [id]);

    if (!hotel) {
        return <p>Opsss... Hotel não encontrado</p>;
    }

    const alterarImagem = (img) => {
        if (temporizador) {
            clearTimeout(temporizador);  
        }

        setImagemPrincipal(img);
    };

    const iniciarTemporizador = () => {
        const novoTemporizador = setTimeout(() => {
            setImagemPrincipal(hotel.imagem);
        }, 5000); 

        setTemporizador(novoTemporizador); 
    };

    return (
        <div className="detalhes-hotel">
            <h1>{hotel.nome}</h1>
            <p>{hotel.cidade}, {hotel.estado}</p>
            <p>Classificação: {hotel.classificacao} estrelas</p>
            <p>Diária: R${hotel.preco}</p>
            <p>Descrição: {hotel.descricao}</p>

            <div className="imagem-principal">
                <img src={imagemPrincipal} alt="Imagem principal do hotel" />
            </div>

            <div className="imagens-hotel">
                {hotel.imagens && hotel.imagens.map((img, index) => (
                    <img 
                        key={index} 
                        src={img} 
                        alt={`Imagem ${index + 1} do hotel`} 
                        onMouseOver={() => alterarImagem(img)} 
                        onMouseLeave={iniciarTemporizador} 
                        style={{ cursor: 'pointer', margin: '10px', width: '100px' }} 
                    />
                ))}
            </div>
            <div className='acoes-card'>
            <Link to="/">Voltar para o Inicio</Link>
            <Link to={`/editar/${id}`}>Editar Hotel</Link>
            </div>
        </div>
    );
}

export default DetalhesHotel;
