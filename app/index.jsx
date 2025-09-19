import { View } from "react-native";
import Loading from "../components/Loading";

export default function Index() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Loading />
    </View>
  );
}
