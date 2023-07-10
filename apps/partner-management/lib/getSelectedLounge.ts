import { Experience } from '@collinsonx/utils';
import { getItem } from '@collinsonx/utils/lib';
import { SELECTED_LOUNGE } from 'config';

const getSelectedLounge: () => Experience | undefined = () => {
  try {
    const loungeStr = getItem(SELECTED_LOUNGE);
    if (loungeStr) {
      return JSON.parse(loungeStr);
    }
  } catch (err) {}
};

export default getSelectedLounge;
