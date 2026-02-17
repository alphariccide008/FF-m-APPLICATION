import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="edit-profile"
        options={{
          headerShown: true,
          title: 'Edit Profile',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="saved-addresses"
        options={{
          headerShown: true,
          title: 'Saved Addresses',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="order-history"
        options={{
          headerShown: true,
          title: 'Order History',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="payment-methods"
        options={{
          headerShown: true,
          title: 'Payment Methods',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="notification-settings"
        options={{
          headerShown: true,
          title: 'Notifications',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="help-support"
        options={{
          headerShown: true,
          title: 'Help & Support',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="terms-privacy"
        options={{
          headerShown: true,
          title: 'Terms & Privacy',
          headerBackTitle: 'Back',
        }}
      />
    </Stack>
  );
}
