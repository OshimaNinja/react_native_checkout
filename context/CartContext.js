import { createContext, useReducer, useContext, useMemo } from "react";

const defaultValue = {
    products: []
}

const CartContext = createContext(defaultValue)

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_PRODUCT':
            return {
                ...state,
                products: [...state.products, action.product]
            }
        case 'REMOVE_PRODUCT':
            return {
                ...state,
                products: state.products?.filter(product => product.name !== action.product?.name)
            }
        case 'RESET_PRODUCT':
            return {
                ...state,
                products: []
            }
        default:
            throw new Error()
    }
}

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);

    const { products } = state;

    const totalPrice = useMemo(() => {
        const price = products.reduce((prevValue, currentItem) => {
          const currentPrice = currentItem?.price
            ? Number(currentItem?.price?.replace(/[^0-9.-]+/g, ""))
            : 0;
          return prevValue + currentPrice;
        }, 0);
    
        return price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

      }, [products]);

    const addProduct = (product = {}) => {
        dispatch({
            type: 'ADD_PRODUCT',
            product
        })
    }

    const removeProduct = (product = {}) => {
        dispatch({
            type: 'REMOVE_PRODUCT',
            product
        })
    }

    const resetProduct = () => {
        dispatch({
            type: 'RESET_PRODUCT'
        })
    }


    return (
        <CartContext.Provider
            value={{
                products,
                totalPrice,
                addProduct,
                removeProduct,
                resetProduct
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("CartContext can't use now!!");
    }
    return context
}