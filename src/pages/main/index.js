import React, { Component } from 'react'
import api from '../../services/api';
import { Link } from 'react-router-dom';
import Loading from '../../components/loading'

import "./styles.css";

export default class Main extends Component {

    state = {
        countries: [],
        continentes: ['África', 'América', 'Ásia', 'Europa', 'Oceania'],
        loading: true,
        escolhido: 'África'
    }

    componentDidMount() {
        this.loadCountries();
    }

    loadCountries = async () => {
        const response = await api.get('/continentes/1/paises');
        this.setState({ loading: false });
        this.setState({ countries: response.data });
    }

    render() {

        const { countries, loading, continentes, escolhido } = this.state

        if (loading) {
            return <Loading />
        } else {
            return (
                <div>
                    <div className="country-list">

                        <div className="botoes">

                            {continentes.map(value => {

                                //Por onclick aqui
                                if (value === escolhido) {
                                    return <a href="#" className="active">{value}</a>
                                } else {
                                    return <a href="#">{value}</a>
                                }

                            })}

                        </div>

                        {countries.map(contry => (
                            <article key={contry.id}>
                                <strong>{contry.nome}</strong>
                                <p>{contry.capital}</p>
                                <p>{contry.populacao}</p>
                                <Link to={`/details/${contry.nome}`}>Detalhes</Link>
                            </article>
                        ))}
                        
                    </div>
                </div>

            )
        }
    }
}