import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import MenuEntry from "../components/MenuEntry"

export default class MenuScreen extends React.Component{

  static navigationOptions = {
    title: "Menü"
  }

  entrys = [
    {
      title: "Datenschutz",
      link: "Privacy"
    },
    {
      title: "Kontakt",
      link: "Contact"
    },
    {
      title: "Feedback",
      link: "Feedback"
    }
  ]

  render(){
    return(
      <View style={styles.container}>
        {this.entrys.map((e, i) => (
          <MenuEntry
            onPress={() => this.props.navigation.navigate(e.link)}
            title={e.title}
            key={`Menu-${i}`}
          />))}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  }
})
