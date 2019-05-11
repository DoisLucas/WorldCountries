import React, { Component } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import Loading from "../../components/loading";

import "./styles.css";

export default class Main extends Component {
  state = {
    countries: [],
    continentes: [],
    loading: true,
    escolhido: ""
  };

  componentDidMount() {
    this.loadContinentes();
    this.loadCountries();
  }

  loadContinentes = async () => {
    const response = await api.get("/continentes");
    this.setState({ continentes: response.data });
    this.setState({ escolhido: this.state.continentes[0].nome });
  };

  loadCountries = async (id = 1) => {
    this.setState({ loading: true });
    const response = await api.get(`/continentes/${id}/paises`);
    this.setState({ loading: false });
    this.setState({
      countries: response.data.sort((a, b) => a.nome.localeCompare(b.nome))
    });
  };

  changeBycontinente = async cont => {
    this.setState({ escolhido: cont.nome });
    this.loadCountries(cont.id);
  };

  render() {
    const { countries, loading, continentes, escolhido } = this.state;

    return (
      <div className="country-list">
        <div className="botoes">
          {continentes.map(continente => {
            if (continente.nome === escolhido) {
              return (
                <a
                  key={continente.id}
                  onClick={() => this.changeBycontinente(continente)}
                  href="#not"
                  className="active"
                >
                  {continente.nome}
                </a>
              );
            } else {
              return (
                <a
                  key={continente.id}
                  onClick={() => this.changeBycontinente(continente)}
                  href="#not"
                >
                  {" "}
                  {continente.nome}
                </a>
              );
            }
          })}
        </div>

        {/* Op Ternario */}

        {loading ? (
          <Loading />
        ) : (
          <div>
            {countries.map(contry => (
              <article key={contry.id}>
                <strong>{contry.nome}</strong>
                <p>Capital: {contry.capital}</p>
                <p>População: {contry.populacao}</p>
                <Link to={`/details/${contry.nome}`}>Detalhes</Link>
              </article>
            ))}{" "}
          </div>
        )}
      </div>
    );
  }
}
