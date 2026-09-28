<template>
  <div class="home">
    <Trending />
    <TVShow />
  </div>
</template>

<script>
import Trending from './Trending.vue'
import TVShow from './TVShow.vue'

export default {
  components: {
    Trending,
    TVShow,
  },
}
</script>

<style scoped>
.home {
  background: black;
  min-height: 100vh;
}
</style>
