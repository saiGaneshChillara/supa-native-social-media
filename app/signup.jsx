import { Pressable, StyleSheet, Text, View, Alert } from "react-native";
import Icon from "../assets/icons";
import ScreenWrapper from "../components/ScreenWrapper";
import { StatusBar } from "expo-status-bar";
import BackButton from "../components/BackButton";
import { useRouter } from "expo-router";
import { hp, wp } from "../helpers/common";
import { theme } from "../constants/theme";
import Input from "../components/Input";
import { useRef, useState } from "react";
import Button from "../components/Button";

const Signup = () => {
  const router = useRouter();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const nameRef = useRef("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!emailRef.current || !passwordRef.current || !nameRef.current) {
      Alert.alert("Sign Up", "please fill all the fields");
      return;
    }
  };
  return (
    <ScreenWrapper bg={"white"}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <BackButton router={router} />
        {/* Welcome text */}
        <View>
          <Text style={styles.welcomeText}>Let&apos;s</Text>
          <Text style={styles.welcomeText}>Get Started</Text>
        </View>
        {/* form */}
        <View style={styles.form}>
          <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>
            Please fill the details to create an account.
          </Text>
          <Input 
            icon={<Icon name={"user"} size={26} strokeWith={1.6} />}
            placeholder="Enter your name"
            onChangeText={value => nameRef.current = value}
          />
          <Input 
            icon={<Icon name={"mail"} size={26} strokeWidth={1.6} />}
            placeholder="Enter your email"
            onChangeText={value => emailRef.current = value}
          />
          <Input 
            icon={<Icon name={"lock"} size={26} strokeWidth={1.6} />}
            placeholder="Enter your password"
            onChangeText={value => passwordRef.current = value}
            secureTextEntry
          />
          {/* Login Button */}
          <Button title="Sign up" loading={loading} onPress={onSubmit} />
        </View>
        {/* footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Pressable onPress={() => router.push("login")}>
            <Text style={[styles.footerText, { color: theme.colors.primaryDark, fontWeight: theme.fonts.semibold }]}>Login</Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 45,
    paddingHorizontal: wp(5),
  },
  welcomeText: {
    fontSize: hp(4),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
  },
  form: {
    gap: 25,
  },
  forgotPassword: {
    textAlign: "right",
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  footerText: {
    textAlign: "center",
    color: theme.colors.text,
    fontSize: hp(1.6),
  }
});