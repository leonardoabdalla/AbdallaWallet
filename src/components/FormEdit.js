import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editExpenses } from '../actions';

class FormEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      description: '',
      currency: 'BRL',
      method: 'Dinheiro',
      tag: 'Transporte',
    };
  }

  componentDidMount() {
    const { editId, expenses } = this.props;
    this.setState({
      value: expenses[editId].value,
      description: expenses[editId].description,
      currency: expenses[editId].currency,
      method: expenses[editId].method,
      tag: expenses[editId].tag,
      id: editId,
    });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

  handleEditButton = () => {
    const { editExpensesForm, handleEdit } = this.props;
    editExpensesForm({ ...this.state });
    handleEdit();
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { editId, expenses } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="valorDespesa">
            Valor da Despesa:
            <input
              name="value"
              value={ value }
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
              value={ description }
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
              value={ currency }
            >
              { (Object.keys(expenses[editId].exchangeRates)).map((currencie) => (
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
              value={ method }
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
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
              value={ tag }
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
            onClick={ this.handleEditButton }
          >
            Editar despesa
          </button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies[0],
});

const mapDispatchToProps = (dispatch) => ({
  editExpensesForm: (payload) => dispatch(editExpenses(payload)),
});

FormEdit.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  editId: PropTypes.number.isRequired,
  editExpensesForm: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormEdit);
