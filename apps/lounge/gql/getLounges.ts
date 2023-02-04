import { gql } from '@collinsonx/utils/apollo';

export default gql`
    query Lounges {
        lounges {
        id
        name
        location
        images {
            url
        }
        }
    }
`;