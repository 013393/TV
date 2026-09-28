<template>
  <div class="trending">
    <h2>Trending</h2>

    <div v-if="loading" class="loading">
      <v-progress-circular indeterminate color="red" size="50" />
      <p>Loading movies...</p>
    </div>

    <div v-else-if="error" class="error">
      <v-icon size="60">mdi-alert-circle-outline</v-icon>
      <h3>Something went wrong</h3>
      <p>{{ error }}</p>

      <v-btn color="red" @click="loadData"> Try Again </v-btn>
    </div>

    <v-container v-else-if="movies.length" fluid>
      <v-row>
        <v-col v-for="movie in movies" :key="movie.id" cols="6" sm="4" md="3" lg="2">
          <MovieCard :movie="movie" :genres="genres" />
        </v-col>
      </v-row>
    </v-container>

    <div v-else class="empty">
      <v-icon size="60">mdi-movie-open-outline</v-icon>
      <h3>No movies found</h3>
    </div>
  </div>
</template>

<script>
import MovieCard from './MovieCard.vue'

export default {
  components: {
    MovieCard,
  },

  data() {
    return {
      movies: [],
      genres: [],
      loading: true,
      error: '',
    }
  },

  mounted() {
    this.loadData()
  },

  methods: {
    async loadData() {
      this.loading = true
      this.error = ''

      try {
        await Promise.all([this.fetchGenres(), this.fetchTrending()])
      } catch (error) {
        this.error = 'Unable to load movies. Please try again.'
      } finally {
        this.loading = false
      }
    },

    async fetchTrending() {
      const res = await this.$http.get('/trending/movie/day')

      this.movies = res.data.results || []
    },

    async fetchGenres() {
      const res = await this.$http.get('/genre/movie/list')

      this.genres = res.data.genres || []
    },
  },
}
</script>

<style scoped>
.trending {
  min-height: 100vh;
  padding: 30px;
  background: black;
  color: white;
}

h2 {
  margin-bottom: 25px;
  font-size: 32px;
}

:deep(.v-col) {
  padding: 8px;
}

.loading,
.error,
.empty {
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.loading p {
  margin-top: 15px;
  color: gray;
}

.error {
  color: gray;
}

.error h3,
.empty h3 {
  color: white;
  margin: 15px 0 8px;
}

.error p {
  margin-bottom: 20px;
}

.empty {
  color: gray;
}
</style>
