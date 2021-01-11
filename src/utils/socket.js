import io from 'socket.io-client'
import { URL } from '@/config/URL'
class Socket {
  constructor () {
    this.instance = null
  }

  create (loginUserNum) {
    this.instance = io(URL.SOCKET, {
      query: {
        loginUserNum
      }
    })
  }

  destroy () {
    if (this.instance) {
      this.instance.destroy()
    }
  }

  on (event, cb) {
    this.instance.on(event, cb)
  }

  emit (event, data) {
    this.instance.emit(event, data)
  }
}

export default new Socket()
