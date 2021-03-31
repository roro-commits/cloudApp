import * as React from 'react';
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';
import {TImer} from './Timer'
import {SetTimer} from './Timer'

const MyComponent = () => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: '#c2c2c2', padding: 10};

  return (
    <Provider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <SetTimer/>
        </Modal>
      </Portal>
      <Button style={{marginTop: 5}} onPress={showModal}>
        Show
      </Button>
      <TImer/>
    </Provider>
  );
};

export default MyComponent;