import { Status } from '@collinsonx/utils';
import getOutletPageTitle, {
  formatStatus,
  OutletPageTitleOptions,
} from 'lib/getOutletPageTitle';

describe('getOutletPageTitle', () => {
  let mock: OutletPageTitleOptions = {
    name: 'Outlet name',
    mode: 'view',
  };
  it("should append 'Editing: ' when in edit mode", () => {
    expect(
      getOutletPageTitle({ ...mock, mode: 'edit' }).includes('Editing: ')
    ).toBeTruthy();
  });
  it('should include location in the result', () => {
    const location = 'London';
    expect(
      getOutletPageTitle({ ...mock, location }).includes(location)
    ).toBeTruthy();
  });
  it('should include location in the result', () => {
    const terminal = 'Terminal 2';
    expect(
      getOutletPageTitle({ ...mock, terminal }).includes(terminal)
    ).toBeTruthy();
  });
  it('should render outlet status', () => {
    const status = Status.Active;
    expect(
      getOutletPageTitle({ ...mock, status }).includes(formatStatus(status))
    ).toBeTruthy();
  });
});

describe('formatStatus', () => {
  it('should format status', () => {
    const status = Status.Inactive;
    expect(formatStatus(status)).toBe(
      `(${
        status[0].toUpperCase() + status.slice(1, status.length).toLowerCase()
      })`
    );
  });
});
