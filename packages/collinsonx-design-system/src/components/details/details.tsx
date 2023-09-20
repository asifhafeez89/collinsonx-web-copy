import renderer from 'react-test-renderer';
import Details from '.';

describe('<LoungeDetails />', () => {
  it('renders LoungeDetails', () => {
    const infos = [
      {
        header: 'Heathrow',
        description: 'Terminal 5',
        icon: '',
      },
      {
        header: 'Mon - Sun | 05:00 - 22:00',
        description: 'Walk-in available',
        icon: '',
      },
    ];

    const tree = renderer
      .create(<Details title={'Hello'} direction="row" infos={infos} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
