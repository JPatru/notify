import { defineStore } from 'pinia'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '@/firebase/index.js'
import { useStoreNotes } from '@/stores/storeNotes'

export const useStoreAuth = defineStore('storeauth', {
  state: () => {
    return {
      user: {}
    }
  },
  actions: {
    init() {
      const storeNotes = useStoreNotes()

      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user.id = user.uid,
          this.user.email = user.email
          this.router.push('/')
          storeNotes.init()
        } else {
          this.user = {}
          this.router.replace('/auth')
          storeNotes.clearNotes()
        }
      })
    },
    registerUser(credentials) {
      createUserWithEmailAndPassword(auth, credentials.email, credentials.password).then((userCredential) => {
        const user = userCredential.user
      }).catch((error) => {
        // console.log('error.message :', error.message)
      })
    },
    loginUser(credentials) {
      signInWithEmailAndPassword(auth, credentials.email, credentials.password).then((userCredential) => {
        const user = userCredential.user
        // console.log('Utilisateur est connecté', user)
      }).catch((error) => {
        // console.log('error.message :', error.message)
      })
    },
    logoutUser() {
      signOut(auth).then(() => {
        // console.log('Utilisateur est déconnecté')
      }).catch((error) => {
        // console.log('error.message :', error.message)
      })
    }
  }
})