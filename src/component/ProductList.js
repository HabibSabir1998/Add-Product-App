import React, { useState, useEffect,useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { FAB, List } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation,useFocusEffect } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Swipeout from "react-native-swipeout";
const ProductList = () => {
  const navigation = useNavigation();

  const [allProducts, setAllProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeList, setActiveList] = useState();

  let swipeBtns = [
    {
      text: "Delete",
      backgroundColor: "red",
      margin: 10,
      underlayColor: "rgba(0, 0, 0, 1, 0.6)",
      onPress: () => {
        setModalVisible(true);
      },
    },
  ];

  const getProduct = async () => {
    const list = await AsyncStorage.getItem("@allProducts");
    if (list) {
      setAllProducts(JSON.parse(list));
    }
  };
  getProduct();

  const deleteProduct = () => {
    console.log(activeList);
    const check = allProducts.splice(activeList, 1);
    console.log(check);
    AsyncStorage.setItem("@allProducts", JSON.stringify(allProducts));
    setModalVisible(!modalVisible);
  };

  useFocusEffect(
    useCallback(() => {
      getProduct();
    }, []),
  );


  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>Item</Text>
      </View>

      <View style={styles.listHead}>
        <Text>Name</Text>
        <Text>Type</Text>
        <Text>Price</Text>
      </View>

      {allProducts.length > 0 ? (
        allProducts.map((val, index) => (
          <Swipeout
            right={swipeBtns}
            autoClose={true}
            backgroundColor="transparent"
            sectionId={index}
            rowID={index}
            key={index}
            onOpen={(rowID, sectionId, direction) => setActiveList(sectionId)}
          >
            <TouchableHighlight key={`touch${index}`}>
              <View style={styles.listItem} >

              <Text>{val.name}</Text>
              <Text>{val.type}</Text>
              <Text>$ {val.price}.00</Text>
              </View>
            </TouchableHighlight>
          </Swipeout>
        ))
      ) : (
        <View style={styles.emptyList}>
          <Text style={styles.emptyListText}>
            You do not have any product Press the green button below to add a
            new one
          </Text>
        </View>
      )}

      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() => navigation.navigate("NewProduct")}
      />

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
            <Text style={styles.modalHeading}>Delete</Text>
            <Text style={styles.modalText}>
              Are You Sure to Delete this product
            </Text>
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.openButton}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.openButton}
                onPress={deleteProduct}
              >
                <Text style={styles.textStyle}>Delete</Text>
                <MaterialCommunityIcons
                  name="delete-outline"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  header: { backgroundColor: "green", padding: 15, marginTop: 40 },
  headerText: { color: "white", fontWeight: "600", fontSize: 20 },
  listHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    marginBottom: 5,
    paddingVertical: 10,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    backgroundColor: "#fafafafa",
  },
  emptyList: { alignItems: "center", justifyContent: "center", flex: 1 },
  emptyListText: {
    color: "gray",
    fontSize: 24,
    textAlign: "center",
    marginHorizontal: 20,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "green",
  },
  centeredView: {
    flex: 1,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
    flexDirection: "row",
    alignItems: "center",
  },
  textStyle: {
    color: "red",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 18,
  },
  modalText: {
    marginBottom: 15,
    fontSize: 22,
    color: "black",
  },
  modalHeading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalFooter: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    flexDirection: "row",
  },
});
