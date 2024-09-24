import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const EditarHotel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [imagem, setImagem] = useState('');
  const [classificacao, setClassificacao] = useState(1);
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagens, setImagens] = useState([]);
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');

  useEffect(() => {
    const hoteisSalvos = JSON.parse(localStorage.getItem('hoteis')) || [];
    const hotel = hoteisSalvos[id];

    if (hotel) {
      setNome(hotel.nome);
      setImagem(hotel.imagem);
      setClassificacao(hotel.classificacao);
      setCidade(hotel.cidade);
      setEstado(hotel.estado);
      setPreco(hotel.preco);
      setDescricao(hotel.descricao);
      setImagens(hotel.imagens);
    } else {
      setMensagemErro('Hotel não encontrado');
    }
  }, [id]);

  const validarFormulario = () => {
    if (!nome || !imagem || !cidade || !estado || !preco) {
      setMensagemErro('Por favor, preencha todos os campos obrigatórios.');
      return false;
    }
    setMensagemErro('');
    return true;
  };

  const atualizarHotel = () => {
    if (!validarFormulario()) return;

    const hoteisSalvos = JSON.parse(localStorage.getItem('hoteis')) || [];
    hoteisSalvos[id] = {
      nome,
      imagem,
      classificacao,
      cidade,
      estado,
      preco,
      descricao,
      imagens,
      favorito: hoteisSalvos[id].favorito || false,
    };
    localStorage.setItem('hoteis', JSON.stringify(hoteisSalvos));

    setMensagemSucesso('Hotel atualizado com sucesso!');
    setTimeout(() => navigate('/'), 1500);
  };

  return (
    <div className="cadastro-hotel">
      <h1>Editar Hotel</h1>
      <form onSubmit={(e) => { e.preventDefault(); atualizarHotel(); }}>
        {mensagemSucesso && <p className="sucesso">{mensagemSucesso}</p>}
        {mensagemErro && <p className="erro">{mensagemErro}</p>}

        <label>Nome:</label>
        <input value={nome} onChange={(e) => setNome(e.target.value)} required />

        <label>Imagem (URL):</label>
        <input value={imagem} onChange={(e) => setImagem(e.target.value)} required />

        <label>Classificação:</label>
        <input type="number" min="1" max="5" value={classificacao} onChange={(e) => setClassificacao(e.target.value)} required />

        <label>Cidade:</label>
        <input value={cidade} onChange={(e) => setCidade(e.target.value)} required />

        <label>Estado:</label>
        <input value={estado} onChange={(e) => setEstado(e.target.value)} required />

        <label>Preço da Diária:</label>
        <input type="number" value={preco} onChange={(e) => setPreco(e.target.value)} required />

        <label>Descrição:</label>
        <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} required />

        <label>Imagens Adicionais (URLs separadas por vírgula):</label>
        <input value={imagens} onChange={(e) => setImagens(e.target.value.split(','))} />

        <button type="submit">Atualizar Hotel</button>
      </form>
    </div>
  );
};

export default EditarHotel;
