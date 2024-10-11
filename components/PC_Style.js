// styles/ProfileCreatorStyles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5%',
  },
  inputContainer: {
    width: '80%',
  },

  selectProfileImageBox: { // added a style for Select Profile Image box
    padding: '2%',
    borderColor: 'blue',
    borderWidth: 2,
    borderRadius: 5,
    alignSelf: 'absolute',
    right: '-14%', // Adjusted to be relative to the container
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  selectprofileText: { // added a style for select profile image text (similar to pickerText style)
    color: 'black',
    textAlign: 'center',
    fontSize: 15,
  },

  input: {
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent input background
    borderRadius: 5,
    marginBottom: '8%',
    paddingHorizontal: 10,
    borderColor: 'blue',
    borderWidth: 2,
  },
  heightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  heightInput: {
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Same style as other inputs
    borderRadius: 5,
    width: '48%',
    paddingHorizontal: 10,
    borderColor: 'blue',
    borderWidth: 2,
  },
  pickerLabel: {
    width: '80%',
    color: 'black',  // Changed to black
    fontSize: 16,
    marginBottom: 5,
  },
  pickerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '80%',
    borderColor: 'blue',
    borderWidth: 2,
  },
  pickerText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'black',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  buttonContainer: {
    backgroundColor: 'blue',
    padding: 10,
    width: '60%',
    borderRadius: 5,
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    color: 'black',  // Changed to black
  },
  profileImage: { // added a style to display profile image
    width: 60,
    height: 60,
    borderRadius: 10,
    position: 'absolute',
    top: '-10%', // Adjusted to be relative to the container
    right: '20%', // Adjusted to be relative to the container
  },
});

