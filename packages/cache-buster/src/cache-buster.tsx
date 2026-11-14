import * as React from 'react';

import { FILENAME } from './constant';
import { reloadForNewRelease, useReleaseStatus } from './release-status';

export type CacheBusterProps = {
  children?: React.ReactNode;
  enabled?: boolean;
  error?: React.ReactNode;
  loading?: React.ReactNode;
  storageKey?: string;
  url?: string;
  verbose?: boolean;
};

function CacheBuster(props: CacheBusterProps): React.ReactElement {
  const {
    children = null,
    enabled = true,
    error,
    loading = null,
    storageKey = FILENAME,
    url,
    verbose,
  } = props;

  const [isInitialized, setIsInitialized] = React.useState<boolean>(false);
  const [isReloadSkipped, setIsReloadSkipped] = React.useState<boolean>(false);
  const releaseStatus = useReleaseStatus({ enabled, storageKey, url, verbose });

  React.useEffect(() => {
    if (!enabled || releaseStatus) {
      // eslint-disable-next-line react/set-state-in-effect -- stays initialized once the status is known
      setIsInitialized(true);
    }
  }, [releaseStatus, enabled]);

  React.useEffect(() => {
    if (releaseStatus === 'new-release' && !reloadForNewRelease(storageKey, verbose)) {
      // eslint-disable-next-line react/set-state-in-effect -- set after trying to reload the page
      setIsReloadSkipped(true);
    }
  }, [releaseStatus, storageKey, verbose]);

  // Keep showing `loading` while the page reloads, so the old release doesn't flash.
  if (!isInitialized || (releaseStatus === 'new-release' && !isReloadSkipped)) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <React.Fragment>{loading}</React.Fragment>;
  }

  if (releaseStatus === 'error') {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <React.Fragment>{error}</React.Fragment>;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <React.Fragment>{children}</React.Fragment>;
}

export default CacheBuster;
