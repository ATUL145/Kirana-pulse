import { View, Text, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { db } from "../config";
import { ref, onValue } from "firebase/database";

const Fetch = () => {
  const [storeData, setStoreData] = useState([]);
  const [storeIds, setStoreIds] = useState([]);
  const [filteredStoreData, setFilteredStoreData] = useState([]);
  const username = "db4f73b6-5f22-4ca0-bcdb-0ad15749c46e";

  // Function to fetch store data
  const fetchStoreData = () => {
    const starCountRef = ref(db, "stores/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert the data into an array of key-value pairs
        const storeDataArray = Object.entries(data);
        setStoreData(storeDataArray);

        // Filter the store data when both storeData and storeIds are available
        if (storeIds.length > 0) {
          const filteredData = storeDataArray.filter(([key, value]) =>
            storeIds.includes(key)
          );
          setFilteredStoreData(filteredData);
        }
      }
    });
  };

  // Function to fetch store IDs
  const fetchStoreIds = () => {
    const starCountRef = ref(db, `users/${username}/stores/`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const storeIdsArray = Object.values(data);
        setStoreIds(storeIdsArray);

        // Filter the store data when both storeData and storeIds are available
        if (storeData.length > 0) {
          const filteredData = storeData.filter(([key, value]) =>
            storeIdsArray.includes(key)
          );
          setFilteredStoreData(filteredData);
        }
      }
    });
  };

  // Fetch both store data and store IDs
  useEffect(() => {
    fetchStoreData();
    fetchStoreIds();
  }, [username]);

  return (
    <View>
      <Text>Filtered Store Data Length: {filteredStoreData.length}</Text>
      <FlatList
        data={filteredStoreData}
        renderItem={({ item, index }) => (
          <View>
            <Text style={{ marginTop: 29 }}>{item[1].name}</Text>
          </View>
        )}
        keyExtractor={(item, index) => item[0]} // Use the key as the keyExtractor
      />
    </View>
  );
};

export default Fetch;
