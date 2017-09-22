import axios from 'axios';

export const initStorage = () => {
  try {
    const serializedProducts = JSON.stringify(require('../data/products.json'));
    const serializedCart = JSON.stringify(require('../data/cart.json'));
    if (!localStorage.getItem('reactminishop')) {
      localStorage.setItem('reactminishop', serializedProducts);
    }

    if (!localStorage.getItem('reactminicart')) {
      localStorage.setItem('reactminicart', serializedCart);
    }
  } catch (e) {

  }
};

export const setProducts = (products) => {
  try {
    const serializedProducts = JSON.stringify(products);
    localStorage.setItem('reactminishop', serializedProducts);
  } catch (e) {

  }
};

export const setCart = (cart) => {
  try {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem('reactminicart', serializedCart);
  } catch (e) {
  }
};

export const getProducts = () => {
    return axios.get('/getProducts')
};


export const getCategories = () => {
    return axios.get('/getCategories')
};

export const login = (email,password) => {

    axios.post('/login', { userName: email, password: password })
        .then(function(response){
            console.log('saved successfully')
        });
};

export const getCart = () => {
  try {
    return JSON.parse(localStorage.getItem('reactminicart'));
  } catch (e) {
    return undefined;
  }
}

export const removeStorage = () => {
  window.onunload = function() {
    localStorage.clear();
  };
};