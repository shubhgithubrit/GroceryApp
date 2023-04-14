import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { action, computed, makeObservable, observable } from "mobx";
import {ToastAndroid} from 'react-native';
import { makePersistable } from 'mobx-persist-store';


const setToastMessage = message => {
    ToastAndroid.showWithGravity(
      message,

      ToastAndroid.SHORT,

      ToastAndroid.CENTER,
    );
  };
class cartStore {
    cartItems = []
    totalprice = 0

    constructor() {
        makeObservable(
            this, {
            AddToCart: action,
            RemoveFromCart: action,
            EmptyCart: action,
            IncrementQuantity: action,
            DecrementQuantity: action,
            computePrice: action,
            cartItems: observable,
            totalprice: observable
        },
        makePersistable(this,
            {
                name: 'cartPersist',
                properties: ['cartItems', 'totalprice'],
                storage: AsyncStorage
            }
        ),
            { autoBind: true },
        );
    }
    EmptyCart() {
        this.cartItems = []
    }

    AddToCart(item) {
        let alreadyExists = false
        this.cartItems.forEach(elem => {
            if (elem.id == item.id) {
                alreadyExists = true;
            }
        });
        if (alreadyExists == false) {
            setToastMessage('Product added to cart');
            const items = {
                ...item,
                orderqty: 1
            }
            this.cartItems.push(items)
            this.computePrice()
        } else {
            setToastMessage('Already Added to Cart');
        }
    }

    RemoveFromCart(removeItem) {
        const remove = this.cartItems.filter(item => item !== removeItem)
        this.cartItems = remove
        this.computePrice()
    }

    IncrementQuantity(item) {
        const increment = this.cartItems
        for (let i = 0; i < increment.length; i++) {
            if (item.id == increment[i].id) {
                if(increment[i].orderqty != increment[i].qty){
                increment[i].orderqty += 1
                }
                else {Alert.alert('Max quantity selected')}
            }
        }
        this.cartItems = increment
        this.computePrice()
    }

    DecrementQuantity(item) {
        const decrement = this.cartItems
        for (let i = 0; i < decrement.length; i++) {
            if (item.id == decrement[i].id) {
                if (decrement[i].orderqty != 1) {
                    decrement[i].orderqty -= 1
                }
                else {
                    Alert.alert('Quantity cannot be less than 1')
                }
            }
        }
        this.cartItems = decrement
        this.computePrice()
    }

    computePrice(){
        this.totalprice = 0
        for(let i = 0; i<this.cartItems.length; i++){
            const price = this.cartItems[i].orderqty * this.cartItems[i].discountedprice
            this.totalprice = this.totalprice + price
        }
    }
}

export default CartStore = new cartStore();