export const prefixCSSVars = (obj: Record<string, string>) =>
  Object.keys(obj).reduce<Record<string, string>>(
    (prev, cur) => ((prev[`--${cur}`] = obj[cur]), prev),
    {}
  );
