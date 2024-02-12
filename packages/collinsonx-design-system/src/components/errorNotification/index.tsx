import { AlertIcon } from '../../assets/icons';

interface ErrorNotificationProps {
  content: string;
}

const ErrorNotification = ({ content }: ErrorNotificationProps) => {
  return (
    <p
      style={{
        border: '1px solid red',
        paddingTop: '-0.3rem',
        paddingLeft: '0.4rem',
        background: 'rgb(212 42 84 / 26%)',
        borderRadius: '0.3rem',
        display: 'flex',
        flexDirection: 'row',
        padding: '0.3rem',
      }}
    >
      <AlertIcon style={{ width: '1rem', height: '1rem' }} />{' '}
      <span style={{ marginLeft: '0.5rem', marginTop: '-0.3rem' }}>
        {content}
      </span>
    </p>
  );
};

export default ErrorNotification;
