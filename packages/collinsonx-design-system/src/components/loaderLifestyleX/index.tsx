import { LoaderLifestyleX as Loader } from '../../assets/graphics';
import styled from '@emotion/styled';

const Container = styled.div(`
svg {
    margin: 20px;
    -webkit-animation-name: spin;
    -webkit-animation-duration: 1000ms;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-timing-function: linear;
    -moz-animation-name: spin;
    -moz-animation-duration: 1000ms;
    -moz-animation-iteration-count: infinite;
    -moz-animation-timing-function: linear;
    -ms-animation-name: spin;
    -ms-animation-duration: 1000ms;
    -ms-animation-iteration-count: infinite;
    -ms-animation-timing-function: linear;
    animation-name: spin;
    animation-duration: 1000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
}
@-ms-keyframes spin {
    0% {
        -ms-transform: rotate(0deg);
    }
    100% {
        -ms-transform: rotate(360deg);
    }
}
@-moz-keyframes spin {
    0% {
        -moz-transform: rotate(0deg);
    }
    100% {
        -moz-transform: rotate(360deg);
    }
}
@-webkit-keyframes spin {
    0% {
        -webkit-transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
    }
}
@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
`);

export default function LoaderLifestyleX() {
  return (
    <Container>
      <Loader />
    </Container>
  );
}
