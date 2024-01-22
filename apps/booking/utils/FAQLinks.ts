export const FAQLink = (accountProvider?: string, locale?: string) => {
  const loungeKey_link_faq = `https://portal.loungekey.com/${locale}/elo/faq/`;
  const priorityPass_link_faq = `https://memberhelp.prioritypass.com/${locale}/support/home`;
  return accountProvider === 'LOUNGE_KEY'
    ? loungeKey_link_faq
    : accountProvider === 'PRIORITY_PASS'
    ? priorityPass_link_faq
    : '';
};
