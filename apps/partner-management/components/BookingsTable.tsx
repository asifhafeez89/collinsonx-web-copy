import { Table } from '@collinsonx/design-system/core';
import styled from '@collinsonx/design-system/styled';

const BookingsTable = styled(Table)`
  border: 1px solid #d1d1d1;
  border-top: 0;
  tr {
    height: 50px;
  }
  thead tr {
    background: rgba(71, 212, 177, 0.1);
  }
  tbody {
    tr:nth-of-type(even) {
      background: #f7f7f7;
    }
  }

  thead th + th,
  thead tr th:last-child {
    border-left: 1px solid;
    border-left: 1px solid #d1d1d1;
  }

  tbody tr td {
    border-top: 0;
  }
`;

export default BookingsTable;
