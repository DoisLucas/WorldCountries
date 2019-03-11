import React, { Component } from 'react';
import api from '../../services/api';
import Loading from '../../components/loading'

import "./styles.css";

export default class Detail extends Component {

    state = {
        contry: {},
        loading: true,
        flag: ''
    };

    async componentDidMount() {

        //Pegando parametro da URL
        const { name } = this.props.match.params;
        const response = await api.get(`/paises?nome=${name}`)
        this.setState({ contry: response.data[0] });
        this.getFlag();
        this.setState({ loading: false })
    }

    handleNome = (nome) => {
        return nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/ /g, "_");
    }

    getFlag = () => {
        const { contry } = this.state;
        var nome_tratado = this.handleNome(contry.nome);
        this.setState({ flag: `https://aimore.net/band/${nome_tratado}.jpg` })

    }

    erroImagem = (image) => {
        this.setState({ flag: 'http://evoleotech.com/wp-content/uploads/2014/07/dummy.jpg' })
    }

    render() {

        const { contry, loading, flag } = this.state;

        if (loading) {
            return <Loading />
        } else {
            return (
                <div className="wrap">
                    <div className="details">
                        <img src={flag} onError={ () => { this.erroImagem(this) }} alt="Bandeira"></img>
                        <h1>{contry.nome}</h1>
                        <p>Capital: {contry.capital}</p>
                        <p>População: {contry.populacao}</p>
                        <p>Área: {contry.area}</p>
                        <p>Governo: {contry.governo}</p>
                        <p>Linguas: {contry.linguas}</p>
                        <p>Lema: {contry.lema}</p>
                        <p>Hino: {contry.hino}</p>
                    </div>
                </div>
            )
        }
    }
}