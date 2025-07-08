import CartButton from "@/components/CartButton";
import { images, offers } from "@/constants";
import cn from "clsx";
import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        contentContainerClassName="pb-28 px-5"
        showsVerticalScrollIndicator={false}
        data={offers}
        ListHeaderComponent={() => (
          <View className="flex-between flex-row w-full my-5">
            <View className="flex-start">
              <Text className="small-bold text-primary">DELIVER TO.</Text>
              <TouchableOpacity className="flex-center flex-row gap-x-1 mt-0.5">
                <Text className="paragraph-bold text-dark-100">India</Text>
                <Image
                  source={images.arrowDown}
                  resizeMode="contain"
                  className="size-3"
                />
              </TouchableOpacity>
            </View>

            <CartButton />
          </View>
        )}
        renderItem={({ item, index }) => {
          const isEven = index % 2 === 0;

          return (
            <View>
              <Pressable
                onPress={() => {}}
                android_ripple={{ color: "#ffff22" }}
                className={cn(
                  "offer-card",
                  isEven ? "flex-row-reverse" : "flex-row"
                )}
                style={{ backgroundColor: item.color }}
              >
                {({ pressed }) => (
                  <React.Fragment>
                    <View className={`h-full w-1/2 `}>
                      <Image
                        source={item.image}
                        className={`size-full`}
                        resizeMode="contain"
                      />
                    </View>
                    <View
                      className={cn(
                        `offer-card__info`,
                        isEven ? "pl-10" : "pr-10"
                      )}
                    >
                      <Text className="h1-bold text-white leading-tight">
                        {item.title}
                      </Text>
                      <Image
                        source={images.arrowRight}
                        className="size-10"
                        resizeMode="contain"
                        tintColor={"#FFFFFF"}
                      />
                    </View>
                  </React.Fragment>
                )}
              </Pressable>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}
