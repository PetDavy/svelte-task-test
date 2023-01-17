import { writable } from 'svelte/store';

function createStore() {
  const { subscribe, update } = writable({
    carData: {
      carBrand: '',
      zipCode: '',
    },
    userData: {
      firstName: '',
      lastName: '',
      carModel: '',
      isFirstRegistration: false,
    }
  })

  return {
    subscribe,
    update,
    setCarData: (carData) => update(state => ({ ...state, carData })),
    setUserData: (userData) => update(state => ({ ...state, userData })),
    // setCarBrand: (carBrand) => update(state => ({ ...state, carBrand })),
    // setZipCode: (zipCode) => update(state => ({ ...state, zipCode })),
  }
}

export default createStore();