import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-paper";
import { PrimaryDarkButton } from "../components/PrimaryDarkButton";

export const Welcome = ({ navigation }) => {
  const handleNavigateTo = (to) => navigation.push(to);

  return (
    <View style={s.container}>
      <Icon source="notebook" size={96} color="#fff" />
      <Text style={s.title}>KajNotes</Text>
      <Text style={s.subtitle1}>Welcome to KajNotes</Text>
      <Text style={s.subtitle2}>
        Your app to make records of things you want to do!
      </Text>
      <View style={s.buttonsContainer}>
        <PrimaryDarkButton
          title="Sign up"
          icon="account-plus"
          iconSize={24}
          action={() => handleNavigateTo("Signup")}
        />
        <PrimaryDarkButton
          title="Log in"
          icon="login"
          iconSize={24}
          action={() => handleNavigateTo("Login")}
        />
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "600",
    marginVertical: 16,
  },
  subtitle1: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 8,
  },
  subtitle2: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "400",
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 16,
    marginTop: 32,
  },
});
