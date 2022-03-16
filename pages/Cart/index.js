import { useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import CartItem from "../../components/CartItem";
import { useCart } from "../../context/CartContext";

const CartPage = ({ navigation }) => {
  const { products, totalPrice } = useCart();

  const handleCheckout = () => {
    navigation.navigate('Checkout');
  };

  return (
    <>
      <ScrollView>
        {products.map((product, index) => (
          <CartItem product={product} key={`cart-item-${index}`} />
        ))}
      </ScrollView>
      <View style={styles.totalView}>
        <Text>
          Total: $
          {totalPrice}
        </Text>
      </View>
      <View style={styles.arrangeProductsBar}>
        <TouchableOpacity
          style={styles.arrangeProductsBarItemOpacity}
          onPress={handleCheckout}
        >
          <Text style={styles.arrangeProductsBarItemLabel}>Go Checkout</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

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
  totalView: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CartPage;
