import { useMediaQuery } from "@collinsonx/design-system/hooks";

const useBreakpoint = () => {
  return useMediaQuery('(max-width: 40em)');
}

export default useBreakpoint;
