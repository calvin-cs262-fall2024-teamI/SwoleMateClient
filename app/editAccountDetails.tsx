import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import styles from "./stylesheets/editAccountDetailsStyles";

export default function EditAccountDetails() {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleSaveChanges = () => {
    if (newPassword !== confirmPassword) {
      setPasswordMatch(false);
      return;
    }
    // Add logic to update account details
    console.log("Account updated:", { username, newPassword });
  };

  return (
    <SafeAreaView style={{ backgroundColor: "black", flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Edit Account Details</Text>

        <Text style={styles.label}>New Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Nothing"
          value={username}
          onChangeText={setUsername}
        />

        <Text style={styles.label}>New Password</Text>
        <TextInput
          style={styles.input}
          placeholder="New Password"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />

        <Text style={styles.label}>Confirm New Password</Text>
        <TextInput
          style={[styles.input, !passwordMatch && styles.invalidInput]}
          placeholder="Confirm New Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={text => {
            setConfirmPassword(text);
            setPasswordMatch(newPassword === text);
          }}
        />

        {!passwordMatch && (
          <Text style={styles.errorText}>Passwords do not match</Text>
        )}

        <TouchableOpacity
          style={styles.updateButton}
          onPress={handleSaveChanges}
        >
          <Text style={styles.updateButtonText}>Update Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
