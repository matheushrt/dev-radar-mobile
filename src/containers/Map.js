import React, { useEffect, useState } from 'react';
import { Image, View, Text, StyleSheet, Keyboard } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import {
  requestPermissionsAsync,
  getCurrentPositionAsync
} from 'expo-location';

function Map({ text, navigate }) {
  const [coords, setCoords] = useState(null);
  const [devs, setDevs] = useState(null);
  const [filteredDevs, setFilteredDevs] = useState(null);

  const getDevs = async () => {
    try {
      const devs = await (await fetch('http://192.168.100.40:3000/dev')).json();
      setDevs(devs);
      setFilteredDevs(devs);
    } catch (error) {
      console.error(error);
    }
  };

  const getLocation = async () => {
    try {
      const { granted } = await requestPermissionsAsync();
      if (granted) {
        const { coords } = await getCurrentPositionAsync();
        setCoords(coords);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      getLocation();
      getDevs();
    })();
  }, []);

  useEffect(() => {}, [coords, devs, filteredDevs]);

  useEffect(() => {
    const filtered =
      devs &&
      devs.filter(dev =>
        dev.techs.some(tech => tech.toLowerCase().includes(text.toLowerCase()))
      );
    setFilteredDevs(filtered);
  }, [text]);

  return (
    <MapView style={styles.container} onPress={Keyboard.dismiss}>
      {coords &&
        filteredDevs &&
        filteredDevs.map(dev => {
          const {
            _id,
            avatar_url,
            bio,
            github_username,
            location,
            name,
            techs
          } = dev;

          return (
            <Marker
              key={_id}
              style={styles.marker}
              coordinate={{
                longitude: location.coordinates[0],
                latitude: location.coordinates[1]
              }}
            >
              <Image
                style={styles.avatar}
                source={{
                  uri: avatar_url
                }}
              />
              <Callout
                onPress={() => {
                  navigate(github_username);
                }}
              >
                <View style={styles.callout}>
                  <Text style={styles.devName}>{name}</Text>
                  <Text style={styles.devBio}>{bio}</Text>
                  <Text style={styles.devTechs}>{[...techs].join(', ')}</Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
    </MapView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  marker: {
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 2,
      height: 2
    },
    elevation: 2
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5
  },
  callout: {
    width: 260
  },
  devName: {
    fontWeight: 'bold',
    fontSize: 16
  },
  devBio: {
    color: '#666',
    marginTop: 5
  },
  devTechs: {
    marginTop: 5
  }
});

export default Map;
