export function isMobile() {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      typeof window != 'undefined' ? navigator.userAgent : '',
    )
  ) {
    // true for mobile device
    return true;
  } else {
    // false for not mobile device
    return false;
  }
}
