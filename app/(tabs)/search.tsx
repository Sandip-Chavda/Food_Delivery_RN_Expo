import CartButton from "@/components/CartButton";
import MenuCard from "@/components/MenuCard";
import { getCategories, getMenu } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { MenuItem } from "@/type";
import cn from "clsx";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SearchScreen = () => {
  const { category, query } = useLocalSearchParams<{
    query?: string;
    category?: string;
  }>();

  const { data, error, loading, refetch } = useAppwrite({
    fn: getMenu,
    params: { category: category ?? "", query: query ?? "", limit: 6 },
  });

  const { data: categories } = useAppwrite({
    fn: getCategories,
  });

  useEffect(() => {
    refetch({ category: category ?? "", query: query ?? "", limit: 6 });
  }, [category, query]);

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        columnWrapperClassName="gap-7"
        contentContainerClassName="gap-7 px-5 pb-32 "
        keyExtractor={(item) => item.$id}
        numColumns={2}
        data={data}
        renderItem={({ item, index }) => {
          const isFirstRightColItem = index % 2 === 0;

          return (
            <View
              className={cn(
                "flex-1 max-w-[48%]",
                !isFirstRightColItem ? "mt-10" : "mt-0"
              )}
            >
              <MenuCard item={item as MenuItem} />
            </View>
          );
        }}
        ListHeaderComponent={() => (
          <View className="my-5 gap-5 ">
            <View className="flex-between flex-row w-full">
              <View className="flex-start">
                <Text className="small-bold uppercase text-primary">
                  Search
                </Text>
                <View className="flex-start flex-row gap-x-1 mt-0.5">
                  <Text className="paragraph-semibold text-dark-100">
                    Find your favorite food
                  </Text>
                </View>
              </View>
              <CartButton />
            </View>
            <Text>Search Input</Text>
            <Text>Filter</Text>
          </View>
        )}
        ListEmptyComponent={() =>
          !loading && <Text className="">No Results</Text>
        }
      />
    </SafeAreaView>
  );
};

export default SearchScreen;
