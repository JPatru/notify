<template>
  <div class="edit-note">
    <AddEditNote
      v-model="noteContent"
      placeholder="Modifier la note"
      label="Modifier la note"
      bgColor="link"
      ref="addEditNoteRef"
    >
      <template v-slot:buttons>
        <button
            @click="$router.back"
            class="button is-link is-light mr-3"
          >
            Annuler
        </button>
        <button
            @click="handleSaveClick"
            class="button is-link has-background-link"
            :disabled="!noteContent"
          >
            Enregistrer
        </button>
      </template>
    </AddEditNote>
  </div>
</template>

<script setup>
//
// IMPORTS
//
  import { ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import AddEditNote from '../components/Notes/AddEditNote.vue';
  import { useStoreNotes } from '@/stores/storeNotes'

//
// ROUTER
//
  const route = useRoute()
  const router = useRouter()

//
// STORE
//

const storeNotes = useStoreNotes()

//
// NOTE
//
  const noteContent = ref('')
  noteContent.value = storeNotes.getNoteContent(route.params.id)
  
//
// SAVE
//
  const handleSaveClick = () => {
    storeNotes.updateNote(route.params.id, noteContent.value)
    router.push('/')
  }
</script>