import { SELECTED_LOUNGE } from 'config';

const getSelectedLounge = () => {
  const loungeStr = localStorage.getItem(SELECTED_LOUNGE);
  if (loungeStr) {
    return JSON.parse(loungeStr);
  }
};

export default getSelectedLounge;
