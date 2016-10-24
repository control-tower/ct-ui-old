export function showNotification(message) {
  return {
    type: 'GROWLER__SHOW',
    growler: {
      text: message,
      type: 'growler--success',
    }
  };


}
