import React, { Component } from 'react';
import api from '../../services/api';
import Loading from '../../components/loading'

import "./styles.css";

export default class Detail extends Component {

    state = {
        contry: {},
        teste: '',
        loading: true,
        flag: 'http://evoleotech.com/wp-content/uploads/2014/07/dummy.jpg'
    };

    async componentDidMount() {

        //Pegando parametro da URL
        const { name } = this.props.match.params;
        const response = await api.get(`/paises?nome=${name}`)
        this.setState({ teste: name, contry: response.data[0] });
        this.getFlag();
        this.setState({ loading: false})
    }

    getFlag = () => {
        //const { contry } = this.state;
        //this.setState({ flag: `http://flags.fmcdn.net/data/flags/w580/${contry.nome}.png`})
    }

    render() {

        const { contry, loading,flag } = this.state;

        if (loading) {
            return <Loading />
        } else {
            return (
                <div className="wrap">
                    <div className="details">
                        <img src={flag} alt="bandeira"></img>
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