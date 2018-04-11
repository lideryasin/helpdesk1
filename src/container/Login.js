import React, { Component } from 'react';
import { TextInput, AsyncStorage } from 'react-native';
//import { Button, Card, CardSection, Header, Spinner } from '../components/index';
import Button from '../components/Button';
import Card from '../components/Card';
import CardSection from '../components/CardSection';
import Header from '../components/Header';
import Spinner from '../components/Spinner';


class LoginForm extends Component {
    state = { email: 'testEmp', password: '1234' };

    componentWillMount() {
        this.getIDToken()
    }

    render() {
        const { inputStyle } = styles;
        return (
            <Card>

                <Header headerText="Giriş Ekranı" />

                <CardSection>
                    <TextInput
                        placeholder="E-mail"
                        style={inputStyle}
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                    />
                </CardSection>

                <CardSection>
                    <TextInput
                        secureTextEntry
                        placeholder="Password"
                        style={inputStyle}
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                    />
                </CardSection>

                <CardSection>
                    <Button onPress={this.buttonClick.bind(this)}> GİRİŞ </Button>
                </CardSection>
            </Card>
        );
    }

    getAccessToken(idToken) {
        let url = ''

        return fetch(url, {
            headers: {
                'content-type': 'application/json',
                'authorization': idToken
            },
            method: 'POST'
        })
    }

    buttonClick() {
        let url = ''

        let body = {
            email: this.state.email,
            password: this.state.password
        }

        fetch(url, {
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        })
            .then(response => response.json())
            .then(async ({ idToken }) => {
                await this.saveIDToken(idToken)
                return this.getAccessToken(idToken)
            })
            .then(response => response.json())
            .then(({ token }) => {
                console.log(token)
            })
            .catch(console.log)
    }

    saveIDToken(idToken) {
        AsyncStorage.setItem('ID_TOKEN', idToken, (error) => {
            if (error) {
                console.log(error)
            } else {
                console.log('Y;HHAHAHaHAHA')
            }
        })
    }

    async getIDToken() {
        try {
            const value = await AsyncStorage.getItem('ID_TOKEN')

            console.log(value)
            console.log("kjlkjl")
        } catch (error) {
            console.log(error)
        }
    }
}

const styles = {

    inputStyle: {
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        flex: 1
    },

};

export default LoginForm;