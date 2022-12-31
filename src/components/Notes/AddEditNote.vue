<template>
  <div class="card p-4 mb-5" :class="`has-background-${ bgColor }-dark`">
    <label
      v-if="label"
      class="label has-text-white"
    >
      {{ label }}
    </label>
    <div class="field">
      <div class="control">
        <textarea
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          class="textarea"
          :placeholder="placeholder"
          ref="textareaRef"
          maxlength = 100
          v-autofocus
        />
        <!-- code d'origine :
              v-model="modelValue"
              @input="$emit('update:modelValue', modelValue)"  
            changé pour des raisons de bug en production (DannyConnell Udemy vidéo 154) -->
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <slot name="buttons" />
      </div>
    </div>
  </div>
</template>

<script setup>
//
// IMPORTS
//
  import { ref } from 'vue'
  import { vAutofocus } from '@/directives/vAutofocus'

//
// PROPS
//
  const props = defineProps({
    modelValue: {
      type: String,
      required: true
    },
    bgColor: {
      type: String,
      default: 'success'
    },
    placeholder: {
      type: String,
      default: 'Tapez quelque chose...'
    },
    label: {
      type: String
    }
  })

  //
  // EMITS
  //
    const emit = defineEmits(['update:modelValue'])

  //
  // FOCUS
  //
    const textareaRef = ref(null)

    const focusTextarea = () => {
      textareaRef.value.focus()
    }
    defineExpose({
      focusTextarea
    })

    //
    // DIRECTIVES
    //

    // const vAutofocus = {
    //   mounted: (el) => {
    //     el.focus()
    //   }
    // }

</script>