import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";

type ProductProps = {
    name: string;
    quantity: number;
    onRemove: () => void;
    onFinalize: () => void;
    isFinalized: boolean;
    style?: object;
};

export function Product({name, onFinalize, onRemove, isFinalized, style, quantity}: ProductProps) {
    return (
        <View style={styles.Container}>
            <View style={styles.Buttom}>
                <TouchableOpacity style={styles.finalizeButtom} onPress={onFinalize}>

                    <Image 
                    
                        source={isFinalized
                            ? require("../../../assets/finalizado.png")
                            : require("../../../assets/naoFinalizado.png")
                        }
                    />

                </TouchableOpacity>
            </View>
            
            <View style={styles.nameCon}>
                <Text style={[styles.name, isFinalized && styles.nomeFinalizado]}> {name} </Text>
                <Text style={[styles.quantity, isFinalized && styles.nomeFinalizado]}> {quantity} </Text>
            </View>

            <View style={styles.remove}>
                <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
                    <Image 
                        source={require("../../../assets/trash.png")}
                    />
                </TouchableOpacity>
            </View>

        </View>
    )
}

export const styles = StyleSheet.create({
    Container: {
        marginTop: 8,
        display: "flex",
        flexDirection: "row",
        paddingLeft: 12,
        paddingBottom: 12,
        paddingTop: 12,
        paddingRight: 8,
        alignItems: "center",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#808080",
        backgroundColor: "#F2F2F2",
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.06, 
        shadowRadius: 8, 
        elevation: 4, 
    },
    Buttom: {
        width: 24,
        height: 24,
        padding: 3,
        justifyContent: "center",
        alignItems: "center",
    },
    finalizeButtom: {
        width: 24,
        height: 24,
        padding: 3,
        justifyContent: "center",
        alignItems: "center",
    },
    name: {
        color: "#262626",
        fontSize: 14,
        fontWeight: "400",
  
    },
    nomeFinalizado: {
        color: "#808080",
        fontSize: 14,
        textDecorationLine: "line-through",
    },
    nameCon: {
        flexGrow: 1,
        flexDirection: "row",

    },
    remove: {

    },
    removeButton: {
        width: 32,
        height: 32,
        paddingTop: 9,
        paddingRight: 9.522, 
        paddingBottom: 9,
        paddingLeft: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
    },
    quantity: {
        marginLeft: 10,
        borderRadius: 6,
        backgroundColor: "#7A4A9E",
        borderWidth: 0.5,
        borderColor: "#808080",
        width: 20,
        height: 20,
        alignItems: "center",
        justifyContent: "center",
        color: "white",
    },
})
