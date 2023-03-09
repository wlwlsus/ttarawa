import { View } from 'react-native';
import { store } from './store/index';
import { Provider } from 'react-redux';

export default function App() {
  return (
    <Provider store={store}>
      <View></View>
    </Provider>
  );
}
