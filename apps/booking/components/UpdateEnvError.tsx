import * as React from 'react';
import {
  AppleStoreIcon,
  GoogleStoreIcon,
} from '@collinsonx/design-system/assets/icons';

export type devices = 'ios' | 'web' | 'android';
export interface UpdateEnvInterface {
  type: devices;
}

const UpdateEnvError = ({ type }: UpdateEnvInterface) => {
  return (
    <div>
      {type === 'android' && (
        <a
          style={{ textDecoration: 'none', marginTop: '20px' }}
          href="https://play.google.com/store/apps/details?id=com.prioritypass3&pli=1"
        >
          <GoogleStoreIcon /> Update Priority Pass&#x2122;
        </a>
      )}

      {type === 'ios' && (
        <a
          style={{ textDecoration: 'none', marginTop: '20px' }}
          href="https://apps.apple.com/gb/app/priority-pass/id406878019"
        >
          <AppleStoreIcon /> Update Priority Pass&#x2122;
        </a>
      )}
    </div>
  );
};

export default UpdateEnvError;
