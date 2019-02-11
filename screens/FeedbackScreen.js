import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { TextInput, Button, Snackbar, HelperText } from "react-native-paper"
import sendEmail from "../components/Mail"

export default class FeedbackScreen extends React.Component{

  static navigationOptions = {
    title: "Feedback"
  }
  state = {
    inputValue: "",
    visible: false,
    error: false
  }

  componentDidMount(){
    this.textInput.focus()
  }

  buttonClicked(){
    const text = this.state.inputValue
    if(text.length <= 10) this.setState({ error: "Zu wenig Zeichen (mindestens 10)"})
    else if(text.length >= 500) this.setState({ error: "Zu viele Zeichen (höchstens 500)"})
    else{
      sendEmail("Feedback", this.state.inputValue)
      .then(() => this.setState({ visible: true }))
      this.textInput.clear()
      this.setState({ error: false })
    }
  }

  render(){
    return(
      <View style={styles.container}>
        <TextInput
          placeholder="Text hier eingeben..."
          mode="outlined"
          multiline={true}
          error={this.state.error}
          value={this.state.inputValue}
          onChangeText={text => this.setState({ inputValue: text })}
          ref={r => this.textInput = r}
        />
        <HelperText type="error" visible={this.state.error}>{this.state.error}</HelperText>
        <Button icon="send" mode="outlined" onPress={this.buttonClicked.bind(this)}>Senden</Button>
        <Snackbar
          visible={this.state.visible}
          onDismiss={() => this.setState({ visible: false })}
          duration={2000}
        >
          Vielen Dank für dein Feedback
        </Snackbar>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  }
})
