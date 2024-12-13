import React, { useState } from "react";
import {
  Text,
  TextInput,
  Button,
  ScrollView,
  View,
  Image,
  Switch,
  Modal,
  TouchableOpacity,
  FlatList,
} from "react-native";
import BaseView from "./components/BaseView";
import { IUser, RegisterRequest } from "@/api/interfaces";
import { handlePickImageAsync } from "@/utils/imagePickerUtils";
import { api } from "@/api";
import { ExperienceLevel, Gender } from "@/api/enums";
import storage from "@/storage";
import { router } from "expo-router";

const RegisterScreen = () => {
  const [form, setForm] = useState<RegisterRequest>({
    emailAddress: "",
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    city: "",
    height_feet: 0,
    height_inches: 0,
    weight: 0,
    age: 0,
    gender: "",
    profilePictureUrl: null,
    experienceLevel: "",
    bio: "",
    isTrainer: false,
    cost: 0,
  });
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [profileImageForm, setProfileImageForm] = useState<FormData | null>(
    null
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [pickerType, setPickerType] = useState<"gender" | "experienceLevel">();
  const [modalOptions, setModalOptions] = useState<string[]>([]);

  const handleChange = (field: keyof RegisterRequest, value: any) => {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const handleSubmit = async () => {
    const requiredFields = [
      "emailAddress",
      "username",
      "password",
      "firstName",
      "lastName",
      "city",
      "height_feet",
      "height_inches",
      "weight",
      "age",
      "gender",
      "experienceLevel",
    ];
    const newErrors: Record<string, string> = {};

    for (const field of requiredFields) {
      if (!form[field as keyof RegisterRequest]) {
        newErrors[field] = `This field is required.`;
      }
    }

    if (form.isTrainer && form.cost === 0) {
      newErrors.cost = "Cost is required if you are a trainer.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const status = await api.auth.register(form);
    if (status) {
      router.replace("/match");
      //upload image
      if (!profileImageForm) {
        console.error("Profile image form is null. No file to upload.");
      } else {
        try {
          await api.image.upload(profileImageForm);
        } catch (error) {
          console.error("Failed to upload profile image:", error);
        }
      }
    }
  };

  const openModal = (type: "gender" | "experienceLevel", options: string[]) => {
    setPickerType(type);
    setModalOptions(options);
    setModalVisible(true);
  };

  const handleModalSelect = (value: string) => {
    if (pickerType === "gender") {
      setForm({ ...form, gender: value.toLowerCase() });
    } else {
      setForm({
        ...form,
        experienceLevel: value.toLowerCase(),
      });
    }
    setModalVisible(false);
  };

  return (
    <BaseView className="flex-1 bg-gray-100">
      <ScrollView className="px-4 py-6">
        <Text className="text-2xl font-bold text-center mb-6">Register</Text>

        {/* Image Picker Section */}
        <View className="mb-6 items-center">
          {imageUri && (
            <Image
              source={{ uri: imageUri }}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
          )}
          <Button
            title={imageUri ? "Change Photo" : "Select Photo"}
            onPress={() =>
              handlePickImageAsync(setImageUri, setProfileImageForm)
            }
          />
        </View>

        {/* Form Fields */}
        <View className="mb-4">
          <Text>Email Address</Text>
          <TextInput
            placeholder="Email Address"
            className="border border-gray-300 rounded p-3"
            value={form.emailAddress}
            onChangeText={text => handleChange("emailAddress", text)}
          />
          {errors.emailAddress && (
            <Text className="text-red-500 text-sm">{errors.emailAddress}</Text>
          )}
        </View>
        <View className="mb-4">
          <Text>Password</Text>
          <TextInput
            placeholder="Password"
            className="border border-gray-300 rounded p-3"
            value={form.password}
            onChangeText={text => handleChange("password", text)}
          />
          {errors.password && (
            <Text className="text-red-500 text-sm">{errors.password}</Text>
          )}
        </View>

        <View className="mb-4">
          <Text>Username</Text>
          <TextInput
            placeholder="Username"
            className="border border-gray-300 rounded p-3"
            value={form.username}
            onChangeText={text => handleChange("username", text)}
          />
          {errors.username && (
            <Text className="text-red-500 text-sm">{errors.username}</Text>
          )}
        </View>

        {/* Gender Modal Trigger */}
        <View className="mb-4">
          <Text>Gender</Text>
          <TouchableOpacity
            onPress={() => openModal("gender", ["Male", "Female", "Other"])}
            className="border border-gray-300 rounded p-3"
          >
            <Text>{form.gender || "Select Gender"}</Text>
          </TouchableOpacity>
          {errors.gender && (
            <Text className="text-red-500 text-sm">{errors.gender}</Text>
          )}
        </View>

        {/* Experience Level Modal Trigger */}
        <View className="mb-4">
          <Text>Experience Level</Text>
          <TouchableOpacity
            onPress={() =>
              openModal("experienceLevel", [
                "Beginner",
                "Intermediate",
                "Advanced",
              ])
            }
            className="border border-gray-300 rounded p-3"
          >
            <Text>{form.experienceLevel || "Select Experience Level"}</Text>
          </TouchableOpacity>
          {errors.experienceLevel && (
            <Text className="text-red-500 text-sm">
              {errors.experienceLevel}
            </Text>
          )}
        </View>

        <View className="mb-4">
          <Text>First Name</Text>
          <TextInput
            placeholder="First Name"
            className="border border-gray-300 rounded p-3"
            value={form.firstName}
            onChangeText={text => handleChange("firstName", text)}
          />
          {errors.firstName && (
            <Text className="text-red-500 text-sm">{errors.firstName}</Text>
          )}
        </View>

        <View className="mb-4">
          <Text>Last Name</Text>
          <TextInput
            placeholder="Last Name"
            className="border border-gray-300 rounded p-3"
            value={form.lastName}
            onChangeText={text => handleChange("lastName", text)}
          />
          {errors.lastName && (
            <Text className="text-red-500 text-sm">{errors.lastName}</Text>
          )}
        </View>

        <View className="mb-4">
          <Text>City</Text>
          <TextInput
            placeholder="City"
            className="border border-gray-300 rounded p-3"
            value={form.city}
            onChangeText={text => handleChange("city", text)}
          />
          {errors.city && (
            <Text className="text-red-500 text-sm">{errors.city}</Text>
          )}
        </View>

        <View className="flex-row justify-between mb-4">
          <View className="flex-1 mr-2">
            <Text>Height (Feet)</Text>
            <TextInput
              placeholder="Height (feet)"
              keyboardType="numeric"
              className="border border-gray-300 rounded p-3"
              value={form.height_feet === 0 ? "" : String(form.height_feet)}
              onChangeText={text =>
                handleChange("height_feet", text ? Number(text) : 0)
              }
            />
            {errors.height_feet && (
              <Text className="text-red-500 text-sm">{errors.height_feet}</Text>
            )}
          </View>

          <View className="flex-1 ml-2">
            <Text>Height (Inches)</Text>
            <TextInput
              placeholder="Height (inches)"
              keyboardType="numeric"
              className="border border-gray-300 rounded p-3"
              value={form.height_inches === 0 ? "" : String(form.height_inches)}
              onChangeText={text =>
                handleChange("height_inches", text ? Number(text) : 0)
              }
            />
            {errors.height_inches && (
              <Text className="text-red-500 text-sm">
                {errors.height_inches}
              </Text>
            )}
          </View>
        </View>

        <View className="mb-4">
          <Text>Weight (lbs)</Text>
          <TextInput
            placeholder="Weight"
            keyboardType="numeric"
            className="border border-gray-300 rounded p-3"
            value={form.weight === 0 ? "" : String(form.weight)}
            onChangeText={text => handleChange("weight", Number(text))}
          />
          {errors.weight && (
            <Text className="text-red-500 text-sm">{errors.weight}</Text>
          )}
        </View>

        <View className="mb-4">
          <Text>Age</Text>
          <TextInput
            placeholder="Age"
            keyboardType="numeric"
            className="border border-gray-300 rounded p-3"
            value={form.age === 0 ? "" : String(form.age)}
            onChangeText={text => handleChange("age", Number(text))}
          />
          {errors.age && (
            <Text className="text-red-500 text-sm">{errors.age}</Text>
          )}
        </View>

        {/* Bio Field */}
        <View className="mb-4">
          <Text>Bio</Text>
          <TextInput
            placeholder="Short Bio"
            multiline
            numberOfLines={4}
            className="border border-gray-300 rounded p-3"
            value={form.bio ? form.bio : ""}
            onChangeText={text => handleChange("bio", text)}
          />
        </View>

        {/* Trainer Fields */}
        <View className="mb-4">
          <Text>Are you a trainer?</Text>
          <Switch
            value={form.isTrainer}
            onValueChange={value => handleChange("isTrainer", value)}
          />
        </View>

        {form.isTrainer && (
          <View className="mb-4">
            <Text>Cost per session</Text>
            <TextInput
              placeholder="Cost"
              keyboardType="numeric"
              className="border border-gray-300 rounded p-3"
              value={form.cost === 0 ? "" : String(form.cost)}
              onChangeText={text => handleChange("cost", Number(text))}
            />
            {errors.cost && (
              <Text className="text-red-500 text-sm">{errors.cost}</Text>
            )}
          </View>
        )}

        <View className="mb-4">
          <Button title="Submit" onPress={handleSubmit} />
        </View>

        {/* Modal for Picker */}
        <Modal visible={modalVisible} transparent={true} animationType="slide">
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "transparent", // Make the backdrop transparent
            }}
          >
            <View className="bg-white p-6 rounded-lg w-80">
              <FlatList
                data={modalOptions}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleModalSelect(item)}>
                    <Text className="text-lg py-2">{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </BaseView>
  );
};

export default RegisterScreen;
