import { useState } from "react";
import { Modal, View, StyleSheet, TouchableWithoutFeedback, TextInput, TouchableOpacity, Text, Platform, Alert} from "react-native";
import utils from "../utils";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";


export default function AddTask({ onCancel, isVisible, onSave }) {
    const [desc, setDesc] = useState("")
    const [date, setDate] = useState()
    const [showDatePicker, setShowDatePicker] = useState(false)

    const dateString = moment(date).format("D [de] MMM [de] YYYY")

    function save(){
        if(desc === "" || date === "" || date === null || date === undefined){
            Alert.alert("Dados invalidos!","Os capos nao podem ser vazios")
            return
        }
        onSave(desc, date)
        setDesc("")
        setDate("")
        onCancel()
    }

    return (
        <Modal transparent={true} visible={isVisible} onRequestClose={onCancel} animationType="slide">
            <TouchableWithoutFeedback onPress={onCancel}><View style={styles.background} /></TouchableWithoutFeedback>
            <View style={styles.container}>
                <Text style={styles.header}>Nova Tarefa</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input}
                        placeholder="Informe a descriçao da tarefa..."
                        value={desc}
                        onChangeText={text => setDesc(text)}
                    />

                    {Platform.OS === "ios" ? (
                    <DateTimePicker
                    value={new Date()}
                    mode="date"
                    onChange={(evento, date) => {
                        if (evento?.type === 'dismissed') { 
                            setDate(null)
                            return;
                        }
                        setDate(date)
                    }}
                    
                    />
                    ) : (
                    <View style={styles.viewButtonDate}>
                        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.buttondate}>
                            {date === "" || date === null || date === undefined ? <Text style={styles.date}>Selecione uma Data</Text> :<Text style={styles.date}>{`Data ${dateString},  selecionada`} </Text>   }
                        </TouchableOpacity>
                    </View>
                )}
                </View>
                

                {showDatePicker && 
                <DateTimePicker
                    value={new Date()}
                    mode="date"
                    onChange={(evento, date) => {
                        if (evento?.type === 'dismissed') {
                            setShowDatePicker(false)
                            setDate(null)
                            return;
                        }
                        setDate(date)
                        setShowDatePicker(false)
                    }}

                />}
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={onCancel} ><Text style={styles.button}>Cancelar</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => save()}><Text style={styles.button}>Salvar</Text></TouchableOpacity>
                </View>
            </View>
            <TouchableWithoutFeedback onPress={onCancel}><View style={styles.background} /></TouchableWithoutFeedback>
        </Modal>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "rgba(0,0,0, 0.7)",
    },

    container: {
        // flex: 1,
        backgroundColor: "#FFF",
    },
    header: {
        fontFamily: utils.fontFamily,
        backgroundColor: utils.colors.today,
        color: utils.colors.secundario,
        textAlign: "center",
        padding: 15,
        fontSize: 18,
        fontWeight: "700",
    },
    inputContainer: {
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        fontFamily: utils.fontFamily,
        height: 40,
        width: "90%",
        marginTop: 10,
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#E3E3E3",
        borderRadius: 8,
        paddingHorizontal: 10,
    },

    buttons: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },

    button: {
        margin: 20,
        marginRight: 30,
        color: utils.colors.today,
    },
    viewButtonDate:{
        height: 40,
        width: "90%",
        marginTop: 10,
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#E3E3E3",
        borderRadius: 8,
        justifyContent: "center",
        paddingHorizontal: 10,
    },

    date: {
        fontFamily: utils.fontFamily,
        fontSize: 18,
    }
})