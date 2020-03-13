const getVersion = (router) => {
  debugger
  let version = router.query.version + ''
  if (version) {
    version = version.replace(/\./g, '')
    return parseInt(version)
  } else {
    return 0
  }
}
export default getVersion
