import React from "react";
import { Categoria } from "./model/entities/Categoria";
import { Provider } from "@react-native-material/core";
import { NavigationContainer } from "@react-navigation/native";
import HomeView from "./views/Home/HomeView";

class App extends React.Component<any, any> {

  render() {

    return (
      // @ts-ignore
      <Provider>
        <NavigationContainer>
          {/*<TabsComponent />*/}
          <HomeView />
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
