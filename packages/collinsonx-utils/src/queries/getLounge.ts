import { gql } from '../apollo';

const getLounge = (loungeId: string) => gql`
    query Lounge {
        lounge(id: "${loungeId}") {
        name
        location
        openingHours
        conditions
        facilities
        id
        images {
            url
            height
            width
        }
        }
    }
`;

export default getLounge;
