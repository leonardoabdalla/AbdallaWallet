// Coloque aqui suas actions

import apiRecebe from '../services/api2';

const SAVE_INPUT = 'SAVE_INPUT';
const SAVE_EXPENSES = 'SAVE_EXPENSES';
// const RECEBE_API = 'RECEBE_API';

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

const saveFuncExpenses = (form) => ({
  type: SAVE_EXPENSES,
  payload: { form },
});

export const actionExpenses = ({
  saveFuncExpenses,
});

const recebeApi = (api) => ({
  type: 'RECEBE_API',
  payload: api });

export const recebendoApi = () => async (dispatch) => {
  const recebeFetch = await apiRecebe();
  dispatch(recebeApi(recebeFetch));
};
