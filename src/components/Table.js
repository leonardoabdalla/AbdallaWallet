import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes, { arrayOf, objectOf } from 'prop-types';

class Table extends Component {
  render() {
    const { api } = this.props;
    return (
      <table className="table-expenses">
        <thead>
          <tr>
            <th className="table-title">Descrição</th>
            <th className="table-title">Tag</th>
            <th className="table-title">Método de pagamento</th>
            <th className="table-title">Valor</th>
            <th className="table-title">Moeda</th>
            <th className="table-title">Câmbio utilizado</th>
            <th className="table-title">Valor convertido</th>
            <th className="table-title">Moeda de conversão</th>
            <th className="table-title">Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {api
            .map(({ id, description, tag, method, value, currency, exchangeRates }) => (
              <tr className="table-info" key={ id }>
                <td className="table-row">{ description }</td>
                <td className="table-row">{ tag}</td>
                <td className="table-row">{ method }</td>
                <td className="table-row">{ Number(value).toFixed(2) }</td>
                <td className="table-row">{ exchangeRates[currency].name }</td>
                <td className="table-row">
                  { Number(exchangeRates[currency].ask).toFixed(2) }
                </td>
                <td className="table-row">
                  { (value * exchangeRates[currency].ask).toFixed(2) }
                </td>
                <td className="table-row">Real</td>
                <td className="table-row">
                  <button type="button" data-testid="edit-btn">Editar</button>
                  <button type="button" data-testid="delete-btn">Exluir</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  api: arrayOf(objectOf(PropTypes.any)).isRequired,
};

const mapStateToProps = (state) => ({
  api: state.wallet.expenses });

export default connect(mapStateToProps, null)(Table);
