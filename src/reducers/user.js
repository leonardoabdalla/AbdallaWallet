// Esse reducer será responsável por tratar as informações da pessoa usuária

const INITIAL_STATE = {
  email: '',
};

function myReducerUser(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SAVE_INPUT':
    return { email: action.payload.value };
  default:
    return state;
  }
}

export default myReducerUser;
