import React, { Component } from 'react';
import api from '../../services/api';
import Loading from '../../components/loading'

import "./styles.css";

export default class Detail extends Component {

    state = {
        contry: {},
        teste: '',
        loading: true
    };

    async componentDidMount() {

        //Pegando parametro da URL
        const { name } = this.props.match.params;
        const response = await api.get(`/paises?nome=${name}`)
        this.setState({ teste: name, loading: false, contry: response.data[0] });
    }

    render() {

        const { contry, loading } = this.state;

        if (loading) {
            return <Loading />
        } else {
            return (
                <div className="wrap">
                    <div className="details">
                        <h1>{contry.nome}</h1>
                        <p>{contry.capital}</p>
                        <p>{contry.populacao}</p>
                        <p>{contry.area}</p>
                        <p>{contry.governo}</p>
                        <p>{contry.linguas}</p>
                        <p>{contry.lema}</p>
                        <p>{contry.hino}</p>
                    </div>
                </div>
            )
        }
    }
}