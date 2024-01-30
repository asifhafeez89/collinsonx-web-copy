export const getProgrammeDisplayName = (programme: string): string => {
  const displayNames: { [key: string]: string } = {
    LK: 'LoungeKey',
    LP: 'LoungePass',
    PP: 'Priority Pass',
  };

  return displayNames[programme] || programme;
};
