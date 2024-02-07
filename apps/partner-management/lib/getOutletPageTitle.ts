import { Status } from '@collinsonx/utils';
import { toTitleCase } from '../utils/textUtils';

export interface OutletPageTitleOptions {
  name: string;
  location?: string;
  terminal?: string;
  status?: Status;
  mode: 'view' | 'edit';
}

export const formatStatus = (status: Status): string =>
  `(${toTitleCase(status)})`;

/**
 *
 * * Scheme: &lt;OutletName&gt; - &lt;ShortLocation&gt; (&lt;WorkflowStage&gt;)
 * * Partner example: Club Aspire Lounge - London Heathrow, Terminal 2 (Draft)
 * * Collinson user: Same
 *
 * @param {OutletPageTitleOptions} options
 * @returns {string}
 */
const outletPageTitle = ({
  name,
  location,
  terminal,
  status,
  mode,
}: OutletPageTitleOptions) => {
  let result = name;
  if (mode === 'edit') {
    return `Editing: ${name}`;
  }
  if (location) {
    result += `, ${location}`;
  }
  if (terminal) {
    result += `, ${terminal}`;
  }
  if (status) {
    result += ` ${formatStatus(status)}`;
  }
  return result;
};

export default outletPageTitle;
