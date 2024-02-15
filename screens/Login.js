import { useEffect, useState } from "react";
import { Avatar } from "react-native-paper";
import { Keyboard, StyleSheet, Text, View } from "react-native";
import { API_LOGIN } from "../utils/APIs";
import { usePost } from "../hooks/usePost";
import { useGlobalStore } from "../stores/useGlobalStore";
import { NavbarTop } from "../components/NavbarTop";
import { ErrorWithText } from "../components/ErrorWithText";
import { TextInputComponent } from "../components/TextInputComponent";
import { LoadingSpin } from "../components/LoadingSpin";
import { SnackbarComponent } from "../components/SnackbarComponent";
import { PrimaryDarkButton } from "../components/PrimaryDarkButton";
import { validateEmail, validatePassword } from "../utils/validators";

export const Login = ({ navigation }) => {
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const typeErrors = useGlobalStore((s) => s.typeError);

  const handlePasswordType = useGlobalStore((s) => s.handlePasswordType);
  const handleEmailType = useGlobalStore((s) => s.handleEmailType);

  const email = useGlobalStore((s) => s.auth.email);
  const password = useGlobalStore((s) => s.auth.password);

  const handleAuthEmail = useGlobalStore((s) => s.handleAuthEmail);
  const handleAuthPassword = useGlobalStore((s) => s.handleAuthPassword);
  const handleAuthSession = useGlobalStore((s) => s.handleAuthSession);

  const updateUser = useGlobalStore((s) => s.updateUser);
  const clearTypeError = useGlobalStore((s) => s.clearTypeError);
  const clearAuth = useGlobalStore((s) => s.clearAuth);

  const { error, loading, handleAuthPost, clearError } = usePost(
    API_LOGIN,
    updateUser
  );

  const handlePress = async () => {
    Keyboard.dismiss();
    clearTypeError();

    const isValidEmail = validateEmail(email);
    if (!isValidEmail || !email.length) handleEmailType(true);

    const isValidPassword = validatePassword(password);
    if (!isValidPassword || password.length <= 7) handlePasswordType(true);

    if (!isValidEmail || !isValidPassword || password.length <= 7) return;

    await handleAuthPost({ email, password }, handleAuthSession);

    if (!error.err) {
      clearAuth();
      clearTypeError();
    }
  };

  return (
    <>
      <NavbarTop
        actionArrow={() => navigation.pop()}
        actionArrowColor="#fff"
        backgroundColor="#0a0a0a"
      />
      <View style={s.container}>
        <Avatar.Icon
          size={128}
          icon="account"
          color="#fff"
          style={{
            backgroundColor: "#2a2a2a",
          }}
        />
        <Text style={s.login}>Log in</Text>
        {loading && <LoadingSpin animating={true} color="#7c25b0" size={40} />}
        <View style={s.inputsContainer}>
          <TextInputComponent
            iconLeft="email"
            placeholder="Email"
            value={email}
            action={handleAuthEmail}
            error={typeErrors.email}
          />
          {typeErrors.email && (
            <ErrorWithText
              title={
                !email.length
                  ? "Please input a email"
                  : "Please input a valid email"
              }
              icon="alert-circle"
            />
          )}
          <TextInputComponent
            iconLeft="lock"
            iconRight={hiddenPassword ? "eye-outline" : "eye-off"}
            iconRightPress={() => setHiddenPassword(!hiddenPassword)}
            hidePassword={hiddenPassword}
            placeholder="Password"
            value={password}
            action={handleAuthPassword}
            error={typeErrors.password}
          />
          {typeErrors.password && (
            <ErrorWithText
              title={
                password.length < 8
                  ? "Password must have 8 characters long as min"
                  : "Password must contain a-Z, 0-9 and '* , .' characters"
              }
              icon="alert-circle"
            />
          )}
        </View>
        <SnackbarComponent
          message={error.message}
          visible={error.err}
          action={clearError}
          dismiss={clearError}
          label="Hide"
        />
        <PrimaryDarkButton title="Log in" action={handlePress} />
      </View>
    </>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  login: {
    color: "#fff",
    fontSize: 28,
    marginTop: 8,
  },
  inputsContainer: {
    flexDirection: "column",
    width: "75%",
    gap: 16,
    marginVertical: 32,
    // backgroundColor: "red",
  },
});
