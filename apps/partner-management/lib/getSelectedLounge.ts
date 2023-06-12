import { Experience } from '@collinsonx/utils';
import { SELECTED_LOUNGE } from 'config';

const getSelectedLounge: () => Experience | undefined = () => {
  try {
    const loungeStr = localStorage.getItem(SELECTED_LOUNGE);
    if (loungeStr) {
      return JSON.parse(loungeStr);
    }
  } catch (err) {}
};

export default getSelectedLounge;
