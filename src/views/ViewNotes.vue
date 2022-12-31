<template>
  <div class="notes">
    
    <AddEditNote
      v-model="newNote"
      placeholder="Ajouter une note"
      ref="addEditNoteRef"
    >
      <template v-slot:buttons>
        <button
            @click="addNote"
            :disabled="!newNote"
            class="button is-link has-background-success"
          >
            Ajouter une note
          </button>
      </template>
    </AddEditNote>
    <progress
      v-if="!storeNotes.notesLoaded"
      class="progress is-large is-success"
      max="100"
    />
    <template v-else>
      <Note 
        v-for="note in storeNotes.notes"
        :key="note.id"
        :note="note"
      />

      <div
        v-if="storeNotes.notes.length === 0"
        class="is-size-4 has-text-centered has-text-grey-light is-family-monospace py-6"
      >
        Pas encore de notes...
      </div>

    </template>
    
  </div>
</template>

<script setup>
//
// IMPORTS
//
  import { ref } from 'vue'
  import Note from '@/components/Notes/Note.vue'
  import AddEditNote from '@/components/Notes/AddEditNote.vue'
  import { useStoreNotes } from '@/stores/storeNotes'
  import { useWatchCharacters } from '@/use/useWatchCharacters'

//
// STORE
//
  const storeNotes = useStoreNotes()

//
// NOTES
//
  const newNote = ref('')
  const addEditNoteRef = ref(null)

  const addNote = () => {
    storeNotes.addNote(newNote.value)
    newNote.value = ''
    addEditNoteRef.value.focusTextarea()
  }

//
// WATCH
//
  useWatchCharacters(newNote)

</script>
