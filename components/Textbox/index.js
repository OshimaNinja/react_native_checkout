import { View, Text, StyleSheet, TextInput } from "react-native";
import { useController, useFormContext } from "react-hook-form";

const TextBox = (props) => {
    const formContext = useFormContext();

    const { label, name, rules, validate, defaultValue, ...inputProps } = props;

    if (!formContext || !name) {
        const msg = !formContext
            ? "TextBox must be wrapped by the FormProvider"
            : "Name must be defined";
        console.error(msg);
        return null;
    }

    const {
        field,
        fieldState: { error },
    } = useController({ name, rules, defaultValue, validate });

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={styles.inputContainer}>
                <TextInput
                    style={error ? styles.inputError : styles.input}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                    value={field.value}
                    {...inputProps}
                />
                <Text> {error?.message}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        color: "black",
        margin: 20,
        marginLeft: 0,
    },
    container: {
        flex: -1,
        justifyContent: "center",
        padding: 8,
        backgroundColor: "white",
        borderColor: "white",
        borderWidth: 1,
    },
    input: {
        backgroundColor: "white",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 1,
        height: 40,
        padding: 10,
        borderRadius: 4,
    },
    inputError: {
        backgroundColor: "white",
        borderColor: "orangered",
        borderWidth: 1,
        height: 40,
        padding: 10,
        borderRadius: 4,
    },
});

export default TextBox;
