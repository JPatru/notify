<template>
  <div
    class="card mb-4"
  >
    <div class="card-content">
      {{ note.content }}
      <div class="columns is-mobile has-text-grey-light">
        <small class="column">{{ dateFormatted }}</small>
        <small class="column has-text-right">{{ characterLength }}</small>
      </div>
    </div>
    <footer class="card-footer">
      <RouterLink
        :to="`/editNote/${ note.id }`"
        class="card-footer-item"
        href="#"
      >
        Modifier
        </RouterLink>
      <a
        @click.prevent="modals.deleteNote = true"
        class="card-footer-item"
        href="#"
      >
        Supprimer
      </a>
    </footer>
    <ModalDeleteNote
      v-if="modals.deleteNote"
      v-model="modals.deleteNote"
      :noteId="note.id"
    />
  </div>
</template>

<script setup>
//
// IMPORTS
//
  import { computed, reactive } from 'vue'
  import { useDateFormat } from '@vueuse/core'
  import ModalDeleteNote from '@/components/Notes/ModalDeleteNote.vue'
  import { useStoreNotes } from '@/stores/storeNotes'

//
// STORE
//
const storeNotes = useStoreNotes()

//
// DATE 
//
  const dateFormatted = computed(() => {
    let date = new Date(parseInt(props.note.date))
    let formattedDate = useDateFormat(date, 'DD-MM-YYYY @ HH:mm')
    return formattedDate.value
  })


//
// PROPS
//
  const props = defineProps({
    note: {
      type: Object,
      required: true
    }
  })

  //
  // LENGTH
  //
    const characterLength = computed(() => {
      let length = props.note.content.length
      let description = length > 1 ? 'caractères' : 'caractère'
      return `${ length } ${ description }`
    })

//
// MODALS
//
    const modals = reactive({
      deleteNote: false
    })

</script>