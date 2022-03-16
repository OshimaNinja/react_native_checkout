import { StyleSheet, Text, View, Image, Button } from "react-native";
import { useCart } from "../../context/CartContext";

export default function Product({ product = {} }) {

	const { products, addProduct, removeProduct } = useCart();

	const handleAddCart = () => {
		addProduct(product);
	}

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
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<View
								style={styles.ratingView}
							>
								<Text
									style={{
										color: "#111",
										marginRight: 8,
										fontSize: 16,
									}}
								>
									{product.rating}
								</Text>
							</View>
							<Text style={{ marginLeft: 6 }}>({product.ratingCount})</Text>
						</View>
					</View>
					{/* -- Price View */}
					<View style={{ marginTop: 4 }}>
						<Text style={{ fontSize: 16 }}>
							{`$${product.price}  `}
							<Text
								style={{
									color: "#57606f",
									textDecorationLine: "line-through",
								}}
							>
								{product.actualPrice !== "" ? `$${product.actualPrice}` : null}
							</Text>
							<Text style={{ color: "green" }}>{`  ${product.discount}`}</Text>
						</Text>
					</View>
				</View>
			</View>
			{/* Offer View */}
			<View
				style={styles.offerView}
			>
				<Text style={{ marginLeft: 10, fontSize: 16 }}>{product.offer}</Text>
			</View>
			{/* Specifications Wrap */}
			<View
				style={styles.specView}
			>
				{product.specifications?.map((spec, index) => (
					<Text style={styles.specifications} key={`product-specification-${index}`}>{spec}</Text>
				))}
			</View>
			<View style={{ margin: 10 }}>
				{products.find(item => item.name === product.name) ? (
					<Button title="Remove Cart" onPress={handleRemoveCart} ></Button>					
				): (
					<Button title="Add Cart" onPress={handleAddCart} ></Button>
				)}
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
	ratingView: {
		flexDirection: "row",
		backgroundColor: "#fff200",
		alignItems: "center",
		paddingHorizontal: 4,
		paddingVertical: 2,
		borderRadius: 4,
		marginTop: 4,
	},
	offerView: {
		paddingHorizontal: 8,
		flexDirection: "row",
		alignItems: "center",
	},
	specifications: {
		marginTop: 4,
		marginBottom: 4,
		marginLeft: 4,
		marginRight: 4,
		justifyContent: "flex-start",
		alignItems: "center",
		backgroundColor: "#f2f2f2",
		alignSelf: "baseline",
		paddingHorizontal: 6,
		paddingVertical: 4,
		borderRadius: 4,
	},
	specView: {
		marginTop: 4,
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "flex-start",
		alignItems: "center",
	}
});
