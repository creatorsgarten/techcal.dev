export function getGapiKey() {
  if (window.location.origin.includes('.web.app')) {
    return 'AIzaSyD-slk8nOV6cksgbfrLxTJaMkQZ_68-Fms'
  }
  if (window.location.origin.includes('.csb.app')) {
    return 'AIzaSyDm3FYN4D0iFzGneTiXIQiegaKcnIRUeLo'
  }
  return 'AIzaSyBpmxgK9dbso4pEYWvg47SOoIqIBB83Pno'
}
