// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// Esse reducer será responsável por tratar as informações da pessoa usuária

const INITIAL_STATE = {
  expenses: [],
};

function myReducerUser(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SAVE_EXPENSES':
    return { ...state, expenses: [...state.expenses, action.payload.form] };
  default:
    return state;
  }
}

export default myReducerUser;
