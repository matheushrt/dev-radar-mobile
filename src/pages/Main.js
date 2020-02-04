import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Map from '../containers/Map';

function Main({ navigation }) {
  const [textInput, setTextInput] = useState(null);

  return (
    <>
      <Map
        text={textInput}
        navigate={github_username => {
          navigation.navigate('Profile', {
            github_username
          });
        }}
      />
      <View style={styles.searchForm}>
        <TextInput
          style={styles.searchInput}
          placeholder={'Search devs by technologies'}
          placeholderTextColor={'#999'}
          autoCapitalize="words"
          autoCorrect={false}
          onChangeText={text => {
            setTextInput(text);
          }}
        />
        {/* <TouchableOpacity style={styles.formButton} onPress={() => {}}>
          <MaterialIcons name="my-location" size={20} color="#fff" />
        </TouchableOpacity> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  searchForm: {
    flexDirection: 'row',
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20
  },
  searchInput: {
    flex: 1,
    height: 50,
    textAlign: 'center',
    backgroundColor: '#fff',
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 2,
      height: 2
    },
    elevation: 2
  },
  formButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#8e4dff',
    borderRadius: 25,
    marginLeft: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 2,
      height: 2
    },
    elevation: 2
  }
});

export default Main;
