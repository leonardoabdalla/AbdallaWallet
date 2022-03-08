// Coloque aqui suas actions
const SAVE_INPUT = 'SAVE_INPUT';

export const actionTypes = ({
  SAVE_INPUT,
});

// ACTIONS CREATORS
// { type: ? }

const saveInput = (value) => ({
  type: SAVE_INPUT,
  payload: { value },
});

export const actionCreators = {
  saveInput,
};
