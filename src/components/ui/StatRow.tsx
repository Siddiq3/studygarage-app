import React from 'react';
import { View } from 'react-native';
import Text from './Text';
import Divider from './Divider';

type Stat = {
  label: string;
  value: string | number;
};

type Props = {
  stats: Stat[];
  compact?: boolean;
};

export default function StatRow({ stats, compact = false }: Props) {
  return (
    <View className='flex-row items-center'>
      {stats.map((stat, index) => (
        <React.Fragment key={`${stat.label}-${index}`}>
          <View className={compact ? 'flex-1 py-1' : 'flex-1 py-2'}>
            <Text variant='caption' tone='muted'>{stat.label}</Text>
            <Text variant={compact ? 'title.md' : 'metric'}>{String(stat.value)}</Text>
          </View>
          {index < stats.length - 1 ? <Divider vertical className='mx-2 h-10' /> : null}
        </React.Fragment>
      ))}
    </View>
  );
}
