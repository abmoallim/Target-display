export const register = () => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/service-worker.js')
          .then(registration => {
            console.log('ServiceWorker registered: ', registration);
          })
          .catch(error => {
            console.log('ServiceWorker registration failed: ', error);
          });
      });
    }
  };
  
  export const unregister = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then(registration => {
          registration.unregister();
        })
        .catch(error => {
          console.log('ServiceWorker unregistration failed: ', error);
        });
    }
  };
  