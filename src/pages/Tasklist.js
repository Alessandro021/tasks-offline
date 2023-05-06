import { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, FlatList, StatusBar, TouchableOpacity, Platform} from "react-native";
import moment from "moment/moment";
import "moment/locale/pt-br"
import {FontAwesome} from "@expo/vector-icons"
import AsyncStorage from "@react-native-async-storage/async-storage";

import Task from "../components/Task";

import todayImage from '../../assets/imgs/today.jpg'
import utils from "../utils";
import AddTask from "./AddTask";

export default function TaskList(){
    const today = moment().locale('pt-br').format('ddd, D [de] MMMM')

    const [tasks, setTasks] = useState([])
    const [visibleTasks, setVisibleTasks] = useState([])

    const [showDoneTasks, setShowDoneTasks] = useState(true)
    const [showAddTask, setShowAddTask] = useState(false)

    useEffect( () => {

        async function carrega(){
        const stateString = await AsyncStorage.getItem("@TASKS")
        const taskState = JSON.parse(stateString) || []
        setTasks(taskState)
        filterTasks()
        }
        carrega()
    },[])

    function saveStorage(tasks){
        AsyncStorage.setItem("@TASKS", JSON.stringify(tasks))
    }

    function toggleFilter(){
        setShowDoneTasks(showDoneTasks ? false : true)
        filterTasks()
    }
    
    function toggleTask(taskId){
        const newTasks = [...tasks]
        newTasks.forEach(task => {
            if(task.id === taskId){
                task.doneAt = task.doneAt ? null : new Date()
            }
        });
        
        setTasks(newTasks)
        saveStorage(newTasks)
    }

    function filterTasks(){
        let newVisibleTask = tasks.filter(task => {
            return task.doneAt !== null
        })
        setVisibleTasks(newVisibleTask)
    }

    async function addTask(desc, date){
        const newTask = [...tasks, {id: Math.random(), desc: desc, estimateAt: date, doneAt: null}]
        setTasks(newTask)
        AsyncStorage.setItem("@TASKS", JSON.stringify(newTask)) 
    }

    function deleteTask(id){
        const newTasks = tasks.filter(task => {
            return task.id !== id
        })
        setTasks(newTasks)
        saveStorage(newTasks)

    }

    return(
        <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#6A0809"/>

          <AddTask isVisible={showAddTask} onCancel={() => setShowAddTask(false)} onSave={addTask} showDoneTasks/>

            <ImageBackground style={styles.background} source={todayImage}>
                <View style={styles.iconBar}>
                    <TouchableOpacity onPress={toggleFilter}>
                        <FontAwesome name={!showDoneTasks ? "eye" : "eye-slash"} size={25} color={utils.colors.secundario} />
                    </TouchableOpacity>
                </View>

                <View style={styles.titleBar}>
                    <Text style={styles.title}>Hoje</Text>
                    <Text style={styles.subTitle}>{today}</Text>
                </View>
            </ImageBackground>

            <View style={styles.taskList}>
            <FlatList 
                    data={showDoneTasks ? tasks : visibleTasks}
                    keyExtractor={item => String(item.id)}
                    renderItem={({item}) => <Task onDelete={deleteTask} {...item} toggleTask={toggleTask} />}
                />
            </View>
            <TouchableOpacity style={styles.addButton} activeOpacity={0.7} onPress={() => setShowAddTask(!showAddTask)}>
                <FontAwesome name="plus" size={22} color={utils.colors.secundario} />
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    background: {
        flex: 3,
    },

    taskList: {
        flex: 7
    },

    titleBar: {
        flex: 1,
        justifyContent: "flex-end"
    },

    title: {
        fontFamily: utils.fontFamily,
        color: utils.colors.secundario,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 20,
    },

    subTitle: {
        fontFamily: utils.fontFamily,
        color: utils.colors.secundario,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30,
    },
     iconBar: {
        flexDirection: "row", 
        marginHorizontal: 20,
        justifyContent: "flex-end",
        marginTop: Platform.OS === "ios" ? 40 : 10,
   },
   addButton:{
    position: "absolute",
    right: 30,
    bottom: 50,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: utils.colors.today,
    alignItems: "center",
    justifyContent: "center",
   }
})