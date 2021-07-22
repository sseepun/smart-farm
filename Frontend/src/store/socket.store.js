import { userService, socketService } from '../services';

export const socket = {
  namespaced: true,

  state: {
    socket: socketService.init(),
    nodeMCU: null
  },
  
  getters: {
    nodeMCU: state => state.nodeMCU
  },

  // Asynchronous 
  actions: {
    async testConnection({ commit, state }, input) {
      await state.socket.emit('join', {
        data: 'sseepun'
      });
    }
  },
  
  // Synchronous
  mutations: {
    
  }
  
}
