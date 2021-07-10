import { createStore } from 'vuex'

import { auth } from './auth.store'
import { alert } from './alert.store'
import { farm } from './farm.store'

const store = createStore({
  modules: {
    auth,
    alert,
    farm
  }
})

export default store;
