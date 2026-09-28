<template>
  <v-app>
    <Navigation />
    <v-main>
      <MovieCarousel />
      <RouterView />
    </v-main>
  </v-app>
</template>

<script>
import Navigation from './components/Navigation.vue'
import MovieCarousel from './components/MovieCarousel.vue'

export default {
  components: {
    Navigation,
    MovieCarousel,
  },
}
</script>

<style>
body {
  margin: 0;
  background: black;
  color: white;
}
@media (max-width: 1200px) {
  .trending {
    padding: 25px;
  }

  h2 {
    font-size: 30px;
  }
}

@media (max-width: 900px) {
  .trending {
    padding: 20px;
  }

  h2 {
    font-size: 28px;
  }

  :deep(.v-col) {
    padding: 6px;
  }
}

@media (max-width: 600px) {
  .trending {
    padding: 15px 10px;
  }

  h2 {
    font-size: 24px;
    margin-bottom: 18px;
  }

  :deep(.v-col) {
    padding: 5px;
  }

  .loading,
  .error,
  .empty {
    min-height: 300px;
  }
}

@media (max-width: 400px) {
  .trending {
    padding: 12px 8px;
  }

  h2 {
    font-size: 22px;
  }

  :deep(.v-col) {
    padding: 4px;
  }
}
</style>
