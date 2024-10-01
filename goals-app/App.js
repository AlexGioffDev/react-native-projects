import { useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import { StatusBar } from "expo-status-bar";

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [goals, setGoals] = useState([]);
  const [visible, setVisible] = useState(false);

  function addGoalHandler(text) {
    setGoals((currentGoal) => [
      ...currentGoal,
      {
        text: text,
        id: Math.random().toString(),
      },
    ]);
  }

  function deleteGoalHandler(id) {
    setGoals((currentGoals) => {
      return currentGoals.filter((goal) => goal.id !== id);
    });
  }

  function showModal() {
    setVisible(true);
  }

  function closeModal() {
    setVisible(false);
  }

  return (
    <View style={styles.appContainer}>
      <StatusBar style="light" />
      <Button title="Add new Goal" color="#a065ec" onPress={showModal} />
      <GoalInput
        onAddGoal={addGoalHandler}
        visible={visible}
        onCancel={closeModal}
      />
      <View style={styles.goalsContainer}>
        <FlatList
          data={goals}
          alwaysBounceVertical={false}
          renderItem={(item) => {
            return <GoalItem goal={item.item} onDelete={deleteGoalHandler} />;
          }}
          keyExtractor={(item) => {
            return item.id;
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 50,
    paddingHorizontal: 16,
    flex: 1,
  },
  goalsContainer: {
    flex: 7,
  },
});
