const urls = [
  {
    value: 'https://booking-local.test.cergea.com:4011',
    label: 'Local: https://booking-local.test.cergea.com:4011',
  },
  {
    value: 'https://booking-local.uat.cergea.com:4011',
    label: 'Local: https://booking-local.uat.cergea.com:4011',
  },
  {
    value: 'https://booking.test.cergea.com',
    label: 'Test: https://booking.test.cergea.com',
  },
  {
    value: 'https://booking.uat.cergea.com',
    label: 'UAT: https://booking.uat.cergea.com',
  },
  {
    value: 'https://booking.cergea.com',
    label: 'Prod: https://booking.cergea.com',
  },
];

export function isProdUrl(domain: string) {
  const testingURls = urls
    .filter((url) => {
      return url.value === 'https://booking.cergea.com';
    })
    .map((url) => {
      return url.value;
    });

  return testingURls.includes(domain);
}

export default urls;
