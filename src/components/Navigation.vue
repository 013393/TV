```vue
<template>
  <v-app-bar class="navbar" height="70" elevation="0">
    <v-container fluid class="nav-container">
      <div class="logo" @click="goHome">TV</div>

      <div class="desktop-menu">
        <v-btn variant="text" @click="goHome"> Home </v-btn>

        <v-btn variant="text" @click="goMovies"> Movies </v-btn>

        <v-btn variant="text" @click="goTV"> TV Shows </v-btn>

        <v-btn variant="text" @click="goTrending"> Trending </v-btn>

        <v-btn variant="text" @click="goSearch">
          <v-icon start>mdi-magnify</v-icon>
          Search
        </v-btn>
      </div>

      <v-spacer />

      <v-btn class="mobile-menu" variant="text" icon @click="drawer = !drawer">
        <v-icon size="30">mdi-menu</v-icon>
        <span class="menu-icon">☰</span>
      </v-btn>
    </v-container>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" temporary location="right" class="mobile-drawer">
    <v-list>
      <v-list-item title="Home" prepend-icon="mdi-home" @click="goHome" />

      <v-list-item title="Movies" prepend-icon="mdi-movie" @click="goMovies" />

      <v-list-item title="TV Shows" prepend-icon="mdi-television" @click="goTV" />

      <v-list-item title="Trending" prepend-icon="mdi-fire" @click="goTrending" />

      <v-list-item title="Search" prepend-icon="mdi-magnify" @click="goSearch" />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const drawer = ref(false)

    const goHome = () => {
      router.push('/')
      drawer.value = false
    }

    const goMovies = () => {
      router.push('/movies')
      drawer.value = false
    }

    const goTV = () => {
      router.push('/tv')
      drawer.value = false
    }

    const goTrending = () => {
      router.push('/trending')
      drawer.value = false
    }

    const goSearch = () => {
      router.push('/search')
      drawer.value = false
    }

    return {
      drawer,
      goHome,
      goMovies,
      goTV,
      goTrending,
      goSearch,
    }
  },
}
</script>

<style scoped>
.navbar {
  background: black !important;
  border-bottom: 1px solid #222;
}

.nav-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo {
  margin-right: 30px;
  color: lightskyblue;
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -1px;
  cursor: pointer;
  transition: 0.3s;
}

.logo:hover {
  transform: scale(1.05);
}

.desktop-menu {
  display: flex;
  align-items: center;
}

.desktop-menu .v-btn {
  color: whitesmoke;
  text-transform: none;
  font-size: 15px;
}

.desktop-menu .v-btn:hover {
  color: lightskyblue;
}

.mobile-menu {
  display: none !important;
}
.menu-icon {
  color: white;
  font-size: 30px;
  line-height: 1;
}
.mobile-drawer {
  background: black !important;
  color: white;
}
.mobile-drawer :deep(.v-list) {
  background: black;
}
.mobile-drawer :deep(.v-list-item) {
  color: white;
}
.mobile-drawer :deep(.v-list-item:hover) {
  background: black;
}
@media (max-width: 768px) {
  .desktop-menu {
    display: none !important;
  }
  .mobile-menu {
    display: flex !important;
  }
  .logo {
    margin-right: 0;
  }
}
</style>
