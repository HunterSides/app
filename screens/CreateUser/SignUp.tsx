import { StatusBar } from "expo-status-bar";
import {
  Platform,
  StyleSheet,
  Pressable,
  TextInput,
  SafeAreaView,
} from "react-native";
import { LOCAL_SERVER_PATH } from "../../utils";
import { Text, View } from "../../components/Themed/Themed";
import { useStoreActions, useStoreState } from "../../hooks/storeHooks";
import React, { useEffect } from "react";
import {
  accountFromSeed,
  generateMnemonic,
  mnemonicToSeed,
  signMessage,
} from "../../utils";
import Background4 from "../../components/Background4/Background4";
import {
  useFonts,
  Comfortaa_300Light,
  Comfortaa_400Regular,
  Comfortaa_500Medium,
  Comfortaa_600SemiBold,
  Comfortaa_700Bold,
} from "@expo-google-fonts/comfortaa";
import { Roboto_900Black } from "@expo-google-fonts/roboto";
import { GFSDidot_400Regular } from "@expo-google-fonts/gfs-didot";
import { Navigation } from "../../types";

type Props = {
  navigation: Navigation;
};

export default function SignUpScreen({ navigation }: Props) {
  const [username, onChangeUsername] = React.useState("");
  const [mnemonic, onChangeMnemonic] = React.useState("");
  const [name, onChangeName] = React.useState("");
  const [address, onChangeAddress] = React.useState("");
  let [fontsLoaded] = useFonts({
    Comfortaa_300Light,
    Comfortaa_400Regular,
    Comfortaa_500Medium,
    Comfortaa_600SemiBold,
    Comfortaa_700Bold,
    Roboto_900Black,
    GFSDidot_400Regular,
  });

  const addWallet = useStoreActions((actions) => actions.addWallet);
  const addUser = useStoreActions((actions) => actions.addUser);
  const addAccount = useStoreActions((actions) => actions.addAccount);
  //const balanceState = useStoreState((state) => state.accounts[0].balance)

  const performRegister = async function () {
    const seed = await mnemonicToSeed(mnemonic);
    const account = await accountFromSeed(seed);
    const balance = 10000;
    const { signature } = await signMessage("jmesworld", account.privateKey);

    await addUser({
      username,
      signature: signature,
    });
    await addWallet({
      mnemonic: mnemonic,
      privateKey: account.privateKey,
      seed: seed,
    });

    const derivedAddress = account.address;
    //const path = `http://localhost:3000/users`;
    const path = `${LOCAL_SERVER_PATH}/users`;
    const rawResponse = await fetch(path, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: derivedAddress,
        name,
        username,
        balance,
        mnemonic,
      }),
    });

    await onChangeAddress(derivedAddress);
    await addAccount({ index: 0, title: "default", address: derivedAddress });

    const contentResponse = await rawResponse.json();
    console.log(contentResponse);

    setTimeout(() => {
      navigation.navigate("Root");
    }, 5000);
  };
  useEffect(() => {
    async function generate() {
      const mnemonic = await generateMnemonic();
      onChangeMnemonic(mnemonic);
    }
    generate();
  }, []);
  return (
    <View style={styles.container}>
      <Background4>
        <Text style={styles.title}>JMES</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <Text style={styles.secondTitle}>SIGN UP TO JMES</Text>
        <SafeAreaView style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeName}
            value={name}
            placeholder="Full Name"
          />
        </SafeAreaView>
        <SafeAreaView style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeUsername}
            value={username}
            placeholder="Username"
          />
        </SafeAreaView>
        <View style={styles.buttonContainer}>
          <Pressable onPress={() => performRegister()} style={styles.button}>
            <Text style={styles.buttonText}>SIGN UP</Text>
          </Pressable>
        </View>
        <View style={styles.policyContainer}>
          <Text style={styles.policyText}>
            By signing up you agree to our Terms, Privacy Policy and Cookies
            Policy
          </Text>
        </View>
        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      </Background4>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  buttonContainer: {
    width: "72%",
    height: 52,
    marginBottom: 13,
    borderRadius: 6,
  },
  inputContainer: {
    width: "72%",
    marginBottom: 33,
  },
  policyContainer: {
    backgroundColor: "transparent",
    width: "72%",
    height: 56,
  },
  policyText: {
    fontSize: 15,
    color: "#ABABAB",
  },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
    textTransform: "uppercase",
    fontFamily: "Roboto_900Black",
    color: "#000",
  },
  iconImageView: {
    flexDirection: "row",
  },

  button: {
    paddingTop: 17,
    paddingBottom: 17,
    color: "#000",
    backgroundColor: "#fff",
    borderRadius: 6,
    paddingLeft: 52,
    paddingRight: 53,
    textTransform: "uppercase",
    fontFamily: "Roboto_900Black",
  },
  input: {
    backgroundColor: "#5B5B5B",
    height: 34,
    borderRadius: 6,
    paddingLeft: 18,
  },
  title: {
    fontSize: 42,
    fontFamily: "GFSDidot_400Regular",
    color: "#FFF",
  },

  secondTitle: {
    fontSize: 20,
    fontFamily: "Comfortaa_300Light",
    textTransform: "uppercase",
    paddingBottom: 26,
    color: "#FFF",
  },

  separator: {
    marginTop: 9,
    marginBottom: 18,
    height: 1,
    width: "80%",
  },
});
