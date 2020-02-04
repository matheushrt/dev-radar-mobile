import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import LottieView from 'lottie-react-native';

function Profile({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const github_username = navigation.getParam('github_username');

  useEffect(() => {}, [isLoading]);

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: `https://github.com/${github_username}` }}
        onLoadEnd={() => {
          setIsLoading(false);
        }}
      />
      {isLoading && (
        <View style={styles.animationView}>
          <LottieView
            style={styles.animation}
            autoPlay={true}
            source={require('../../assets/github_animation.json')}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  animationView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  animation: {
    width: 200
  }
});

export default Profile;
