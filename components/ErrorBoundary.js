import { Text, View } from 'react-native'
import React, { Component } from 'react'

export class ErrorBoundary extends Component {
    state = { hasError: false }
    static getDerivedStateFromError(error) {
        return { hasError: true }
    }
    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo)
    }
  render() {
    if (this.state.hasError) {
        return (
            <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style = {{fontSize: 40, fontWeight: 'bold'}}> Something went wrong </Text>
            </View>
        )
    }
    return (
        this.props.children
    )
  }
}

export default ErrorBoundary