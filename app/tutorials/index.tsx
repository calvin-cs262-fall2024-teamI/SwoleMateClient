import { View, Text, ScrollView } from "react-native";

const MatchTutorial = () => (
  <>
    <Text className="text-xl font-bold mb-4">Match Page Tutorial</Text>
    <ScrollView className="max-h-96">
      <View className="space-y-4">
        <View>
          <Text className="font-bold text-lg">Search</Text>
          <Text>Use the search bar to find users by name or username.</Text>
        </View>

        <View>
          <Text className="font-bold text-lg">Filters</Text>
          <Text>
            Click &quot;Show Filters&quot; to access advanced filtering options:
          </Text>
          <View className="ml-4 mt-2 space-y-2">
            <Text>• Gender: Filter by male, female, or all users</Text>
            <Text>• Age Range: Adjust the slider to set min/max age</Text>
            <Text>• Experience Level: Select one or more fitness levels</Text>
            <Text>
              • Trainer Filter: Toggle to show only certified trainers
            </Text>
          </View>
        </View>

        <View>
          <Text className="font-bold text-lg">User Cards</Text>
          <Text>
            Tap on any user card to view their detailed profile, including:
          </Text>
          <View className="ml-4 mt-2 space-y-2">
            <Text>• Profile picture and basic info</Text>
            <Text>• Age and location</Text>
            <Text>• Bio and experience level</Text>
            <Text>• Trainer status and rates (if applicable)</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  </>
);

const SocialTutorial = () => (
  <>
    <Text className="text-xl font-bold mb-4">Social Page Tutorial</Text>
    <ScrollView className="max-h-96">
      <View className="space-y-4">
        <View>
          <Text className="font-bold text-lg">Navigation Tabs</Text>
          <View className="ml-4 mt-2 space-y-2">
            <Text>• Matched: View your confirmed workout buddies</Text>
            <Text>• Pending: See who you&apos;ve sent requests to</Text>
            <Text>• Requests: View incoming buddy requests</Text>
          </View>
        </View>

        <View>
          <Text className="font-bold text-lg">Interacting with Users</Text>
          <View className="ml-4 mt-2 space-y-2">
            <Text>• Tap on a matched user to start chatting</Text>
            <Text>• Accept or decline incoming buddy requests</Text>
            <Text>• View user profile pictures and status</Text>
          </View>
        </View>

        <View>
          <Text className="font-bold text-lg">Managing Connections</Text>
          <Text>
            Keep track of your fitness connections and build your workout
            network:
          </Text>
          <View className="ml-4 mt-2 space-y-2">
            <Text>• Accept requests from potential workout partners</Text>
            <Text>• Monitor pending requests you&apos;ve sent</Text>
            <Text>• Chat with your matched buddies</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  </>
);

const ProfileTutorial = () => (
  <>
    <Text className="text-xl font-bold mb-4">Profile Page Tutorial</Text>
    <ScrollView className="max-h-96">
      <View className="space-y-4">
        <View>
          <Text className="font-bold text-lg">Profile Information</Text>
          <View className="ml-4 mt-2 space-y-2">
            <Text>• View and update your profile picture</Text>
            <Text>• See your personal information and bio</Text>
            <Text>• Check your fitness details and experience level</Text>
          </View>
        </View>

        <View>
          <Text className="font-bold text-lg">Profile Management</Text>
          <View className="ml-4 mt-2 space-y-2">
            <Text>• Edit Profile: Update your information</Text>
            <Text>
              • Trainer Status: View your trainer details if applicable
            </Text>
            <Text>• Logout: Securely sign out of your account</Text>
          </View>
        </View>

        <View>
          <Text className="font-bold text-lg">Personal Details</Text>
          <Text>Your profile displays important fitness information:</Text>
          <View className="ml-4 mt-2 space-y-2">
            <Text>• Physical stats (height, weight)</Text>
            <Text>• Location and contact details</Text>
            <Text>• Experience level and training rates (if trainer)</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  </>
);

export const getTutorialContent = (pathname: string) => {
  switch (pathname) {
    case "/match":
      return <MatchTutorial />;
    case "/social":
      return <SocialTutorial />;
    case "/profile":
      return <ProfileTutorial />;
    default:
      return (
        <Text className="text-lg text-center">Current route: {pathname}</Text>
      );
  }
};
