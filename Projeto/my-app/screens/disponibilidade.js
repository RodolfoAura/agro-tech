import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-web';

export default function Disponibilidade({ route }) {
    const [disponibilidade, setDisponivel] = useState([]);

    useEffect(() => {
        listarVeiculos();
    }, [])

    const listarVeiculos = () => {
        fetch("http://localhost:3000/readVeiculo")
            .then(response => { return response.json(); })
            .then(data => {
                setDisponivel(data);
            })
    }

    return (
        <View style={styles.v} >
            <ScrollView>
                <Text style={styles.text} >Veiculos</Text>
                {
                    disponibilidade.map((veiculos, index) => {
                        return (
                            <View style={styles.veic} key={index}>
                                <View style={styles.veicL} >
                                    <Text style={styles.info}>Id do Veiculo : {veiculos.id}</Text>
                                    <Text style={styles.info}>Placa do Veiculo : {veiculos.placa}</Text>
                                    <Text style={styles.info}>Modelo : {veiculos.modelo}</Text>
                                    <Text style={styles.info}>Marca : {veiculos.marca}</Text>
                                  
                                    <View style={styles.viBTN}>
                                    </View>
                                </View>
                            </View>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    viBTN: {
        display: "flex",
        flexDirection: "row",
        gap: "30px"
    },
    v: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#f08c0a",
        width: "100%",
        flex: 1,
        padding: 20
    },
    sv: {
        height: "100%",
        backgroundColor: "#46589c",
        width: "100%",
    },
    btn: {
        marginTop: 5,
        height: 40,
        width: 100,
        backgroundColor: "#2f8f5b",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderColor: "Black",
        borderWidth: "1px",
        borderRadius: "10px"
    },
    te: {
        fontSize: "10pt"
    },
    veic: {
        width: "100%",
        height: "250px",
        backgroundColor: "#85807a",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        padding: "20px",
        alignItems: "center",
        borderRadius: "10px",
        marginBottom: "30px"
    },
    veicL: {
        maxWidth: "78%"
    },
    info: {
        fontSize: "13pt",
        fontWeight: "bold",
        color: "#fff"
    },
    infoP: {
        fontSize: "11pt",
        fontWeight: "normal",
        color: "#000"
    },
    text: {
        fontSize: "30pt",
        color: "white"
    },
    textBt: {
        color: "#fff"
    }

});