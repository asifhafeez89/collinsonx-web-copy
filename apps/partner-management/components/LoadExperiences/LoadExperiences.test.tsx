import LoadExperiences from './index';
import '@testing-library/jest-dom/extend-expect';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  getNodeText,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('@collinsonx/utils/lib/index', () => {
  return jest.fn(() => ({
    setItem: () => {
      return [];
    },
  }));
});

jest.mock('@collinsonx/utils/queries', () => {
  return jest.fn(() => ({
    getSearchExperiences: () => {
      return { searchExperiences: [] };
    },
  }));
});

describe('<LoadExperiences />', () => {
  it('should render', () => {
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

    expect(dropdown).toMatchSnapshot();
  });

  it('should render  element', async () => {
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
