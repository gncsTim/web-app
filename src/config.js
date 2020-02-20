/*eslint-disable */
export const remoteCouchdbUrl =
  process.env.NODE_ENV === 'development'
    ? `${window.location.protocol}//${window.location.hostname}:5984/gncs`
    : `${window.location.protocol}//${window.location.hostname}/couchdb/gncs`

export const nodeEnv = process.env.NODE_ENV
/*eslint-enable */
