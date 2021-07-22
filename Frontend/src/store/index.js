import { createStore } from 'vuex'

import { auth } from './auth.store'
import { alert } from './alert.store'
import { user } from './user.store'
import { farm } from './farm.store'

const store = createStore({
  modules: {
    auth,
    alert,
    user,
    farm
  }
})

export default store;
