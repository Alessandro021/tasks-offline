import { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, FlatList, StatusBar, TouchableOpacity, Platform } from "react-native";
import moment from "moment/moment";
import "moment/locale/pt-br"
import {FontAwesome} from "@expo/vector-icons"

import Task from "../components/Task";

import todayImage from '../../assets/imgs/today.jpg'
import utils from "../utils";

export default function TaskList(){
    const today = moment().locale('pt-br').format('ddd, D [de] MMMM')

    const [ tasks, setTasks] = useState([
        { id: Math.random(), desc: "Comprar livro", estimateAt: new Date(), doneAt: new Date()},
        { id: Math.random(), desc: "Ler livro", estimateAt: new Date(), doneAt: null},
    ])

    const [showDoneTasks, setShowDoneTasks] = useState(true)
    const [visibleTasks, setVisibleTasks] = useState([])

    useEffect(() => {
        filterTasks()
    },[])

    function toggleFilter(){
        setShowDoneTasks(!showDoneTasks)
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
        filterTasks()
    }

    function filterTasks(){
        let newVisibleTask = null

        if(showDoneTasks){
            newVisibleTask = [...tasks]
        } else {
            newVisibleTask = tasks.filter(task => {
                return task.doneAt === null
            })
        }

        setVisibleTasks(newVisibleTask)
    }

    return(
        <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#6A0809"/>

            <ImageBackground style={styles.background} source={todayImage}>
                <View style={styles.iconBar}>
                    <TouchableOpacity onPress={toggleFilter}>
                        <FontAwesome name={showDoneTasks ? "eye" : "eye-slash"} size={25} color={utils.colors.secundario} />
                    </TouchableOpacity>
                </View>

                <View style={styles.titleBar}>
                    <Text style={styles.title}>Hoje</Text>
                    <Text style={styles.subTitle}>{today}</Text>
                </View>
            </ImageBackground>

            <View style={styles.taskList}>
            <FlatList 
                    data={visibleTasks}
                    keyExtractor={item => String(item.id)}
                    renderItem={({item}) => <Task {...item} toggleTask={toggleTask}/>}
                />
            </View>
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
   }
})