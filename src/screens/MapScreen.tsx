import * as React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {
  addPreferredPoint,
  getPreferredPoints,
  removePreferredPoint,
} from '../../lib/fakeApi';
import {useQuery} from '@tanstack/react-query';
import queryClient from '../../lib/clientPersister';

interface Point {
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}

export default function MapScreen() {
  const {data: preferredPoints} = useQuery(['points'], async () =>
    getPreferredPoints(),
  );
  const isPointPreferred = (point: Point): boolean => {
    return preferredPoints?.some(
      preferredPoint => preferredPoint?.name === point?.name,
    );
  };

  const handlePress = async e => {
    const updatePoint = isPointPreferred(e)
      ? removePreferredPoint
      : addPreferredPoint;
    await updatePoint(e);
    queryClient.invalidateQueries(['points']);
  };
  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={region}>
        {points.map((point, index) => (
          <Marker
            key={index}
            coordinate={{latitude: point.latitude, longitude: point.longitude}}>
            <View style={{backgroundColor: 'red', padding: 1}}>
              <Text>{point.name}</Text>
              <Button
                onPress={() => handlePress(point)}
                title={isPointPreferred(point) ? 'remove' : 'add'}
              />
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const region = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const points: Point[] = [
  {
    name: 'Point A',
    description: 'This is the first point',
    latitude: 37.7749,
    longitude: -122.4194,
  },
  {
    name: 'Point B',
    description: 'This is the second point',
    latitude: 37.789975,
    longitude: -122.431297,
  },
  {
    name: 'Point C',
    description: 'This is the third point',
    latitude: 37.7627,
    longitude: -122.4353,
  },
];
