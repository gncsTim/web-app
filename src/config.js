/*eslint-disable */
export const remoteCouchdbUrl = couchdbName =>
  process.env.NODE_ENV === 'development'
    ? `${window.location.protocol}//${window.location.hostname}:5984/${couchdbName}`
    : `${window.location.protocol}//${window.location.hostname}/couchdb/${couchdbName}`

export const nodeEnv = process.env.NODE_ENV
/*eslint-enable */
