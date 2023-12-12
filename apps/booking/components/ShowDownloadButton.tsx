import { compareVersions } from 'compare-versions';

interface ShowButtonProps {
  minVersion: string;
  currentVersion: string;
  children: React.ReactNode;
}

const ShowButtonByVersion = ({
  currentVersion,
  minVersion,
  children,
}: ShowButtonProps) => {
  const isHigherVersion = compareVersions(currentVersion ?? '', minVersion);
  const isWithinVersion = isHigherVersion >= 0;

  if (!isWithinVersion) {
    return false;
  }

  return <>{children}</>;
};

export default ShowButtonByVersion;
