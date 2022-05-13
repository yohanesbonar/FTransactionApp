import {API_CALL} from '../requestHelper';

export const getTransactionList = async () => {
  try {
    const option = {
      method: 'get',
      url: `frontend-test`,
    };
    let response = await API_CALL(option);

    return response;
  } catch (error) {
    return;
  }
};
