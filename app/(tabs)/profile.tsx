import CustomButton from "@/components/CustomButton";
import useAuthStore from "@/store/auth.store";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";

const ProfileScreen = () => {
  const { isLoading, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    router.replace("/(auth)/sign-in");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 15,
      }}
    >
      {/* ...other profile UI... */}
      <CustomButton
        title="Logout"
        onPress={handleLogout}
        isLoading={isLoading}
      />
    </View>
  );
};

export default ProfileScreen;
