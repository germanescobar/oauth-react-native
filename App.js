import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { AuthSession } from 'expo';

const github = {
  clientId: '',
  scope: ['user:email']
};

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { code: "" };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>{ this.state.code }</Text>
        <Button onPress={this.authenticate.bind(this)} title="Authenticate with Github" />
      </View>
    );
  }

  async authenticate() {
    const { params } = await AuthSession.startAsync({
      authUrl: this.authUrlWithId(github.clientId, github.scope),
    });

    // llamar al servidor para obtener el JWT

    this.setState({ code: params.code });
  }

  authUrlWithId(id, scope) {
    return (
      `https://github.com/login/oauth/authorize?client_id=${id}&redirect_uri=http://localhost:3000/auth/github/mobile&scope=${encodeURIComponent(scope.join(' '))}`
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
