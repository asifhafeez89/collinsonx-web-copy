export type Section = 'partner' | 'booking' | 'catalogue';

const sections: Record<Section, string> = {
  partner: 'Partner Portal',
  booking: 'Bookings',
  catalogue: 'Catalogue',
};

export default sections;
