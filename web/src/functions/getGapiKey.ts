export function getGapiKey() {
  if (window.location.origin.includes('.web.app')) {
    return 'AIzaSyD-slk8nOV6cksgbfrLxTJaMkQZ_68-Fms'
  }
  if (
    window.location.origin.includes('.csb.app') ||
    window.location.origin.includes('localhost') ||
    window.location.origin.includes('127.0.0.1')
  ) {
    return 'AIzaSyDm3FYN4D0iFzGneTiXIQiegaKcnIRUeLo'
  }
  return 'AIzaSyBpmxgK9dbso4pEYWvg47SOoIqIBB83Pno'
}
