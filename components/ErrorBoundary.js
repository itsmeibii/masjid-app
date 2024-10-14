import { Text, Image, SafeAreaView} from 'react-native'
import React from 'react'



class ErrorBoundary extends React.Component {
    state = { hasError: false, error: null }
    
    static getDerivedStateFromError(error) {
        
        return { hasError: true , error}
    }
    componentDidCatch(error, errorInfo) {
        
    }
  render() {
    if (this.state.hasError) {
        
        let {error} = this.state;
        
        if (error.message.includes('down')) {
            
        return (
            <SafeAreaView style = {{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
                <Image source = {require('../assets/splashlogo.png')} style = {{width: 200, height: 200, marginVertical: 30,}}/>
                <Text style = {{fontSize: 15, fontWeight: 'bold', textAlign: 'center'}}>Halaqah is currently down for maintenance. Please check later</Text>
                
            </SafeAreaView>
        )
    } else {
        return (
            <SafeAreaView style = {{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}>
                <Image source = {require('../assets/splashlogo.png')} style = {{width: 200, height: 200, marginVertical: 30,}}/>
                <Text style = {{fontSize: 40, fontWeight: 'bold', textAlign: 'center'}}>Internal Server Error. Please try again later</Text>
                <Text style = {{fontSize: 15, fontWeight: 'bold', textAlign: 'center'}}>Error: {error.message}</Text>
                
            </SafeAreaView>
        )
    }
    }
    return (
        this.props.children
    )
  }
}

export default ErrorBoundary