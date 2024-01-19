import {
  OutletLoungeIcon,
  OutletRefreshIcon,
  OutletRestIcon,
  OutletRestaurantIcon,
  OutletServicesIcon,
  OutletUnwindIcon,
} from '@collinsonx/design-system/assets/icons';

export type ValidProductCategory =
  | 'EAT'
  | 'LOUNGE'
  | 'REST'
  | 'SERVICES'
  | 'UNWIND'
  | 'REFRESH';

const iconMap: Record<ValidProductCategory, any> = {
  EAT: OutletRestaurantIcon,
  LOUNGE: OutletLoungeIcon,
  REST: OutletRestIcon,
  SERVICES: OutletServicesIcon,
  UNWIND: OutletUnwindIcon,
  REFRESH: OutletRefreshIcon,
};

export default iconMap;
