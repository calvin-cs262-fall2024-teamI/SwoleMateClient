import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { router } from "expo-router";
import { api } from "@/api";
import { IUser } from "@/api/interfaces";

const Match = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<IUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await api.users.getUsers();
      setUsers(users);
      setFilteredUsers(users);
    };

    fetchUsers();
  }, []);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const filtered = users.filter(
      user =>
        user.username.toLowerCase().includes(text.toLowerCase()) ||
        user.firstName.toLowerCase().includes(text.toLowerCase()) ||
        user.lastName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const renderUserCard = ({ item }: { item: IUser }) => (
    <TouchableOpacity
      className="flex-row bg-mine p-4 rounded-xl mb-3 shadow-sm"
      onPress={() => {}}
    >
      <Image
        source={
          item.profilePictureUrl
            ? { uri: item.profilePictureUrl }
            : require("@/assets/avatars/1.png")
        }
        className="w-20 h-20 rounded-full mr-4"
      />
      <View className="flex-1">
        <Text className="text-lg font-semibold mb-1">
          {item.firstName} {item.lastName}
        </Text>
        <Text className="text-gray-600 mb-1">
          {item.age} years • {item.city}
        </Text>
        <Text className="text-gray-700 mb-1 text-sm">{item.bio}</Text>
        {item.isTrainer && (
          <Text className="text-blue-500 font-medium">
            Trainer • ${item.cost}/session
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <View className="px-4 pt-4">
        <TextInput
          className="h-10 px-4 bg-white rounded-lg border border-gray-200 mb-4"
          placeholder="Search users..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <FlatList
        data={filteredUsers}
        renderItem={renderUserCard}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
};

export default Match;
