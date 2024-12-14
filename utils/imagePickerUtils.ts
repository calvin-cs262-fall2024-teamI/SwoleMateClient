import * as ImagePicker from "expo-image-picker";

export const handlePickImageAsync = async (
  setImageUri: React.Dispatch<React.SetStateAction<string | null>>,
  setProfileImageForm: React.Dispatch<React.SetStateAction<FormData | null>>
) => {
  console.log("Image picker invoked");
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    console.log("Image picker result:", result);

    if (!result.canceled) {
      const localUri = result.assets[0].uri;
      console.log("Selected image URI:", localUri);

      const filename = localUri.split("/").pop();
      // infer type of image:
      const match = /\.(\w+)$/.exec(filename!);
      const type = match ? `image/${match[1]}` : `image`;
      setImageUri(localUri);
      // Prepare FormData for file upload
      const formData = new FormData();
      // @ts-expect-error: special react native format for form data
      formData.append("profilePicture", {
        type: type,
        uri: localUri,
        name: filename,
      });
      setProfileImageForm(formData);
    }
  } catch (error) {
    console.error("Error during image selection:", error);
  }
};
