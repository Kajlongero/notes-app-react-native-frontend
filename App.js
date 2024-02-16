import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useGlobalStore } from "./stores/useGlobalStore";
import { Home } from "./screens/Home";
import { Welcome } from "./screens/Welcome";
import { Loading } from "./screens/Loading";
import { Login } from "./screens/Login";
import { Signup } from "./screens/Signup";
import { NewNote } from "./screens/NewNote";
import { EditNote } from "./screens/EditNote";
import { Favorites } from "./screens/Favorites";

const Stack = createNativeStackNavigator();

export default function App() {
  const hasSession = useGlobalStore((state) => state.auth.hasSession);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Loading"
        screenOptions={{
          headerShown: false,
          animation: "ios",
          contentStyle: {
            backgroundColor: "#0a0a0a",
          },
        }}
      >
        {hasSession ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="New Note" component={NewNote} />
            <Stack.Screen name="Edit Note" component={EditNote} />
            <Stack.Screen name="Favorites" component={Favorites} />
          </>
        ) : (
          <>
            <Stack.Screen name="Loading" component={Loading} />
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
