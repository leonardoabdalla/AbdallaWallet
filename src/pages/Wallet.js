import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idGlobal: 0,
      formDespesa: {
        id: 0,
        valorDespesa: 0,
        descricaoDespesa: '',
        moeda: 'BRL',
        metodoPagamento: 'Dinheiro',
        categoriaDespesa: 'Transporte',
      },
      despesasTot: [],
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState((prevState) => ({
      formDespesa: {
        ...prevState.formDespesa,
        [name]: value,
      },
    }));
  }

  handleButton = () => {
    const { formDespesa, despesasTot } = this.state;
    const { idGlobal } = this.state;
    formDespesa.id = idGlobal + 1;
    const { id } = formDespesa;
    // if (despesasTot.length > 0) {
    //   this.setState({
    //     formDespesa[id]: id + 1 ,
    //   });
    // }
    this.setState({
      despesasTot: [...despesasTot, formDespesa],
    });
    if (despesasTot.length > 0) {
      this.setState((prevState) => ({
        formDespesa: {
          ...prevState.formDespesa,
          id: prevState.idGlobal + 1,
        },
        idGlobal: prevState.idGlobal + 1,
      }));
    }
  }

  render() {
    const { email } = this.props;
    const { idGlobal } = this.state;
    return (
      <div>
        <div>TrybeWallet</div>
        <header>
          <p data-testid="email-field">{ email }</p>
          <p data-testid="total-field">0</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form>
          <label htmlFor="valorDespesa">
            Valor da Despesa:
            <input
              name="valorDespesa"
              type="number"
              id="valorDespesa"
              data-testid="value-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="descricaoDespesa">
            Descrição da Despesa:
            <input
              id="descricaoDespesa"
              name="descricaoDespesa"
              type="text"
              data-testid="description-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              id="currency"
              name="moeda"
              type="select"
              data-testid="currency-input"
              onChange={ this.handleChange }
            >
              <option value="Moeda">Moeda</option>
            </select>
          </label>
          <label htmlFor="metodoPagamento">
            Método de Pagamento:
            <select
              id="metodoPagamento"
              name="metodoPagamento"
              type="select"
              data-testid="method-input"
              onChange={ this.handleChange }
            >
              <option value="dinheiro">Dinheiro</option>
              <option value="cartaoCredito">Cartão de Crédito</option>
              <option value="cartaoDebito">Cartão de Débito</option>
            </select>
          </label>
          <label htmlFor="categoriaDespesa">
            Categoria da Despesa:
            <select
              id="categoriaDespesa"
              name="categoriaDespesa"
              type="select"
              data-testid="tag-input"
              onChange={ this.handleChange }
            >
              <option value="alimentacao">Alimentação</option>
              <option value="lazer">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="transporte">Transporte</option>
              <option value="saude">Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ this.handleButton }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ user: { email } }) => ({
  email,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Wallet);
