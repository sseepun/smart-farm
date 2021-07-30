import { createStore } from 'vuex'

import { auth } from './auth.store'
import { alert } from './alert.store'
import { user } from './user.store'
import { farm } from './farm.store'
import { mqttConn } from './mqtt-conn.store'

const store = createStore({
  modules: {
    auth,
    alert,
    user,
    farm,
    mqttConn
  }
})

export default store;
