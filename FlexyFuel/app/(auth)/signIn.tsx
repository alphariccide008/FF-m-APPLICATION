import { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as authApi from "../../services/api/auth.api";
import { useAuthStore } from "../../stores/authStore";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function LoginScreen() {
  const router = useRouter();
  const { setUser, setTokens } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const emailEmpty = submitted && email.trim().length === 0;
  const emailInvalid =
    submitted && email.trim().length > 0 && !isValidEmail(email);

  const passwordEmpty = submitted && password.trim().length === 0;

  const passwordTooShort =
    submitted && password.trim().length > 0 && password.trim().length < 6;

  const canSubmit = useMemo(() => {
    return isValidEmail(email) && password.trim().length >= 6;
  }, [email, password]);

  const handleSignIn = async () => {
    setSubmitted(true);

    if (!canSubmit) return;

    try {
      setIsLoading(true);

      // Step 1: Login with email and password
      const result = await authApi.loginWithPassword(email.trim(), password.trim());

      // Step 2: Save user data and tokens to auth store
      setUser(result.user);
      setTokens(result.accessToken, result.refreshToken);

      // Step 3: Send email OTP for verification
      await authApi.sendEmailOTP(email.trim(), "verification");

      // Step 4: Navigate to email verification
      router.push({
        pathname: "/(auth)/verifyEmail",
        params: {
          email: email.trim(),
          fromRegistration: "true",
        },
      });
    } catch (error: any) {
      Alert.alert(
        "Login Failed",
        error.message || "Invalid email or password. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white px-10 pt-16" keyboardShouldPersistTaps="handled">
      {/* Back */}
      <Pressable onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" className="pt-[8%]" />
      </Pressable>

      {/* Title */}
      <Text className="text-[24px] mt-[30%] pb-3 font-bold">
        Welcome back!
      </Text>

      <Text className="text-[16px] pb-[10%] text-[#6B7280] mt-3">
        You can log in back to your account using your phone number
      </Text>

      {/* Email */}
      <Text className="font-semibold text-[14px] mb-3">Email Address</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        className={[
          "w-full border rounded-xl px-4 py-4",
          emailEmpty || emailInvalid ? "border-red-300" : "border-gray-300",
        ].join(" ")}
      />
      {emailEmpty && (
        <Text className="text-red-600 text-xs mt-2">Email is required</Text>
      )}
      {emailInvalid && (
        <Text className="text-red-600 text-xs mt-2">Enter a valid email</Text>
      )}

      {/* Password */}
      <Text className="font-semibold text-[14px] mb-3 mt-8">Password</Text>

      <View
        className={[
          "w-full relative border rounded-xl px-4 py-4 pr-12",
          passwordEmpty || passwordTooShort ? "border-red-300" : "border-gray-300",
        ].join(" ")}
      >
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          className="w-full"
        />

        {/* Show/hide password icon */}
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-[30%]"
        >
          <Ionicons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={22}
            color="#6B7280"
          />
        </TouchableOpacity>
      </View>

      {passwordEmpty && (
        <Text className="text-red-600 text-xs mt-2">Password is required</Text>
      )}

      {/* Optional rule like many apps */}
      {passwordTooShort && (
        <Text className="text-red-600 text-xs mt-2">
          Password must be at least 6 characters
        </Text>
      )}

      <TouchableOpacity onPress={() => router.push("/(auth)/forgetPassword")}>
        <Text className="text-right text-[14px] text-[#0A8F83] mb-6 mt-4">
          Forgot Password?
        </Text>
      </TouchableOpacity>

      {/* Sign In Button */}
      <TouchableOpacity
        className={[
          "w-full py-4 rounded-xl",
          canSubmit && !isLoading ? "bg-[#C4FF4B]" : "bg-[#C4FF4B]/70",
        ].join(" ")}
        onPress={handleSignIn}
        disabled={!canSubmit || isLoading}
        activeOpacity={0.85}
      >
        {isLoading ? (
          <ActivityIndicator color="#0A8F83" />
        ) : (
          <Text className="text-[#0A8F83] text-center font-semibold text-[16px]">
            Sign In
          </Text>
        )}
      </TouchableOpacity>

      {/* Sign In with Phone */}
      <View className="flex-row justify-center mt-6">
        <TouchableOpacity onPress={() => router.push("/(auth)/numbIn")}>
          <Text className="font-semibold text-[14px]">
            Sign In with Phone Number
          </Text>
        </TouchableOpacity>
      </View>

      {/* Sign Up */}
      <View className="flex-row justify-center mt-6">
        <Text className="font-semibold text-[14px]">Don't have an Account ? </Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/registration")}>
          <Text className="text-[#0A8F83] font-semibold">sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
