import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const AddProduct = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [productType, setProductType] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);

  const ProductTypeList = ["Integrated", "Peripheral"];

  const SaveProduct = () => {
    const newProd = {
      name: name,
      type: productType,
      price: Number(price),
    };
    console.log(newProd);
    try {
      
      if (
        (newProd.price > 1000 && newProd.price < 2600) &&
        productType !== "Integrated"
      ) {
        throw new Error("Product Type")
      }

      const UpdateProduct = [...allProducts, newProd];
    console.log(allProducts)
    
    AsyncStorage.setItem("@allProducts", JSON.stringify(UpdateProduct));
    clearFields();
    } catch (error) {
      setErrorMessage(true);
      
    }
    
  };
  const clearFields = () => {
    setName("");
    setPrice("");
    setProductType("");
    setErrorMessage(false);
  };
  const getProduct = async () => {
    const list = await AsyncStorage.getItem("@allProducts");
    if (list) {
      setAllProducts(JSON.parse(list));
    }
  };

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Create New Product</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          label="Name"
          value={name}
          onChangeText={(val) => setName(val)}
          style={styles.textInput}
        />
        <TextInput
          label="Price"
          value={price}
          onChangeText={(val) => setPrice(val)}
          style={styles.textInput}
        />
        {errorMessage && (
          <Text style={styles.error}>
            Integrated product may be any where within the range of 1000 to 2600
            dollars
          </Text>
        )}
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <TextInput
            disabled
            label="ProductType"
            value={productType}
            style={styles.textInput}
            onPress={() => setModalVisible(true)}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 10,
        }}
      >
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "green" }]}
          onPress={SaveProduct}
        >
          <View style={styles.buttonText}>
            <Text style={{ color: "#fff", fontSize: 20 }}>Save</Text>
            <MaterialCommunityIcons
              name="arrow-collapse-down"
              size={24}
              color="#fff"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#fafafafa" }]}
          onPress={() => navigation.navigate("ProductList")}
        >
          <View style={styles.buttonText}>
            <Text style={{ color: "#000", fontSize: 20 }}>cancel</Text>
            <MaterialCommunityIcons name="cancel" size={24} color="black" />
          </View>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        style={styles.centeredView}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Product Type</Text>
            {ProductTypeList.map((item, ind) => (
              <TouchableOpacity
                key={ind}
                style={{ paddingVertical: 10 }}
                onPress={() => {
                  setProductType(item);
                  setModalVisible(false);
                }}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            ))}
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.openButton}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  title: {
    fontWeight: "bold",
    fontSize: 26,
    alignItems: "center",
  },
  titleText: { fontSize: 22, fontWeight: "bold" },
  inputContainer: { marginHorizontal: 10, marginTop: 10 },
  textInput: { borderWidth: 1, borderRadius: 5, marginVertical: 20 },
  button: {
    backgroundColor: "green",
    paddingHorizontal: 52,
    paddingVertical: 10,
    borderRadius: 8,
    // width: "100%",
    borderWidth: 1,
  },
  buttonText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    margin: 10,
  },
  modalView: {
    backgroundColor: "white",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    borderRadius: 5,
    margin: 5,
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  error: {
    color: "red",
    marginHorizontal: 15,
  },
  modalText: {
    marginBottom: 15,
    fontSize: 22,
  },
  modalFooter: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    flexDirection: "row",
  },
});
