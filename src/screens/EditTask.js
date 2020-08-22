import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import Button from "../components/common/Button";
import { firebase } from "../firebase/config";
import Input from "../components/common/Input";
import Card from "../components/common/Card";

export default function EditTask({ navigation, route }) {
  const item = route.params.item;
  const [taskName, setTaskName] = useState(item.name);
  const [loading, setLoading] = useState(false);

  const tasksRef = firebase.firestore().collection("tasks");

  const onUpdatePressed = () => {
    return tasksRef.doc(item.id).update({ name: taskName });
  };

  return (
    <View style={{ flex: 1, margin: 20 }}>
      <View style={{ marginBottom: 30 }}>
        <Input
          onChangeText={(text) => setTaskName(text)}
          placeholder="Write your task name"
          value={taskName}
        />
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Button
            customStyles={{
              backgroundColor: "orange",
            }}
            title="UPDATE TASK"
            onPress={onUpdatePressed}
          />
        )}
      </View>
    </View>
  );
}
