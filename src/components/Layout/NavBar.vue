<template>  
  <nav
    class="navbar is-success"
    aria-label="main navigation"
    role="navigation"
  >
    <div class="container is-max-desktop px-2">    
      <div class="navbar-brand">
        <div class="navbar-item is-size-4 is-family-monospace" >
          Notify
        </div>

        <a
          @click.prevent="showMobileNav = !showMobileNav"
          class="navbar-burger"
          :class="{'is-active' : showMobileNav }" 
          aria-expanded="false"
          aria-label="menu"
          data-target="navbarBasicExample"
          role="button"
          ref="navbarBurgerRef"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        class="navbar-menu"        
        :class="{'is-active' : showMobileNav }" 
        ref="navbarMenuRef"
      >
        <div class="start">
          <button
            v-if="storeAuth.user.id"
            @click="logout"
            class="button is-small is-info mt-3"
          >
            Déconnecter {{ storeAuth.user.email }}
          </button>
        </div>
        <div class="navbar-end  px-2">
          <RouterLink
            @click="showMobileNav = false"
            class="navbar-item"
            active-class="is-active"
            to="/"
          >
            Notes
          </RouterLink>
          <RouterLink
            @click="showMobileNav = false"
            class="navbar-item"
            active-class="is-active"
            to="/stats"
          >
            Stats
          </RouterLink>
        </div>
      </div>
    </div>

  </nav>
</template>

<script setup>
//
//IMPORTS
//
  import { ref } from 'vue'
  import { onClickOutside } from '@vueuse/core'
  import { useStoreAuth } from '@/stores/storeAuth'

//
// LOGOUT
//'
  const storeAuth = useStoreAuth()

  const logout = () => {
    showMobileNav.value = false
    storeAuth.logoutUser()
  }

//
//MOBILE NAV
//
const showMobileNav = ref(false)

//
// CLICK OUTSIDE TO CLOSE
//
  const navbarMenuRef = ref(null)
  const navbarBurgerRef = ref(false)
  
  onClickOutside(navbarMenuRef, () => {
    showMobileNav.value = false
  }, {
    ignore: [navbarBurgerRef]
  })

</script>

<style>
@media (max-width: 1023px) {
  .navbar-menu {
    position: absolute;
    left: 0;
    width: 100%;
  }
}
</style>