import { AntDesign, FontAwesome } from "@expo/vector-icons";
import React, {
  useEffect,
  useRef,
  useState,
  useContext,
  c,
  createContext,
} from "react";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
const window = Dimensions.get("window");

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const usernameInputRef = useRef(null);

  useEffect(() => {
    usernameInputRef.current.focus();
  }, [username]);

  const handleLogin = () => {
    if (username.trim() === "" || password.trim() === "") {
      ToastAndroid.showWithGravityAndOffset(
        "Please enter both username and password",
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        25,
        50
      );
    } else if (
      password === "retailpulse" &&
      (username === "Ram" || username === "Shyam")
    ) {
      navigation.navigate("HomeScreen", { username: username });
      console.log(
        "🚀 ~ file: LoginScreen.js:43 ~ handleLogin ~ username:",
        username
      );
    } else {
      ToastAndroid.showWithGravityAndOffset(
        "Invalid Credentials",
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        25,
        50
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.keyboardAvoidingContainer}>
        <View style={styles.innerContainer}>
          <Image source={require("../assets/store.png")} style={styles.logo} />
          <View style={styles.inputContainer}>
            <AntDesign
              name="user"
              size={window.width * 0.06}
              color="purple"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={(text) => setUsername(text)}
              placeholder="Username"
              placeholderTextColor="#A9A9A9"
              keyboardType="email-address"
              autoCapitalize="none"
              ref={usernameInputRef}
            />
          </View>
          <View style={styles.inputContainer}>
            <FontAwesome
              name="lock"
              size={window.width * 0.06}
              color="purple"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholder="Password"
              placeholderTextColor="#A9A9A9"
              secureTextEntry
            />
          </View>
          <View style={styles.checkboxContainer}>
            <Text>Keep me Logged In</Text>
            <Pressable>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </Pressable>
          </View>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: window.width * 0.04,
  },
  logo: {
    width: window.width * 0.3,
    height: window.width * 0.3,
    resizeMode: "contain",
    marginTop: window.height * 0.1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    height: window.height * 0.06,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#A9A9A9",
    borderRadius: 5,
    marginTop: window.height * 0.02,
    paddingHorizontal: window.width * 0.03,
  },
  icon: {
    marginRight: window.width * 0.02,
  },
  input: {
    flex: 1,
    color: "black",
  },
  loginButton: {
    backgroundColor: "purple",
    marginTop: window.height * 0.03,
    height: window.height * 0.06,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  loginButtonText: {
    textAlign: "center",
    color: "white",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    marginTop: window.height * 0.02,
  },
  forgotPassword: {
    color: "blue",
  },
  errorText: {
    color: "red",
    marginTop: window.height * 0.02,
  },
});

export default Login;
