import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Alert,
  ActivityIndicator,
} from "react-native";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { firebase } from "../firebase/config";

export default function Signup({ navigation }) {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSignup = () => {
    if (!email || !password || !name || !confirmPassword) {
      return Alert.alert(
        "Error",
        "You need to fill up all the input fields",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }

    if (password !== confirmPassword) {
      return Alert.alert(
        "Error",
        "Confirm password is not same as password",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }

    setLoading(true);

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        setLoading(false);
        // first step - to get user id
        const uid = response.user.uid;

        // second step - to create the user profiled data
        const userProfileData = {
          id: uid,
          email: email,
          name: name,
        };

        // third step - to create users table
        const usersRef = firebase.firestore().collection("users");

        //4th step - user profile data save
        usersRef
          .doc(uid)
          .set(userProfileData)
          .then(() => {});
      })
      .catch((error) => {
        console.log("error ", error);
        setLoading(false);
        alert(error);
      });
  };

  return (
    <SafeAreaView>
      <View style={{ margin: 20, marginTop: 50 }}>
        <Input
          placeholder="Full Name"
          onChangeText={(text) => setName(text)}
          autoCorrect={false}
        />

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

        <Input
          placeholder="Confirm Password"
          onChangeText={(text) => setConfirmPassword(text)}
          autoCorrect={false}
          secureTextEntry={true}
        />

        {loading ? (
          <ActivityIndicator />
        ) : (
          <Button
            onPress={onSignup}
            title="SIGNUP"
            customStyles={{ marginTop: 40 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

// const validationSchema = yup.object().shape({
//   email: yup.string().label("Email").email().required(),
//   password: yup
//     .string()
//     .label("Password")
//     .required()
//     .min(2, "Seems a bit short")
//     .max(10, "Try shorter password"),
//   agreeToTerms: yup
//     .boolean()
//     .label("Terms")
//     .test(
//       "is-true",
//       "Must agree to terms to continue",
//       (value) => value === true
//     ),
//   confirmPassword: yup
//     .string()
//     .required()
//     .label("Confirm Password")
//     .test("password-match", "Password must match ya fool", function (value) {
//       return this.parent.password === value;
//     }),
// });
