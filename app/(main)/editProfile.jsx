import { StyleSheet, Text, View, ScrollView, Pressable, Alert } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import { theme } from "../../constants/theme";
import { hp, wp } from "../../helpers/common";
import Header from "../../components/Header";
import { Image } from 'expo-image';
import { useAuth } from "../../contexts/AuthContext";
import { getUserImageSource } from "../../services/imageService";
import Icon from '../../assets/icons';
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useEffect, useState } from 'react';
import { updateUser } from '../../services/userService';
import { useRouter } from 'expo-router';


const EditProfile = () => {
  const { user, setUserData: setAuthData } = useAuth();

  const [userDetails, setUserDetails] = useState({
    name: "",
    phoneNumber: "",
    image: null,
    bio: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (user) {
      setUserDetails({
        name: user.name || "",
        phoneNumber: user.phoneNumber || "",
        image: user.image || "",
        bio: user.bio || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const onPickImage = async () => {};

  let imageSource = getUserImageSource(userDetails.image);

  const onSubmit = async () => {
    let userStateData = {...userDetails};
    let { name, phoneNumber, address, image, bio } = userStateData;
    if (!name || !phoneNumber || !address || !bio) {
      Alert.alert("Profile", "Please fill in all the fields");
      return;
    }

    setLoading(true);
    const res = await updateUser(user?.id, userStateData);
    setLoading(false);

    if (res.success) {
      setAuthData({ ...user, ...userStateData });
      router.back();
    }
  };

  return (
    <ScreenWrapper bg="white">
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <Header title={"Edit Profile"} />
          {/* form */}
          <View style={styles.form}>
            <View style={styles.avatarContainer}>
              <Image 
                source={imageSource}
                style={styles.avatar}
              />
              <Pressable onPress={onPickImage}>
                <Icon name="camera" size={20} strokeWidth={2.5} style={styles.cameraIcon} />
              </Pressable>
            </View>
            <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>Please fill your profile details</Text>
            <Input 
              icon={<Icon name={"user"} />}
              placeholder={"Enter your name"}
              value={userDetails.name}
              onChangeText={value => setUserDetails({ ...userDetails, name: value })}
            />
            <Input 
              icon={<Icon name="call" />}
              placeholder="Enter your phone number"
              value={userDetails.phoneNumber}
              onChangeText={value => setUserDetails({ ...userDetails, phoneNumber: value })}
            />
            <Input 
              icon={<Icon name="location" />}
              placeholder="Enter your address"
              value={userDetails.address}
              onChangeText={value => setUserDetails({ ...userDetails, address: value })}
            />
            <Input 
              placeholder="Enter your bio"
              value={userDetails.bio}
              onChangeText={value => setUserDetails({ ...userDetails, bio: value })}
              multiline={true}
              containerStyles={styles.bio}
            />

            <Button title="Update" loading={loading} onPress={onSubmit} />
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(4),
  },
  avatarContainer: {
    height: hp(14),
    width: hp(14),
    alignSelf: "center",
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: theme.radius.xxl * 1.8,
    borderCurve: "continous",
    borderWidth: 1,
    borderColor: theme.colors.darkLight,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 8,
    right: -5,
    padding: 8,
    borderRadius: 50,
    backgroundColor: "white",
    shadowColor: theme.colors.textLight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 7,
  },
  form: {
    gap: 18,
    marginTop: 20,
  },
  input: {
    flexDirection: 'row',
    borderWidth: 0.4,
    borderColor: theme.colors.text,
    borderRadius: theme.radius.xxl,
    borderCurve: "continous",
    padding: 17,
    paddingHorizontal: 20,
    gap: 15,
  },
  bio: {
    flexDirection: "row",
    height: hp(15),
    alignItems: "flex-start",
    paddingVertical: 15,
  }
});