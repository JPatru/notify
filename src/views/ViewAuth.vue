<template>
  <div class="auth">
    <div class="tabs is-centered">
      <ul>
        <li
          :class="{ 'is-active' : !register }"
        >
          <a @click.prevent="register = false">Connexion</a>
        </li>
        <li
          :class="{ 'is-active' : register }"
        >
          <a @click.prevent="register = true">Créer un compte</a>
        </li>
      </ul>
    </div>
    <div class="card auth-form">
      <div class="card-content">
        <div class="title has-text-centered">
          {{ formTitle }}
        </div>

        <form
          @submit.prevent="onSubmit"
        >
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input
              v-model = "credentials.email"
                class="input"
                placeholder="exemple@email.fr"
                type="email"
              >
            </div>
          </div>

          <div class="field">
            <label class="label">Mot de passe</label>
            <div class="control">
              <input
                v-model = "credentials.password"
                class="input"
                placeholder="Entrer un mot de passe"
                type="password"
              >
            </div>
          </div>

          <div class="field is-grouped is-grouped-right">
            <p class="control">
              <button class="button is-primary">
                {{ formTitle }}
              </button>
            </p>
          </div>
       </form>
        

      </div>
    </div>
  </div>
</template>

<script setup>

//
// IMPORT
//
  import { ref, computed, reactive } from 'vue'
  import { useStoreAuth } from '@/stores/storeAuth'

//
// REGISTER / LOGIN
//

  const storeAuth = useStoreAuth()
  const register = ref(false)

//
// FORM TITLE
//

  const formTitle = computed(() => {
    return (register.value ? 'Créer un compte' : 'Connexion')
  })

//
// CREDENTIALS
//

  const credentials = reactive({
    email: '',
    password: ''
  })

//
// SUBMIT
//

  const onSubmit = () => {
    if (!credentials.email || !credentials.password) {
      alert('Please enter email and password')
    }
    else {
      if (register.value) {
        storeAuth.registerUser(credentials)
      }
      else {
        storeAuth.loginUser(credentials)
      }
    }
  }

</script>

<style>
.auth-form {
  max-width: 400px;
  margin: 0 auto;
}
</style>