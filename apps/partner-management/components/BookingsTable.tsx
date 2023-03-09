import { Table } from '@collinsonx/design-system/core';
import styled from '@collinsonx/design-system/styled';

const BookingsTable = styled(Table)`
  color: #333333;
  border: 1px solid #e9e9e9;
  border-top: 0;
  tr {
    height: 78px;
  }
  thead tr {
    height: 50px;
    background: #eae1cc;
  }
  tbody {
    tr:nth-of-type(even) {
      background: #f7f7f7;
    }
  }

  thead th + th,
  thead tr th:last-child {
    border-left: 1px solid #dad1bb;
  }

  tbody tr td {
    border-top: 0;
  }
`;

export default BookingsTable;
