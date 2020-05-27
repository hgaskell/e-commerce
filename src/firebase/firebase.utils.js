import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyAfhQa5vU2eecWLgk-FqX-mRHEy-KQr1Gc",
    authDomain: "e-commerce-955eb.firebaseapp.com",
    databaseURL: "https://e-commerce-955eb.firebaseio.com",
    projectId: "e-commerce-955eb",
    storageBucket: "e-commerce-955eb.appspot.com",
    messagingSenderId: "838258919428",
    appId: "1:838258919428:web:dc6b4d86d8f23073aecd51",
    measurementId: "G-93MP4QLPK8"
  }

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get()

    if(!snapShot.exists) {
      const { displayName, email } = userAuth
      const createdAt = new Date()

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch(error) {
        console.log('error creating user', error.message)
      }
    }

    return userRef
  }

  firebase.initializeApp(config)

  export const auth = firebase.auth()
  export const firestore = firebase.firestore()

  const provider = new firebase.auth.GoogleAuthProvider()
  provider.setCustomParameters({ prompt: 'select_account' })
  export const signInWithGoogle = () => auth.signInWithPopup(provider)

  export default firebase