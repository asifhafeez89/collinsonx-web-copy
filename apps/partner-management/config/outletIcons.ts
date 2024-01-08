import {
  OutletLoungeIcon,
  OutletRefreshIcon,
  OutletRestIcon,
  OutletRestaurantIcon,
  OutletServicesIcon,
  OutletUnwindIcon,
} from '@collinsonx/design-system/assets/icons';

export type ValidTag =
  | 'EAT'
  | 'LOUNGE'
  | 'REST'
  | 'SERVICES'
  | 'UNWIND'
  | 'REFRESH';

const iconMap: Record<ValidTag, any> = {
  EAT: OutletRestaurantIcon,
  LOUNGE: OutletLoungeIcon,
  REST: OutletRestIcon,
  SERVICES: OutletServicesIcon,
  UNWIND: OutletUnwindIcon,
  REFRESH: OutletRefreshIcon,
};

export default iconMap;
