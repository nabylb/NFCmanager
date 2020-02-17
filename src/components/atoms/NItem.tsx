import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Typography, Colors} from '../../ressources';

interface IProps {
  item: {
    key: string;
    value: string;
  };
}

const NItem: React.FC<IProps> = ({item}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.item.key}</Text>
      <Text style={styles.value}>{item.item.value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 20,
    marginLeft: 20,
  },
  title: {
    ...Typography.body,
    color: Colors.primary,
  },
  value: {
    ...Typography.body,
    color: Colors.primaryText,
  },
});
export default NItem;
