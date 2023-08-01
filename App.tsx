import { useFonts } from "expo-font";
import { fontFaces } from "./constants";
import { RootNavigator } from "./navigation";

export default function App() {
  const [fontsLoaded] = useFonts(fontFaces);

  return !fontsLoaded ? null : (
    <RootNavigator />
  );
}
