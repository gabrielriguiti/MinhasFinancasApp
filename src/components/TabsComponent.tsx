import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/base";

import HomeView from "../views/Home/HomeView";
import LancamentoView from "../views/LancamentoView";
import LancamentosView from "../views/LancamentosView/LancamentosView";

const Tab = createBottomTabNavigator();

export function TabsComponent() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Principal"
                  component={HomeView}
                  options={{
                    tabBarIcon: () => <Icon name={"home"} />,
                    headerShown: false
                  }}
      />

      <Tab.Screen name="Adicionar"
                  component={LancamentoView}
                  options={{
                    tabBarIcon: () => <Icon name={"add"} />,
                    headerShown: false
                  }} />

      <Tab.Screen name="Lancamentos"
                  component={LancamentosView}
                  options={{
                    tabBarIcon: () => <Icon name={"list-alt"} />,
                    headerShown: false
                  }} />
    </Tab.Navigator>
  );
}
