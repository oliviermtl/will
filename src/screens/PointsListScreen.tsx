import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, FlatList} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {getPreferredPoints} from '../../lib/fakeApi';

interface Point {
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}

interface Props {
  navigation: NavigationProp<any>;
}

export default function PointsListScreen({navigation}: Props) {
  const {data: points} = useQuery(['points'], async () => getPreferredPoints());

  const handlePointPress = (point: Point) => {
    navigation.navigate('Map', {selectedPoint: point});
  };

  const renderPointItem = ({item}: {item: Point}) => (
    <TouchableOpacity
      key={item.name}
      style={styles.card}
      onPress={() => handlePointPress(item)}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.coordinates}>
        ({item.latitude}, {item.longitude})
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Map')}>
          <Text style={styles.buttonText}>View Map</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={points}
        renderItem={renderPointItem}
        keyExtractor={(item: Point) => item.name}
        // ListFooterComponent={<Text>View Map</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 5,
  },
  coordinates: {
    fontSize: 14,
    color: '#888',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
