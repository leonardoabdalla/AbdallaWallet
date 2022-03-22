import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes, { arrayOf, objectOf } from 'prop-types';
import { deleteExpenses } from '../actions';

class Table extends Component {
  deleteTable = (id) => {
    const { expenses, saveDeleteExpenses } = this.props;
    const expensesAlterado = expenses.filter((expense) => expense.id !== id);
    console.log(expensesAlterado);
    saveDeleteExpenses(expensesAlterado);
  }

  render() {
    const { expenses, editTable } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses
          && expenses
            .map(({ id, description, tag, method, value, currency, exchangeRates }) => (
              <tr key={ id }>
                <td>{ description }</td>
                <td>{ tag}</td>
                <td>{ method }</td>
                <td>{ Number(value).toFixed(2) }</td>
                <td>{ exchangeRates[currency].name }</td>
                <td>
                  { Number(exchangeRates[currency].ask).toFixed(2) }
                </td>
                <td>
                  { (value * exchangeRates[currency].ask).toFixed(2) }
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => editTable(id) }
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.deleteTable(id) }
                  >
                    Exluir
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: arrayOf(objectOf(PropTypes.any)).isRequired,
  saveDeleteExpenses: PropTypes.func.isRequired,
  editTable: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses });

const mapDispatchToProps = (dispatch) => ({
  saveDeleteExpenses: (payload) => dispatch(deleteExpenses(payload)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
