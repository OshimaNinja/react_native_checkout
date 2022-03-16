import { useEffect } from "react";
import { View, Text, Button, StyleSheet, ScrollView, Asyncs } from "react-native";
import { useForm, FormProvider } from "react-hook-form";
import Valid from "card-validator";
import AsyncStorage from '@react-native-async-storage/async-storage';

import TextBox from "../../components/Textbox";
import { useCart } from "../../context/CartContext";

const CHECKOUT_KEY = '@checkout_data';

const CheckoutPage = ({ navigation }) => {
  const { ...methods } = useForm();
  const { totalPrice, resetProduct } = useCart();

  useEffect(() => {
    getSavedData();
  }, [])

  const getSavedData = async () => {
    try {
      const value = await AsyncStorage.getItem(CHECKOUT_KEY);
      if (value !== null) {
        methods.reset({
          ...JSON.parse(value)
        })
      }
    } catch (e) {
      console.error(e)
    }
  }

  const onSubmit = async (data) => {

    // Saving Data

    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(CHECKOUT_KEY, jsonValue);

    // Process Checkout

    alert(`Complete Payment, You Paid $${totalPrice}`);
    // Remove Cart Items
    resetProduct();

    navigation.navigate('Products');
  };

  const cardValidation = (num) => {
    const numberValidation = Valid.number(num);
    if (numberValidation.isValid) return true;
    return "Invalid Card Number";
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <FormProvider {...methods}>
          <Text style={styles.sectionLabel}>Payment Info</Text>
          <TextBox
            label={"Card Number"}
            name="cardNumber"
            rules={{
              required: "Credit Card is required",
              validate: cardValidation,
            }}
          />
          <View
            style={{
              flex: 1,
              flexDirection: "row",
            }}
          >
            <View style={{ flex: 1 }}>
              <TextBox
                label={"Expire Date(MM/DD)"}
                name="expireDate"
                rules={{ required: "Expire Date is required" }}
                mask="00/00"
              />
            </View>
            <View style={{ flex: 1 }}>
              <TextBox
                label={"CVC"}
                name="cardCVC"
                rules={{ required: "CVC is required!" }}
              />
            </View>
          </View>

          <Text style={styles.sectionLabel}>Customer Info</Text>

          <TextBox
            label={"Full Name"}
            name="fullName"
            rules={{ required: "Name is required!!" }}
          />
          <TextBox
            label={"Email"}
            name="email"
            keyboardType="email-address"
            rules={{
              required: "Email is required",
              validate: (value) =>
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/.test(value) ? true : 'Invalid Email',
            }}
          />
          <TextBox
            label={"Address"}
            name="address"
            rules={{ required: "Address is required" }}
          />
          <TextBox
            label={"Country"}
            name="country"
            rules={{ required: "Country is required" }}
          />
          <TextBox
            label={"City"}
            name="city"
            rules={{ required: "City is required" }}
          />
          <TextBox
            label={"Zip/Postal"}
            name="zipcode"
            rules={{ required: "Zip code is required" }}
          />

          <Text style={styles.sectionLabel}>Billing Address</Text>

          <TextBox
            label={"Billing Name"}
            name="billingFullName"
            rules={{ required: "Name is required!!" }}
          />
          <TextBox
            label={"Address"}
            name="billingAddress"
            rules={{ required: "Address is required" }}
          />
          <TextBox
            label={"Country"}
            name="billingCountry"
            rules={{ required: "Country is required" }}
          />
          <TextBox
            label={"City"}
            name="billingCity"
            rules={{ required: "City is required" }}
          />
          <TextBox
            label={"Zip/Postal"}
            name="billingZipcode"
            rules={{ required: "Zip code is required" }}
          />
        </FormProvider>
        <View style={styles.button}>
          <Button
            title="Submit"
            color="black"
            onPress={methods.handleSubmit(onSubmit)}
          />
        </View>
      </ScrollView>
      <View style={styles.totalView}>
        <Text>
          Total: $
          {totalPrice}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    color: "black",
    marginTop: 10,
  },
  sectionLabel: {
    color: "grey",
    marginTop: 20,
  },
  button: {
    marginTop: 40,
    color: "white",
    height: 40,
    backgroundColor: "#000",
    borderRadius: 4,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  input: {
    backgroundColor: "white",
    borderColor: "rgba(0,0,0,1)",
    borderWidth: 1,
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
  totalView: {
    backgroundColor: "#fafafa",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomColor: "#dfe4ea",
    borderTopColor: "#dfe4ea",
  },
});

export default CheckoutPage;
