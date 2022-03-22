import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionExpenses, recebendoApi } from '../actions';
import Table from '../components/Table';
import FormEdit from '../components/FormEdit';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formDespesa: {
        value: 0,
        description: '',
        currency: 'BRL',
        method: 'Dinheiro',
        tag: 'Transporte',
        exchangeRates: [],
      },
      separaMoeda: [],
      edit: false,
      editId: 0,
    };
  }

  async componentDidMount() {
    const { saveApi } = this.props;
    await saveApi();
    this.validacaoCurrenci();
  }

  validacaoCurrenci = () => {
    const { currencies } = this.props;
    if (currencies.length !== 0) {
      const recebeMoeda = Object.keys(currencies);
      this.setState({
        separaMoeda: [...recebeMoeda],
      });
    }
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
    const { saveExpenses, saveApi, currencies } = this.props;
    saveApi();
    this.setState((prevState) => ({
      formDespesa: {
        ...prevState.formDespesa,
        exchangeRates: { ...currencies },
      },
    }), () => {
      const { formDespesa } = this.state;
      saveExpenses(formDespesa);
      this.setState((prevState) => ({
        formDespesa: {
          ...prevState.formDespesa,
          value: '',
        },
      }));
    });
  }

  somaValores = () => {
    const { expenses } = this.props;
    if (expenses.length !== 0) {
      const total = expenses.reduce((acc, { value, currency, exchangeRates }) => {
        const { ask } = exchangeRates[currency];
        acc += (Number(value) * Number(ask));
        return acc;
      }, 0);
      return total;
    }
    const total = 0;
    return total;
  }

  editTable = (id) => {
    this.setState({
      edit: true,
      editId: id,
    });
  }

  handleEdit = () => {
    this.setState({
      edit: false,
      editId: 0,
    });
  }

  render() {
    const { email } = this.props;
    const { separaMoeda, formDespesa, editId, edit } = this.state;
    return (
      <div>
        <div>TrybeWallet</div>
        <header>
          <p data-testid="email-field">{ email }</p>
          <p data-testid="total-field">{ this.somaValores() }</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        { edit
          ? (
            <FormEdit
              editId={ editId }
              handleEdit={ this.handleEdit }
            />)
          : (
            <form>
              <label htmlFor="valorDespesa">
                Valor da Despesa:
                <input
                  name="value"
                  value={ formDespesa.value }
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
                  name="description"
                  type="text"
                  data-testid="description-input"
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="currency">
                Moeda:
                <select
                  id="currency"
                  name="currency"
                  type="select"
                  data-testid="currency-input"
                  onChange={ this.handleChange }
                  value={ formDespesa.currency }
                >
                  { separaMoeda.map((currencie) => (
                    <option
                      key={ currencie }
                      data-testid={ currencie }
                    >
                      {currencie}
                    </option>

                  ))}
                </select>
              </label>
              <label htmlFor="metodoPagamento">
                Método de Pagamento:
                <select
                  id="metodoPagamento"
                  name="method"
                  type="select"
                  data-testid="method-input"
                  onChange={ this.handleChange }
                >
                  <option value="dinheiro">Dinheiro</option>
                  <option value="Cartão de crédito">Cartão de crédito</option>
                  <option value="Cartão de débito">Cartão de débito</option>
                </select>
              </label>
              <label htmlFor="categoriaDespesa">
                Categoria da Despesa:
                <select
                  id="categoriaDespesa"
                  name="tag"
                  type="select"
                  data-testid="tag-input"
                  onChange={ this.handleChange }
                >
                  <option value="Alimentacao">Alimentação</option>
                  <option value="Lazer">Lazer</option>
                  <option value="Trabalho">Trabalho</option>
                  <option value="Transporte">Transporte</option>
                  <option value="Saúde">Saúde</option>
                </select>
              </label>
              <button
                type="button"
                onClick={ this.handleButton }
              >
                Adicionar despesa
              </button>
            </form>
          )}

        <Table
          editTable={ this.editTable }
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies[0],
  valueGlobal: state.wallet.expenses.value,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpenses: (form) => dispatch(actionExpenses.saveFuncExpenses(form)),
  saveApi: () => dispatch(recebendoApi()),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencies: PropTypes.objectOf(PropTypes.object).isRequired,
  saveExpenses: PropTypes.func.isRequired,
  saveApi: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
