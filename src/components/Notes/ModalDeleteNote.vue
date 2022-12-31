<template>
  <div class="modal is-active p-2">
    <div class="modal-background"></div>
    <div
      ref="modalCardRef"
      class="modal-card"
    >
      <header class="modal-card-head">
        <p class="modal-card-title">Supprimer cette note ?</p>
        <button
          @click="closeModal"
          class="delete"
          aria-label="close"
        >
        </button>
      </header>
      <section class="modal-card-body">
        Voulez-vous vraiment supprimer cette note ?
      </section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <button
          @click="closeModal"
          class="button"
        >
            Annuler
          </button>
        <button
          @click="storeNotes.deleteNote(noteId)"
          class="button is-danger"
        >
          Supprimer

        </button>
      </footer>
    </div>
  </div>
</template>

<script setup>
//
// IMPORTS
//
  import { onMounted, onUnmounted, ref } from 'vue'
  import { onClickOutside } from '@vueuse/core'
  import { useStoreNotes } from '@/stores/storeNotes'

//
// PROPS
//
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    noteId: {
      type: String,
      required: true
    }
  })

//
// EMITS
//
    const emit = defineEmits(['update:modelValue'])

//
// STORE
//

  const storeNotes = useStoreNotes()

//
// CLOSE
//

    const closeModal = () => {
      emit('update:modelValue', false)
    }
    
//
// CLICK OUTSIDE TO CLOSE
//
  const modalCardRef = ref(null)
  
  onClickOutside(modalCardRef, closeModal)

//
// CONTROLE CLAVIER
//
    const handleKeyboard = e => {
      if (e.key === 'Escape') closeModal()
    }

    onMounted(() => {
      document.addEventListener('keyup', handleKeyboard)
    })
    onUnmounted(() => {
      document.removeEventListener('keyup', handleKeyboard)
    }) // sinon, un nouvel EventListener est ouvert à chaque fois. 
</script>