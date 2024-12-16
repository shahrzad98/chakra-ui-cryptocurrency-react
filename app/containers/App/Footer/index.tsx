import React from 'react';
import DesktopFooter from './DesktopView';
import MobileFooter from './MobileView';
import { useWindowSize } from '../../../helper';

type LargeWithAppLinksAndSocialProps = {};

const LargeWithAppLinksAndSocial: React.FC<LargeWithAppLinksAndSocialProps> = () => {
  const {width} = useWindowSize();
  return <>{width < 991 ? <MobileFooter /> : <DesktopFooter />}</>;
};

export default LargeWithAppLinksAndSocial;
