// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBiYjJTtFxtMsgCIQXJuUbDRB2WATLsN3o',
    authDomain: 'orchid-pos.firebaseapp.com',
    databaseURL: 'https://orchid-pos.firebaseio.com',
    projectId: 'orchid-pos',
    storageBucket: 'orchid-pos.appspot.com',
    messagingSenderId: '322682959300'
  },
  qrcodeUrl: {
    url: 'https://letterp.000webhostapp.com/letterp.php',
  },
  backendUrl: {
    url: 'https://us-central1-letterp-inventory.cloudfunctions.net/api/'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
