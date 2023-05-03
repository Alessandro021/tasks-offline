import { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, FlatList } from "react-native";
import moment from "moment/moment";
import "moment/locale/pt-br"

import Task from "../components/Task";

import todayImage from '../../assets/imgs/today.jpg'
import utils from "../utils";

export default function TaskList(){
    const today = moment().locale('pt-br').format('ddd, D [de] MMMM')

    const [ tasks, setTasks] = useState([
        { id: Math.random(), desc: "Comprar livro", estimateAt: new Date(), doneAt: new Date()},
        { id: Math.random(), desc: "Ler livro", estimateAt: new Date(), doneAt: null},
    ])

    function toggletask(taskId){
        const newTasks = [...tasks]
        newTasks.forEach(task => {
            if(task.id === taskId){
                task.doneAt = task.doneAt ? null : new Date()
            }
        });

        setTasks(newTasks)
    }

    return(
        <View style={styles.container}>
            <ImageBackground style={styles.background} source={todayImage}>
                <View style={styles.titleBar}>
                    <Text style={styles.title}>Hoje</Text>
                    <Text style={styles.subTitle}>{today}</Text>
                </View>
            </ImageBackground>

            <View style={styles.taskList}>
            <FlatList 
                    data={tasks}
                    keyExtractor={item => String(item.id)}
                    renderItem={({item}) => <Task {...item} toggletask={toggletask}/>}
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
    }
})