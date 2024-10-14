import {Platform, Keyboard } from 'react-native';
import React from 'react';
import { Dialog } from 'react-native-paper';

const KeyboardAvoidingDialog = ({ children, style, ...rest }) => {
  const [bottom, setBottom] = React.useState(0);

  React.useEffect(() => {
    function onKeyboardShow(e) {
      setBottom(e.endCoordinates.height); // Set the bottom padding to keyboard height
    }

    function onKeyboardHide() {
      setBottom(0); // Reset when keyboard is hidden
    }

    if (Platform.OS === 'ios') {
      const showSubscription = Keyboard.addListener('keyboardWillShow', onKeyboardShow);
      const hideSubscription = Keyboard.addListener('keyboardWillHide', onKeyboardHide);

      return () => {
        showSubscription.remove();
        hideSubscription.remove();
      };
    } else {
      const showSubscription = Keyboard.addListener('keyboardDidShow', onKeyboardShow);
      const hideSubscription = Keyboard.addListener('keyboardDidHide', onKeyboardHide);

      return () => {
        showSubscription.remove();
        hideSubscription.remove();
      };
    }
  }, []);

  return (
    <Dialog style={[style, { marginBottom: bottom }]} {...rest}>
      {children}
    </Dialog>
  );
};

export default KeyboardAvoidingDialog;
