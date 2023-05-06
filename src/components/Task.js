
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import {FontAwesome} from "@expo/vector-icons"
import {Swipeable, GestureHandlerRootView} from "react-native-gesture-handler";

import utils from "../utils";

import moment from "moment";
import "moment/locale/pt-br"


export default function Task({ desc, estimateAt, doneAt, toggleTask, id, onDelete}){
    const date = doneAt ? moment(estimateAt).locale('pt-br') : estimateAt
    const formattedDate = moment(date).locale('pt-br').format('ddd, D [de] MMMM')

    function getCheckView(doneAt){
        if(doneAt != null){
            return(
                <View style={styles.done}><FontAwesome name="check" size={20} color="#FFF"/></View>
            )
        }else{
            return(
                <View style={styles.pending}></View>
            )
        }
    }

    function getRightContent(){
        return(
            <TouchableOpacity style={styles.right} onPress={() => onDelete(id)}>
                <FontAwesome name="trash" size={30} color="#FFF"/>
            </TouchableOpacity>
        )
    }

    function getLeftContent(){
        return(
            <TouchableOpacity style={styles.left}>
                <FontAwesome style={styles.excluirIcon} name="trash" size={20} color="#FFF"/>
                <Text style={styles.excluirText}>Excluir</Text>
            </TouchableOpacity>
        )
    }

    
    return (
            <GestureHandlerRootView>
                <Swipeable renderRightActions={getRightContent} renderLeftActions={getLeftContent} onSwipeableLeftOpen={() => onDelete(id)}>
                    <View style={styles.container}>
                        <TouchableWithoutFeedback onPress={() => toggleTask(id)}>
                            <View style={styles.checkConatiner}>
                                {getCheckView(doneAt)}
                            </View>
                        </TouchableWithoutFeedback>

                        <View>
                            <Text style={[styles.desc, doneAt != null ? { textDecorationLine: "line-through" } : {}]}>{desc}</Text>
                            <Text style={styles.date}>{formattedDate}</Text>
                        </View>
                    </View>
                </Swipeable>
            </GestureHandlerRootView>
        )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: "#AAA",
        alignItems: "center",
        paddingVertical: 10,
        backgroundColor: "#FFF"
    },

    checkConatiner: {
        width: "20%",
        alignItems: "center",
        justifyContent: "center"
    },

    pending:{
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: "#555",
    },

    done:{
        height: 25,
        width: 25,
        borderRadius: 13,
        backgroundColor: "#4D7031",
        alignItems: "center",
        justifyContent: "center"
    }, 
    
    desc: {
        fontFamily: utils.fontFamily,
        color: utils.colors.mainText,
        fontSize: 15,
    }, 
    date: {
        fontFamily: utils.fontFamily,
        color: utils.colors.subText,
        fontSize: 12,
    },
    right:{
        backgroundColor: "red",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingHorizontal: 20,
    },
    left: {
        flex: 1,
        backgroundColor: "red",
        flexDirection: "row",
        alignItems: "center",
    }, 
    excluirText: {
        fontFamily: utils.fontFamily,
        color: "#FFF",
        fontSize: 20,
        margin: 10,
    },
    excluirIcon: {
        marginLeft: 10,
    }
})