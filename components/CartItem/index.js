import { StyleSheet, Text, View, Image, Button } from "react-native";
import { useCart } from "../../context/CartContext";

export default function CartItem({ product = {} }) {

	const { removeProduct } = useCart();

	const handleRemoveCart = () => {
		removeProduct(product)
	}

	return (
		<View style={styles.container}>
			<View style={{ flexDirection: "row" }}>
				{/* Product Image View */}
				<View style={{ flex: 1, paddingHorizontal: 8 }}>
					<Image
						style={{ width: 100, height: 100, resizeMode: "center" }}
						source={{ uri: product.img }}
					/>
				</View>
				{/* Product Details View */}
				<View style={{ flex: 3 }}>
					{/* -- Ratings View */}
					<View>
						<Text>{product.name}</Text>
					</View>
					{/* -- Price View */}
					<View style={{ marginTop: 4 }}>
						<Text style={{ fontSize: 16 }}>
							{`$${product.price}  `}
						</Text>
					</View>
				</View>
			</View>
			<View style={{ margin: 10 }}>
                <Button title="Remove Cart" onPress={handleRemoveCart} ></Button>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		marginTop: 10,
		borderBottomColor: "#dfe4ea",
		borderBottomWidth: 1,
		paddingVertical: 10,
	},
});
