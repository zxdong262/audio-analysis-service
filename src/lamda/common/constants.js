export const subscribeInterval = () => '/restapi/v1.0/subscription/~?threshold=59&interval=15'
export const expiresIn = () => process.env.SUBSCRIBE_EXPIRE
  ? parseInt(process.env.SUBSCRIBE_EXPIRE)
  : 1799
