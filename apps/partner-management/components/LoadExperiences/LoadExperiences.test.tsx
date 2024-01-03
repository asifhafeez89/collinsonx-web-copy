import LoadExperiences from './index';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@collinsonx/design-system/test-utils';

jest.mock('@collinsonx/utils/queries', () => {
  return jest.fn(() => ({
    getSearchExperiences: () => {
      return { searchExperiences: [] };
    },
  }));
});

describe('<LoadExperiences />', () => {
  it('should render', async () => {
    const experience = {
      id: '1ccc3807-a7ed-5a3a-ada8-fd37ac1ab941',
      loungeName: 'Clubrooms Birmingham - Additional Fee Applies',
      bookings: [],
      invitations: [],
      partners: [],
    };

    const dropdown = render(
      <LoadExperiences
        selectedExperience={experience}
        onExperienceSelected={() => console.log()}
      />
    );

    expect(
      dropdown.getByDisplayValue(
        'Clubrooms Birmingham - Additional Fee Applies'
      )
    ).toBeInTheDocument();
  });
});
