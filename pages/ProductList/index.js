import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import ProductItem from "../../components/Product";
import data from "../../data";

const ProductList = ({ navigation }) => {

  const handleCart = () => {
    navigation.navigate('Cart');
  }

  return (
    <>
      {/* Products List */}
      <ScrollView>
        {data.map((product, index) => (
          <ProductItem product={product} key={`product-${index}`} />
        ))}
      </ScrollView>
      {/* Arrange Products Bar */}
      <View style={styles.arrangeProductsBar}>
        <TouchableOpacity style={styles.arrangeProductsBarItemOpacity} onPress={handleCart}>
          <Text style={styles.arrangeProductsBarItemLabel}>Cart</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  arrangeProductsBar: {
    flexDirection: "row",
    paddingVertical: 14,
    backgroundColor: "#fafafa",
    borderBottomColor: "#dfe4ea",
    borderBottomWidth: 1,
  },
  arrangeProductsBarItemOpacity: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  arrangeProductsBarItemLabel: {
    marginHorizontal: 10,
    fontSize: 20,
  },
});


export default ProductList;