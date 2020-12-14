const MOCK =
  process.env.NODE_ENV === 'development' ? process.env.MOCK === 'mock' : false

const IP = {
  LOCAL: 'localhost',
  SERVER: '192.168.1.58',
  CHENG: '192.168.1.58',
  LI: '192.168.1.7',
  ZHONG: '192.168.1.224'
}
const PORT = {
  NORMAL: '9090',
  SOCKET: '9093',
  MOCK: '3000'
}

const devIpType = '' // 'SERVER' / 'LOCAL'
const prodIpType = 'SERVER'

const IP_LI = devIpType ? IP[devIpType] : IP.LI
const IP_CHENG = devIpType ? IP[devIpType] : IP.CHENG
const IP_ZHONG = devIpType ? IP[devIpType] : IP.ZHONG
const IP_PROD = IP[prodIpType]

const dev = process.env.NODE_ENV === 'development'
const URL = {
  LI: `http://${dev ? IP_LI : IP_PROD}:${PORT.NORMAL}/`,
  CHENG: `http://${dev ? IP_CHENG : IP_PROD}:${PORT.NORMAL}/`,
  ZHONG: `http://${dev ? IP_ZHONG : IP_PROD}:${PORT.NORMAL}/`,
  SOCKET: `http://${dev ? IP_ZHONG : IP_PROD}:${PORT.SOCKET}/`,
  MOCK: `http://${IP.LOCAL}:${PORT.MOCK}`
}

export { PORT, URL, MOCK }
