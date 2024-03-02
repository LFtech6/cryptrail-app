import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({

container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
},
yellowBackground: {
    backgroundColor: '#FFD464',
    width: '100%',
    height: '43%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderBottomLeftRadius: 63,
    borderBottomRightRadius: 63,
    paddingHorizontal: 20, 
},
title: {
    fontSize: 48,
    color: '#000',
},
desc: {
    fontSize: 18,
    color: '#000',
},
buttons: {
    width: 220,
    marginTop: 50,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
},
});