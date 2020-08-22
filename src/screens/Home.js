import React, { useState, useEffect } from "react";
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

export default function Home({ navigation, extraData }) {
  const [taskName, setTaskName] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const tasksRef = firebase.firestore().collection("tasks");
  const userID = extraData.uid;

  useEffect(() => {
    tasksRef
      .orderBy("createdAt", "desc")
      .where("authorId", "==", userID)
      .onSnapshot((querySnapshot) => {
        const newTasks = [];
        querySnapshot.forEach((doc) => {
          const task = doc.data();
          task.id = doc.id;
          newTasks.push(task);
        });

        setTasks(newTasks);
      });
  }, []);

  const onAddTaskPress = () => {
    if (taskName && taskName.length > 0) {
      setLoading(true);
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        name: taskName,
        authorId: userID,
        createdAt: timestamp,
      };

      return tasksRef
        .add(data)
        .then((_doc) => {
          setTaskName("");
          setLoading(false);
        })
        .catch((error) => {
          alert(error);
          setLoading(false);
        });
    }

    return alert("Task name is empty");
  };

  const onDeletePressed = (item) => {
    return tasksRef.doc(item.id).delete();
  };

  const renderTaskItem = ({ item, index }) => {
    return (
      <Card customStyle={{ marginBottom: 15, padding: 20 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, fontWeight: "300" }}>{item.name}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("EditTask", { item: item });
            }}
          >
            <Image
              style={{ height: 18, width: 18 }}
              resizeMode="contain"
              source={require("../../assets/pencil.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDeletePressed(item)}>
            <Image
              style={{ height: 18, width: 18, marginLeft: 15 }}
              resizeMode="contain"
              source={require("../../assets/bin.png")}
            />
          </TouchableOpacity>
        </View>
      </Card>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={tasks}
        renderItem={renderTaskItem}
        keyExtractor={(item, index) => item.id}
        contentContainerStyle={{
          padding: 20,
          paddingTop: 30,
        }}
        ListHeaderComponent={
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
                title="ADD TASK"
                onPress={onAddTaskPress}
              />
            )}
          </View>
        }
        ListFooterComponent={
          <View>
            <Button
              customStyles={{
                margin: 20,
              }}
              title="LOGOUT"
              onPress={() => {
                firebase.auth().signOut();
              }}
            />
          </View>
        }
      />
    </SafeAreaView>
  );
}
