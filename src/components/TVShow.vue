<template>
  <div class="tv-show">
    <h2>TV Shows</h2>

    <div v-if="loading" class="loading">
      <v-progress-circular indeterminate color="red" size="50" />
      <p>Loading TV Shows...</p>
    </div>

    <div v-else-if="error" class="error">
      <v-icon size="60">mdi-alert-circle-outline</v-icon>
      <h3>Something went wrong</h3>
      <p>{{ error }}</p>

      <v-btn color="red" @click="loadData"> Try Again </v-btn>
    </div>

    <v-container v-else-if="shows.length" fluid>
      <v-row>
        <v-col v-for="show in shows" :key="show.id" cols="6" sm="4" md="3" lg="2">
          <MovieCard :movie="show" :genres="genres" />
        </v-col>
      </v-row>
    </v-container>

    <div v-else class="empty">
      <v-icon size="60">mdi-television-off</v-icon>
      <h3>No TV Shows found</h3>
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
      shows: [],
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
        await Promise.all([this.fetchGenres(), this.fetchTVShows()])
      } catch (error) {
        this.error = 'Unable to load TV Shows. Please try again.'
      } finally {
        this.loading = false
      }
    },

    async fetchTVShows() {
      const res = await this.$http.get('/tv/popular')
      this.shows = res.data.results || []
    },

    async fetchGenres() {
      const res = await this.$http.get('/genre/tv/list')
      this.genres = res.data.genres || []
    },
  },
}
</script>

<style scoped>
.tv-show {
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

@media (max-width: 1200px) {
  .tv-show {
    padding: 25px;
  }

  h2 {
    font-size: 30px;
  }
}

@media (max-width: 900px) {
  .tv-show {
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
  .tv-show {
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
  .tv-show {
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
