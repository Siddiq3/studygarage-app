import React from 'react';
import Text from '../ui/Text';

type Props = React.ComponentProps<typeof Text>;

export default function PremiumText(props: Props) {
  return <Text {...props} />;
}
