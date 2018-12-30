import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking
} from 'react-native';

export default class ImprintScreen extends React.Component{

  static navigationOptions = {
    title: "Impressum"
  }

  render(){
    return(
      <View style={styles.container}>

        <Text style={{...styles.headline, ...styles.noMarginTop}}>Angaben gemäß § 5 TMG</Text>

        <Text style={styles.text}>Merlin Moelter</Text>
        <Text style={styles.text}>Osterbekstraße 94</Text>
        <Text style={styles.text}>22083 Hamburg</Text>

        <Text style={styles.headline}>Kontakt</Text>

        <Text style={styles.text}>Telefon: 017643879620</Text>
        <Text style={styles.text}>E-Mail: merlin.moelter@gmail.com</Text>

        <Text style={{...styles.text, ...styles.marginTop}}>Quelle:</Text>
        <TouchableOpacity onPress={() => Linking.openURL("https://www.e-recht24.de/")}>
          <Text style={styles.link}>e-Recht24</Text>
        </TouchableOpacity>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  text: {
    fontSize: 18
  },
  headline: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10
  },
  link: {
    fontSize: 18,
    color: "#2196F3",
    textDecorationLine: "underline"
  },
  marginTop: { marginTop: 10 },
  noMarginTop: { marginTop: 0 }
})
