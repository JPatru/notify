import { defineStore } from 'pinia'
import { 
  collection, onSnapshot, 
  doc, deleteDoc, updateDoc, addDoc,
  query, orderBy 
} from 'firebase/firestore'
import { db } from '@/firebase/index.js'
import { useStoreAuth } from '@/stores/storeAuth'

let notesCollectionRef
let notesCollectionQuesy

let getNotesSnapshot = null

export const useStoreNotes = defineStore('storeNotes', {
  state: () => {
    return {
      notes: [],
      notesLoaded: false
    }
  },
  actions: {
    init() {
    const storeAuth = useStoreAuth() 
    notesCollectionRef = collection(db, 'users', storeAuth.user.id, 'notes')
    notesCollectionQuesy = query(notesCollectionRef, orderBy('date', 'desc'))
      this.getNotes()

    },
    async getNotes() {
      this.notesLoaded = false
      getNotesSnapshot = onSnapshot(notesCollectionQuesy, (querySnapshot) => {
        let temporaryNotes = []
        querySnapshot.forEach((doc) => {
          let note = {
            id: doc.id,
            content: doc.data().content,
            date: doc.data().date
          }
          temporaryNotes.push(note)
        })
        this.notes = temporaryNotes
        this.notesLoaded = true
      }, error => {
        console.log('error :', error.message);
      })
    },
    clearNotes() {
      this.notes = []
      if (getNotesSnapshot) getNotesSnapshot() // désinscription des listeners actifs
    },
    async addNote(newNoteContent) {
      let  currentDate = new Date().getTime()
      let date = currentDate.toString()
      await addDoc(notesCollectionRef, {
        content: newNoteContent,
        date: date
      })
    },
    async deleteNote(idToDelete) {
      await deleteDoc(doc(notesCollectionRef, idToDelete))
    },
    async updateNote(id, content) {
      await updateDoc(doc(notesCollectionRef, id), {
        content: content
      })
    }
  },
  getters: {
    getNoteContent: (state) => {
      return (id) => {
        return state.notes.filter(note => note.id === id )[0].content
      }
    },
    totalNotesCount: (state) => {
      return state.notes.length
    },
    totalCaractersCount: (state) => {
      let count = 0
      state.notes.forEach(note => {
        count += note.content.length
      })
      return count
    }
  }
})