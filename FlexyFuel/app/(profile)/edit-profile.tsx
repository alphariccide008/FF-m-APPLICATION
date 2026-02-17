import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../stores/authStore';
import ErrorModal from '../../components/ErrorModal';
import SuccessModal from '../../components/SuccessModal';

export default function EditProfileScreen() {
  const router = useRouter();
  const { user } = useAuthStore();

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phoneNumber || '');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSave = async () => {
    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Call API to update profile
      // await updateProfile({ fullName, email });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => {
        router.back();
      }, 1500);
    } catch (error: any) {
      setErrorMessage(error.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-[#F6F9FB]">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Picture */}
        <View className="items-center mb-6">
          <View className="w-24 h-24 rounded-full bg-[#0A8F83] items-center justify-center">
            <Text className="text-white text-[32px] font-semibold">
              {fullName.charAt(0).toUpperCase() || 'U'}
            </Text>
          </View>
          <Pressable className="mt-3">
            <Text className="text-[#0A8F83] text-[14px] font-semibold">
              Change Photo
            </Text>
          </Pressable>
        </View>

        {/* Full Name */}
        <View className="mb-4">
          <Text className="text-[#374151] text-[14px] font-semibold mb-2">
            Full Name
          </Text>
          <TextInput
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter your full name"
            className="bg-white border border-[#E5E7EB] rounded-xl px-4 py-3.5 text-[15px]"
          />
        </View>

        {/* Email */}
        <View className="mb-4">
          <Text className="text-[#374151] text-[14px] font-semibold mb-2">
            Email Address
          </Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            className="bg-white border border-[#E5E7EB] rounded-xl px-4 py-3.5 text-[15px]"
          />
        </View>

        {/* Phone Number */}
        <View className="mb-6">
          <Text className="text-[#374151] text-[14px] font-semibold mb-2">
            Phone Number
          </Text>
          <TextInput
            value={phone}
            editable={false}
            className="bg-[#F3F4F6] border border-[#E5E7EB] rounded-xl px-4 py-3.5 text-[15px] text-[#9CA3AF]"
          />
          <Text className="text-[#9CA3AF] text-[12px] mt-1">
            Phone number cannot be changed
          </Text>
        </View>

        {/* Save Button */}
        <Pressable
          onPress={handleSave}
          disabled={isLoading}
          className={`py-4 rounded-xl items-center ${
            isLoading ? 'bg-[#0A8F83]/50' : 'bg-[#0A8F83]'
          }`}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text className="text-white text-[16px] font-semibold">
              Save Changes
            </Text>
          )}
        </Pressable>
      </ScrollView>

      <ErrorModal
        visible={!!errorMessage}
        message={errorMessage}
        onClose={() => setErrorMessage('')}
      />

      <SuccessModal
        visible={!!successMessage}
        message={successMessage}
        onClose={() => setSuccessMessage('')}
      />
    </View>
  );
}
