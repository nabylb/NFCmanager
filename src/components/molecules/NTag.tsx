import React from 'react';
import {FlatList} from 'react-native';
import NItem from '../atoms/NItem';
import {decodeNdef} from '../../business';

interface IProps {
  tag: any;
}

const NTag: React.FC<IProps> = ({tag = {}}) => {
  const data = decodeNdef(tag);

  return (
    <FlatList
      data={data}
      renderItem={item => <NItem item={item} />}
      keyExtractor={item => item.key}
    />
  );
};

export default NTag;
