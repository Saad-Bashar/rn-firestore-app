import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { TouchableOpacity } from "react-native-gesture-handler";
import { firebase } from "../firebase/config";

const styles = StyleSheet.create({});

export default function Login({ navigation }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const onSignIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log("res ", res);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image
        style={{ height: 50, width: 50, alignSelf: "center", marginTop: 80 }}
        source={require("../../assets/favicon.png")}
        resizeMode="contain"
      />

      <View style={{ margin: 20, marginTop: 50 }}>
        <Input
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          autoCorrect={false}
        />

        <Input
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          autoCorrect={false}
          secureTextEntry={true}
        />

        <Button
          onPress={onSignIn}
          title="LOGIN"
          customStyles={{ marginTop: 40 }}
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Signup");
        }}
        style={{ marginTop: 40, alignSelf: "center" }}
      >
        <Text>
          Already have an account?{" "}
          <Text style={{ color: "blue", fontWeight: "bold" }}>Sign up.</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
