import React, { useState ,useEffect} from 'react';
import { Link, useHistory,useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../Services/api'

import './styles.css';

import logoImg from '../../assets/logo.svg'


export default function EditIncident() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const { id } = useParams();

    const history = useHistory();

    
    useEffect(() => {
        api.get(`incidents/${id}`).then       
        (response => {
            setTitle(response.data[0].title);
            setDescription(response.data[0].description);
            setValue(response.data[0].value);
        })
    }, [id]);


    async function handleEditIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };


        try {
            await api.put(`incidents/${id}`, data);

            history.push('/profile');

        } catch (err) {
            alert('Erro ao Atualizar caso, tente novamente.');
        }

    }


    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um
                    herói para resolver isso.
                </p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                    Voltar para home
                </Link>
                </section>

                <form onSubmit={handleEditIncident}>
                    <input
                        placeholder="Título do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />

                    <input
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}