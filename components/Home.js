import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Pressable,
  ScrollView,
} from "react-native";
import { db } from "../config";
import { ref, onValue } from "firebase/database";
import PressableCard from "./PressableCard";
import Header from "./header";

import SkeletonLoader from "./Skeleton";

const Home = ({ route, navigation }) => {
  const { username } = route.params;

  const [searchText, setSearchText] = useState("");
  const [storeData, setStoreData] = useState([]);
  const [storeIds, setStoreIds] = useState([]);
  const [filteredStoreData, setFilteredStoreData] = useState([]);
  const [originalStoreData, setOriginalStoreData] = useState([]);

  const usernameToUserId = {
    Ram: "db4f73b6-5f22-4ca0-bcdb-0ad15749c46e",
    Shyam: "f9ceb8a8-8d11-4ac2-ba8c-8771613ab2a5",
  };

  const userId = usernameToUserId[username];

  const fetchStoreData = () => {
    const starCountRef = ref(db, "stores/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const storeDataArray = Object.entries(data);
        setStoreData(storeDataArray);
        setOriginalStoreData(storeDataArray);
      }
    });
  };

  const fetchStoreIds = () => {
    const starCountRef = ref(db, `users/${userId}/stores/`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const storeIdsArray = Object.values(data);
        setStoreIds(storeIdsArray);
      }
    });
  };

  const filterData = () => {
    if (storeData.length > 0 && storeIds.length > 0) {
      const filteredData = storeData.filter(([key, value]) =>
        storeIds.includes(key)
      );
      setFilteredStoreData(filteredData);
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
    if (text) {
      const filteredData = originalStoreData.filter(([key, value]) => {
        const lowerText = text.toLowerCase();
        return (
          value.address.toLowerCase().includes(lowerText) ||
          value.area.toLowerCase().includes(lowerText) ||
          value.name.toLowerCase().includes(lowerText)
        );
      });
      setFilteredStoreData(filteredData);
    } else {
      setFilteredStoreData(originalStoreData);
    }
  };

  const OnpressHandler = (item) => {
    console.log("card pressed");
    navigation.navigate("StoreScreen", {
      name: item[1].name,
      type: item[1].type,
      address: item[1].address,
    });
  };

  useEffect(() => {
    fetchStoreIds();
    fetchStoreData();
  }, [username]);

  useEffect(() => {
    filterData();
  }, [storeData, storeIds]);

  return (
    <View>
      <Header onSearch={handleSearch} />
      {filteredStoreData.length === 0 || storeData.length === 0 ? (
        [1, 2, 3, 4, 5, 6, 7, 8, 10, 11].map((ele) => {
          return <SkeletonLoader key={ele} />;
        })
      ) : (
        <FlatList
          data={filteredStoreData}
          renderItem={({ item, index }) => (
            <View>
              <PressableCard
                name={item[1].name}
                type={item[1].type}
                address={item[1].area}
                onPress={() => OnpressHandler(item)}
              />
            </View>
          )}
          keyExtractor={(item, index) => item[0]}
        />
      )}
    </View>
  );
};

export default Home;
