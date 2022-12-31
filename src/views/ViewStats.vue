<template>
  <div class="stats">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Donnée</th>
          <th>Valeur</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Nombre de notes</td>
          <td>{{ storeNotes.totalNotesCount }}</td>
        </tr>
        <tr>
          <td>Nombre de caractères (total)</td>
          <td>{{ storeNotes.totalCaractersCount }}</td>
        </tr>
      </tbody>
    </table>
    <input
      v-model="loveNotify"
      class="input"
      placeholder="Aimes tu Notify ? "
      type="text"
      v-autofocus
    />
  </div>
</template>

<script setup>
//
// IMPORTS
//
  import { ref } from 'vue'
  import { useStoreNotes } from '../stores/storeNotes'
  import { vAutofocus } from '@/directives/vAutofocus'
  import { useWatchCharacters } from '@/use/useWatchCharacters'

//
// NOTES
//
  const storeNotes = useStoreNotes()

//
// LOVE NOTIFY
//
  const loveNotify = ref('')
  useWatchCharacters(loveNotify, 50)


//
// WATCH
//
  // useWatchCharacters(newNote)

</script>