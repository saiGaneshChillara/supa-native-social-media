import { useRouter } from "expo-router";
import { Button, Text } from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";

export default function Index() {
  const router = useRouter();
  return (
    // changed
    <ScreenWrapper>
      <Text>Index</Text>
      <Button title="welcome" onPress={() => router.push("welcome")} />
    </ScreenWrapper>
  );
}
