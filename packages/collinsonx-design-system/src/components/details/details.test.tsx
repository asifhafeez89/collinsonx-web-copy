import renderer from 'react-test-renderer';
import { Provider } from 'test-utils';
import Details from '.';
import { MapPin, Clock } from '../../assets/icons';

describe('<Details />', () => {
  it('renders Details', () => {
    const infos = [
      {
        header: 'Heathrow',
        description: 'Terminal 5',
        icon: <MapPin width={16} color="#0C8599" />,
      },
      {
        header: 'Mon - Sun | 05:00 - 22:00',
        description: 'Walk-in available',
        icon: <Clock width={16} color="#0C8599" />,
      },
    ];

    const tree = renderer
      .create(
        <Provider>
          <Details title="This is a title" direction="row" infos={infos} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
