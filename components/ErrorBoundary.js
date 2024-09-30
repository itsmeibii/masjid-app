import { Text, View , Image} from 'react-native'
import React, { Component } from 'react'



export class ErrorBoundary extends Component {
    state = { hasError: false, error: null }
    static getDerivedStateFromError(error) {
        return { hasError: true , error}
    }
    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo)
        
    }
  render() {
    if (this.state.hasError) {
        let {error} = this.state;

        if (error.message === 'down') {
        return (
            <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Image source = {require('../assets/splashlogo.png')} style = {{width: 200, height: 200, marginVertical: 30,}}/>
                <Text style = {{fontSize: 40, fontWeight: 'bold'}}>Halaqah is currently down for maintenance. Please check later</Text>
            </View>
        )
    } else {
        return (
            <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Image source = {require('../assets/splashlogo.png')} style = {{width: 200, height: 200, marginVertical: 30,}}/>
                <Text style = {{fontSize: 40, fontWeight: 'bold'}}>Internal Server Error. Please try again later</Text>
            </View>
        )
    }
    }
    return (
        this.props.children
    )
  }
}

export default ErrorBoundary