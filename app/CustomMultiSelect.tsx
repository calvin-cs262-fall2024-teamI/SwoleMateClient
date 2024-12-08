import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

interface CustomMultiSelectProps {
  data: string[]; // List of items to display
  selectedItems: string[]; // Currently selected items
  onSelect: (item: string) => void; // Callback for when an item is selected
  label: string; // Label for the dropdown
}

const CustomMultiSelect: React.FC<CustomMultiSelectProps> = ({
  data,
  selectedItems,
  onSelect,
  label,
}) => {
  return (
    <View style={{ marginBottom: 20, width: "100%" }}>
      <Text style={{ fontSize: 16, marginBottom: 8 }}>{label}</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onSelect(item)}
            style={{
              padding: 10,
              backgroundColor: selectedItems.includes(item)
                ? "#4CAF50"
                : "#fff",
              borderBottomWidth: 1,
              borderBottomColor: "#ddd",
              marginBottom: 4,
            }}
          >
            <Text
              style={{
                color: selectedItems.includes(item) ? "#fff" : "#000",
                fontWeight: selectedItems.includes(item) ? "bold" : "normal",
              }}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item}
      />
    </View>
  );
};

export default CustomMultiSelect;
