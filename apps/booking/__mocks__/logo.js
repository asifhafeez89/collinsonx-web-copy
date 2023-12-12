import React from 'react';

const LogoMock = React.forwardRef((props, ref) => (
  <span ref={ref} {...props} />
));

export const ReactComponent = LogoMock;
export default LogoMock;
