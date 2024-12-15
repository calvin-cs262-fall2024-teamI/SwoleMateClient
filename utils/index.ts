/**
 * @fileoverview Common utility functions used across the application
 */

import { Alert } from "react-native";

/**
 * Shows an alert for unimplemented features
 * Used as a placeholder for features in development
 */
const notImplemented = () => {
  Alert.alert("Not Implemented", "Sorry, this feature is not implemented yet.");
};

export { notImplemented };
