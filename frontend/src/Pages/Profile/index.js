import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiEdit2, FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../Services/api';

import "./styles.css"

import logoImg from '../../assets/logo.svg'

export default function Profile() {
    const [incidents, setIncidents] = useState([]);

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');
    const history = useHistory();


    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);


    async function handleEditIncident(id) {
        history.push({

            pathname: `/incidents/edit/${id}`,
            state: {
                id: 7,
                color: 'green'
            }

        });
    }

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });


            setIncidents(incidents.filter(incident => incident.id !== id));
        }
        catch (err) {
            alert('Erro ao deletar caso, tente novamente.');
        }
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/');

    }


    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero" />
                <span> Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {incidents.map(incident => (

                    <li key={incident.id}>
                        <button onClick={() => handleEditIncident(incident.id, incident.title, incident.description, incident.value)} type="button">
                            <FiEdit2 size={20} color="#a8a8b3" />
                        </button>


                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>

                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR',
                            {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(incident.value)}</p>





                    </li>
                ))}
            </ul>

        </div>
    );
}