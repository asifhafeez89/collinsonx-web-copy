const loungeKey_link_faq = 'https://portal.loungekey.com/en/elo/faq/';
const priorityPass_link_faq =
  'https://memberhelp.prioritypass.com/en/support/home';

export const FAQLink = (accountProvider?: string) =>
  accountProvider === 'LOUNGE_KEY'
    ? loungeKey_link_faq
    : accountProvider === 'PRIORITY_PASS'
    ? priorityPass_link_faq
    : '';
