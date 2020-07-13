import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {Alert, FlatList, Button, StyleSheet, Text, View, TextInput } from 'react-native';


import { v4 as uuidv4 } from 'uuid';




function App (){

  const [tasks, setTasks] = useState([
    {
      title: 'aller faire les courses',
      id: 1
    },
    {
      title: "m'entrainer au ping pong",
      id: 2
    }
  ])

  const [task,setTask] = useState("")

  changeTask= (text) => {
      setTask(text);
  }

  addTask= () => {
    let currentTask = { 
      title: task,
      id: uuidv4()
    }
    setTasks([...tasks, currentTask])
    setTask('');
  }

  deleteTask = (id) => {
    let deltasks = tasks.filter(task => task.id !== id);
    setTasks(deltasks);
  }

  function seeAlert() {
    Alert.alert(
      "Titre de l'alerte",
      "Message de l'alerte",
      [
      { text: "Annuler", onPress: () => console.log("Appuyé sur annuler"),  style: "cancel"},
      { text: "OK", onPress: () => console.log("Appuyé sur annuler") }
    ],
      { cancelable: false }
      );
  }

  return (
    <View style={styles.container}>

      <View style={styles.form}>
        <TextInput style={styles.input} returnKeyLabel="add" returnKeyType='add' onSubmitEditing={addTask} value={task} onChangeText={text => changeTask(text)}
        placeholder="Entrer une nouvelle tache" />
      </View>

      <FlatList 
        data={tasks}
        renderItem={({item}) => 
        <View style={styles.taskList}>
          <Text style={styles.task}>{item.title}</Text>
          <Button title='X' onPress={() => {deleteTask(item.id)}}/>
        </View>}
        keyExtractor={item => item.id.toString()}
      />

      <Button title="Voir mon message" onPress={seeAlert} />
      
    </View>
  );
  
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007bfF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  input: {
    borderBottomWidth: 1,
    borderColor: '#777',
    padding: 10,
    borderRadius: 10,
    width: "100%",
    color: 'white'
  }, 

  form : {
    marginTop: 80,
    marginBottom: 50,

    display: 'flex',
    flexDirection: 'row'
  },

  button : {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Task + TaskList
  taskList: {
    backgroundColor: '#F1F1F1',
    borderBottomWidth: 1,
    borderColor: '#666',
    borderRadius: 8,
    display: 'flex',
    width: 350,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginTop: 8
  },

  task: {
    margin: 2,
    padding: 5,
  },
});
