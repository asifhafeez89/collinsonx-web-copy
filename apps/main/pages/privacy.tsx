import { Button } from '@collinsonx/design-system';
import LayoutLogin from '@components/LayoutLogin';
import Link from 'next/link';

export default function Privacy() {
  return (
    <LayoutLogin>
      <h1>ExperienceX test information</h1>
      <h2>Privacy policy</h2>
      <p>
        The current version of the app is strictly in closed testing and only
        available to internal employees. For any privacy concerns and/or
        questions please contact your manager who can direct you to the relevant
        product team.
      </p>
      <h2>Account deletion</h2>
      <p>
        Account creation and retention is currently for test purposes only. You
        may use any data, real or not, to create an account. For any account
        deletion enquiries contact your manager who can direct you to the
        relevant product team.
      </p>
      <Link href="/lounge" style={{ textDecoration: 'none' }}>
        <Button variant="default" my={16} fullWidth>
          Back to homepage
        </Button>
      </Link>
    </LayoutLogin>
  );
}
