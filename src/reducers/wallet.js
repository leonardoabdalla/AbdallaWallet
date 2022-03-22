// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// Esse reducer será responsável por tratar as informações da pessoa usuária
// import { RECEBE_API } from '../actions/index';

const INITIAL_STATE = {
  expenses: [],
  currencies: [],
};

function myReducerUserForm(state = INITIAL_STATE, action) {
  let newExpense = null;
  switch (action.type) {
  case 'SAVE_EXPENSES':
    newExpense = { ...action.payload.form, id: state.expenses.length };
    return { ...state, expenses: [...state.expenses, newExpense] };
  case 'RECEBE_API':
    return { ...state, currencies: [action.payload] };
  case 'DELETE_EXPENSES':
    return { ...state, expenses: action.payload };
  case 'EDIT_EXPENSES':
    return {
      ...state,
      expense: state.expenses.map((expense) => (
        expense.id === action.payload.id
          ? { ...action.payload, exchangeRates: expense.exchangeRates }
          : expense
      )),
    };
  default:
    return state;
  }
}

export default myReducerUserForm;
