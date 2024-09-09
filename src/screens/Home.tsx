import { useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, FlatList, Image } from "react-native";
import { Product } from "../components/Product";

type ProductType = {
    name: string;
    quantity: number
}

export function Home(){
    

    const [products, setProducts] = useState<ProductType[]>([]);
    const [productName, setProductsName] = useState<string>('');
    const [productQuantity, setProductQuantity] = useState(0);
    const [finalizados, setfinalizados] = useState<string[]>([]);

    function handleProductAdd(){
        if (products.some(product => productName !== productName)){
            Alert.alert("Produto ja Adicionado", "O produto ja foi adicionado a lista")
        }
        setProducts(prevState => [...prevState, {name: productName, quantity: productQuantity}]);
        setProductsName('')
        setProductQuantity(0);
    }

    function handleProductRemove(name: string){
        Alert.alert("Remover", `Deseja remover ${name} da lista?`, [
            {
                text: "Sim",
                onPress: () => {
                    setProducts(prevState => {
                        const newProducts = prevState.filter(product => product.name !== name);

                        if (finalizados.includes(name)){
                            setfinalizados(prevFinalizados => 
                                prevFinalizados.filter(product => product !== name)
                            )
                        }
                        return newProducts
                    })
                }
            },
            {
                text: "Não",
                style: "cancel"
            }
        ])
    }

    function handleProductFinalize(name: string){
        setfinalizados(prevState =>
            prevState.includes(name)
                ? prevState.filter(productName => productName !== name)
                : [...prevState, name]
        );
    }  

    return(
        <View style={styles.container}>

            <View style={styles.header}>

                <Text style={styles.headerText}>Lista de Compras</Text>

            </View>

            <View style={styles.form}>

                <TextInput 

                    style={styles.input}	
                    placeholder="Adicione um produto"
                    placeholderTextColor="#808080"
                    value={productName}
                    onChangeText={setProductsName}
                
                />

                <TextInput 

                    style={styles.inputq}	
                    placeholder="quantidade"
                    placeholderTextColor="#808080"
                    value={productQuantity.toString()}
                    onChangeText={text => setProductQuantity(Number(text))}
                
                />

                <TouchableOpacity style={styles.buttom} onPress={handleProductAdd}>

                    <Text>
                        +
                    </Text>

                </TouchableOpacity>

            </View>

            <View style={styles.couneterContainer}>

                <View style={styles.Produtos}>
                    <Text style={styles.TextProdutosCounter}>Produtos</Text>
                    <Text style={styles.produtosCounter}> {products.length} </Text>
                </View>

                <View style={styles.finalizados}>
                    <Text style={styles.TextFinalizadosCounter}>Finalizados</Text>
                    <Text style={styles.finalizadosCounter}> {finalizados.length} </Text>

                </View>

            </View>

            <View>

                <FlatList 
                
                    data={products}
                    keyExtractor={(item) => item.name}
                    renderItem={({item}) => (

                        <Product 

                            name={item.name}
                            quantity={item.quantity}
                            onRemove={() => handleProductRemove(item.name)}
                            onFinalize={() => handleProductFinalize(item.name)}
                            isFinalized={finalizados.includes(item.name)}
                        
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={productName.length > 0 ? styles.listContainer : {} }
                    ListEmptyComponent={() => (

                        <View style={styles.emptyContainer}>

                            <Image 
                            
                                source={require("../../assets/iconelistavazia.png")}
                                style={styles.imageListaVazia}
                            
                            />

                            <Text style={styles.primeiraParteTextoListaVazia}>

                                Voce ainda nao tem produtos de compra

                            </Text>
                            
                            <Text style={styles.segundaParteTextoListaVazia}>

                                Adicione produtos e organize sua lista de compras

                            </Text>

                        </View>
                    )}
                />

            </View>

        </View>
    )
}

export const styles = StyleSheet.create({
    container: {

    },
    header: {
        width: "100%",
        height: 173,
        backgroundColor: "#7A4A9E",
        justifyContent: "center",
        alignItems: "center",
    },
    headerText: {
        textAlign: "center",
        color: "#F2F2F2",
        fontSize: 18,
        fontWeight: "700",
    },
    form: {
        flexDirection: "row",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bottom: 30,
    },
    input: {
        flexGrow: 1,
        alignItems: "center",
        padding: 16,
        borderRadius: 6,
        backgroundColor: "#F2F2F2",
        borderWidth: 0.5,
        borderColor: "#808080",
        width: 289,
        height: 54,
        marginLeft: 24,
    },
    buttom: {
        padding: 18,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 6,
        backgroundColor: "#31C667",
        width: 52,
        height: 52,
        marginLeft: 4,
        marginRight: 24,
    },
    couneterContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        alignSelf: "stretch",
        flexDirection: "row",
    },
    Produtos: {
        alignItems: "center",
        flexDirection: "row",
    },
    TextProdutosCounter: {
        color: "#31C667",
        fontSize: 14,
        fontWeight: "700",
        marginLeft: 24,
    },
    produtosCounter: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 999,
        backgroundColor: "#D9D9D9",
        marginLeft: 8,
    },
    finalizados: {
        alignItems: "center",
        flexDirection: "row",
    },
    TextFinalizadosCounter: {
        color: "#7A4A9E",
        fontSize: 14,
        fontWeight: "700",
        marginRight: 8,
    },
    finalizadosCounter: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 999,
        backgroundColor: "#D9D9D9",
        marginRight: 24,
    },
    listContainer: {

    },
    emptyContainer: {
        display: "flex",
        paddingHorizontal: 20,
        paddingVertical: 48,
        justifyContent: "center",
        alignItems: "center",
        borderTopWidth: 1,
        borderColor: "#D9D9D9",
        marginTop: 20,
        marginLeft: 24,
        marginRight: 24,
    },
    imageListaVazia:{

    },
    primeiraParteTextoListaVazia: {
        marginTop: 16,
        color: "#808080",
        fontSize: 14,
        fontWeight: "700",
    },
    segundaParteTextoListaVazia: {
        color: "#808080",
        fontSize: 14,
        fontWeight: "400",
    },
    inputq: {
        borderRadius: 6,
        backgroundColor: "#F2F2F2",
        borderWidth: 0.5,
        borderColor: "#808080",
        width: 52,
        height: 52,
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        marginLeft: 4,
    }
})