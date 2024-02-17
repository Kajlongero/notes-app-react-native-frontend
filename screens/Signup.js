import { StyleSheet, Text, View, Keyboard } from "react-native";
import { NavbarTop } from "../components/NavbarTop";
import { Avatar } from "react-native-paper";
import { PrimaryDarkButton } from "../components/PrimaryDarkButton";
import { usePost } from "../hooks/usePost";
import { API_SIGNUP } from "../utils/APIs";
import { useGlobalStore } from "../stores/useGlobalStore";
import { LoadingSpin } from "../components/LoadingSpin";
import { TextInputComponent } from "../components/TextInputComponent";
import { SnackbarComponent } from "../components/SnackbarComponent";
import { ErrorWithText } from "../components/ErrorWithText";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "../utils/validators";
import { useState } from "react";

export const Signup = ({ navigation }) => {
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const typeErrors = useGlobalStore((s) => s.typeError);

  const handleUsernameType = useGlobalStore((s) => s.handleUsernameType);
  const handlePasswordType = useGlobalStore((s) => s.handlePasswordType);
  const handleEmailType = useGlobalStore((s) => s.handleEmailType);

  const email = useGlobalStore((s) => s.auth.email);
  const password = useGlobalStore((s) => s.auth.password);
  const username = useGlobalStore((s) => s.auth.username);

  const handleAuthEmail = useGlobalStore((s) => s.handleAuthEmail);
  const handleAuthPassword = useGlobalStore((s) => s.handleAuthPassword);
  const handleAuthUsername = useGlobalStore((s) => s.handleAuthUsername);
  const handleAuthSession = useGlobalStore((s) => s.handleAuthSession);

  const updateUser = useGlobalStore((s) => s.updateUser);
  const clearTypeError = useGlobalStore((s) => s.clearTypeError);
  const clearAuth = useGlobalStore((s) => s.clearAuth);

  const { loading, error, clearError, handleAuthPost } = usePost(
    API_SIGNUP,
    updateUser
  );

  const handlePress = async () => {
    Keyboard.dismiss();
    clearTypeError();

    const isValidUsername = validateUsername(username);
    if (!isValidUsername || !username.length) handleUsernameType(true);

    const isValidEmail = validateEmail(email);
    if (!isValidEmail || !email.length) handleEmailType(true);

    const isValidPassword = validatePassword(password);
    if (!isValidPassword || !password.length) handlePasswordType(true);

    if (!isValidUsername || !isValidEmail || !isValidPassword) return;

    const user = await handleAuthPost(
      {
        email: email.trim(),
        password: password.trim(),
        username: username.trim(),
      },
      handleAuthSession
    );

    clearTypeError();
    clearAuth();
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
        <Text style={s.signup}>Sign up</Text>
        {loading && <LoadingSpin animating={true} color="#7c25b0" size={40} />}
        <View style={s.inputsContainer}>
          <TextInputComponent
            iconLeft="account"
            placeholder="Username"
            action={handleAuthUsername}
            value={username}
            error={typeErrors.username}
          />
          {typeErrors.username && (
            <ErrorWithText
              title={
                username.length < 3
                  ? "Username must have a 3 characters long as min"
                  : "Username must contain a-Z, 0-9 and '* , .' characters"
              }
              icon="alert-circle"
            />
          )}
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
                password.length <= 7
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
        <PrimaryDarkButton title="Sign up" action={handlePress} />
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
  signup: {
    color: "#fff",
    fontSize: 28,
    marginTop: 8,
  },
  inputsContainer: {
    flexDirection: "column",
    width: "75%",
    marginVertical: 32,
  },
});
