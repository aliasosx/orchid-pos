export const environment = {
  production: true,
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
    // url: 'https://us-central1-letterp-inventory.cloudfunctions.net/api/'
    url: 'https://www.letter-p.info:3000/'
  },
  backendMemberUrl: {
    url: 'https://www.letter-p.info:8000/api/v1/'
  }
};
