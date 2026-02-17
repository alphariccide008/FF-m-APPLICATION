import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#0A8F83",
        tabBarInactiveTintColor: "#9CA3AF",

        // 👇 overall tab bar sizing
        tabBarStyle: {
          height: 68,
          paddingTop: 6,
          paddingBottom: 8,
        },

        // 👇 label styling
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          marginTop: -2,
        },
      }}
    >
      {/* HOME */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <View style={{ paddingBottom: 4 }}>
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={20}
                color={color}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="orderFuel"
        options={{
          href: null, // ✅ hides it from the tab buttons
          title: "Order Fuel",
        }}
      />


       {/* ORDERS */}
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Orders",
          tabBarIcon: ({ color, focused }) => (
            <View style={{ paddingBottom: 4 }}>
              <Ionicons
                name={focused ? "receipt" : "receipt-outline"}
                size={20}
                color={color}
              />
            </View>
          ),
        }}
      />


      {/* WALLET */}
      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallet",
          tabBarIcon: ({ color, focused }) => (
            <View style={{ paddingBottom: 4 }}>
              <Ionicons
                name={focused ? "wallet" : "wallet-outline"}
                size={20}
                color={color}
              />
            </View>
          ),
        }}
      />

     
      {/* PROFILE */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <View style={{ paddingBottom: 10 }}>
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={20}
                color={color}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
