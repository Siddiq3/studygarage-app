import React from 'react';
import ScreenLayoutContainer from '../../design-system/components/ScreenLayoutContainer';
import ScreenHeader from '../../design-system/components/ScreenHeader';
import SGEmptyState from '../../design-system/components/SGEmptyState';

export default function ComingSoonScreen({
  title = 'Chapter Wise Video Explanation',
  subtitle = 'New chapter explainers will be uploaded shortly',
}) {
  return (
    <ScreenLayoutContainer variant="home" contentClassName="px-4" scroll>
      <ScreenHeader tone="berry" title={title} />
      <SGEmptyState icon="videocam-outline" title="Coming soon" subtitle={subtitle} />
    </ScreenLayoutContainer>
  );
}
