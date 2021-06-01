import React from 'react';
import MainNavigator from './screens/components/navigation/navigation';
import {Provider} from 'react-redux';
import {store, persistor} from './screens/Redux/Store/configureStore';
import {PersistGate} from 'redux-persist/integration/react';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainNavigator />
      </PersistGate>
    </Provider>
  );
}

export default App;
