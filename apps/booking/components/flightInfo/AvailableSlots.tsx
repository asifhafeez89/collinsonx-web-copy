import { useState,useEffect} from 'React'; 
import { useQuery } from '@collinsonx/utils/apollo';
import getAvailableSlots from '@collinsonx/utils/queries/getAvailableSlots';
import { Availability, Slots } from '@collinsonx/utils';
import {APIFlightInfo } from 'pages/api/flight';
import {
    Button,
    Text,
    Grid,
  } from '@collinsonx/design-system/core';
import dayjs from 'dayjs';

interface FlightInfoProps {
    flightInfo: APIFlightInfo
}

const AvailableSlots = ({flightInfo}:FlightInfoProps) => {
    const [availableSlots, setAvailableSlots] = useState<Array<Slots>>();
    const [selectedSlot, setSelectedSlot] = useState<Slots>();
      const [flightInfoLoading, setFlightInfoLoading] = useState(false);
    const { loading, error, data } = useQuery<{ getAvailableSlots: Availability }>(
      getAvailableSlots,
      {
        variables: {
          data: {
            flightInformation: {
              type: 'DEPARTURE',
              dateTime: `${flightInfo?.departure?.date.local} ${flightInfo?.departure?.time.local}`,
              airport: flightInfo?.departure?.airport.iata,
              terminal: '-1'
            },
            guests: {
              adultCount: 5,
              childrenCount: 0,
              infantCount: 0
            },
            product: {
              productType: 'Lounge',
              productID: '1139',
              supplierCode: '123'
            }
          }
        },
        pollInterval: 300000,
        fetchPolicy: 'network-only',
       notifyOnNetworkStatusChange: true,
       onCompleted: (data) => {
        
        setAvailableSlots(data.getAvailableSlots.slots);
       }
      });
      const onSelectSlot = (index: number) => {
     if(null !=availableSlots){
      setSelectedSlot(availableSlots[index]);
     }
      };
    return (
      <div> 
  <Grid grow>
  {availableSlots?.map((slot, i) => (
       <Grid.Col span={1} key={`available-slot-${i}`}>
         <Button variant='outline' style={{ textAlign: 'center', height: '4rem' }} 
         
         onClick={() => {
           onSelectSlot(i);
         }}
         
         data-selectedslot={i}>
           Check-in <br /> between <br />
           {`${dayjs(slot.startDate).format('hh:mm')} - ${dayjs(slot.endDate).format('hh:mm')}`}
         </Button>
       </Grid.Col>
     ))}
   </Grid>
  
<br/>
{selectedSlot ? (
           
              <Text>
                Selected Slot:{' '}
                {`${dayjs(selectedSlot?.startDate).format('hh:mm')} - ${dayjs(
                  selectedSlot?.endDate
                ).format('hh:mm')}`}
              </Text>


           
          ) : (
            <></>
          )}
</div>
    )
}
export default AvailableSlots;

