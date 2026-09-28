<template>
  <div class="search-page">
    <div class="search-header">
      <h1>Search</h1>

      <div class="search-box">
        <v-text-field
          v-model="keyword"
          placeholder="Search movies or TV shows..."
          prepend-inner-icon="mdi-magnify"
          variant="solo"
          clearable
          hide-details
          @keyup.enter="searchMovies"
          @input="searchMovies"
        />

        <v-btn color="red" size="large" class="search-btn" @click="searchMoviesNow"> Search </v-btn>
      </div>
    </div>
    <div v-if="loading" class="loading">
      <v-progress-circular indeterminate size="50" color="red" />
      <p>Searching...</p>
    </div>
    <div v-else-if="searched && movies.length === 0" class="empty">
      <v-icon size="60"> mdi-movie-open-outline </v-icon>
      <h2>No results found</h2>
      <p>Try searching for another movie or TV show.</p>
    </div>
    <v-container v-else-if="movies.length" fluid class="results">
      <h2>Results for "{{ keyword }}"</h2>
      <v-row>
        <v-col
          v-for="movie in movies"
          :key="`${movie.media_type}-${movie.id}`"
          cols="6"
          sm="4"
          md="3"
          lg="2"
        >
          <MovieCard :movie="movie" :genres="genres" />
        </v-col>
      </v-row>
    </v-container>
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
      keyword: '',
      movies: [],
      genres: [],
      loading: false,
      searched: false,
      searchTimer: null,
    }
  },
  async mounted() {
    await this.fetchGenres()
    const query = this.$route.query.q
    if (query) {
      this.keyword = query
      await this.searchMoviesNow()
    }
  },
  watch: {
    '$route.query.q'(value) {
      if (value && value !== this.keyword) {
        this.keyword = value
        this.searchMoviesNow()
      }
    },
  },
  methods: {
    searchMovies() {
      clearTimeout(this.searchTimer)
      const query = this.keyword.trim()
      if (!query) {
        this.movies = []
        this.searched = false
        this.loading = false
        return
      }
      this.searchTimer = setTimeout(() => {
        this.searchMoviesNow()
      }, 500)
    },
    async searchMoviesNow() {
      clearTimeout(this.searchTimer)
      const query = this.keyword.trim()
      if (!query) {
        this.movies = []
        this.searched = false
        this.loading = false
        return
      }
      this.loading = true
      this.searched = true
      try {
        const res = await this.$http.get('/search/multi', {
          params: {
            query: query,
            include_adult: false,
            language: 'en-US',
            page: 1,
          },
        })
        this.movies = res.data.results.filter(
          (item) => (item.media_type === 'movie' || item.media_type === 'tv') && item.poster_path,
        )
      } catch (error) {
        console.log('Search error:', error)
        this.movies = []
      } finally {
        this.loading = false
      }
    },
    async fetchGenres() {
      try {
        const [movieRes, tvRes] = await Promise.all([
          this.$http.get('/genre/movie/list'),
          this.$http.get('/genre/tv/list'),
        ])
        this.genres = [...movieRes.data.genres, ...tvRes.data.genres]
      } catch (error) {
        console.log('Genre error:', error)
      }
    },
  },
}
</script>
<style scoped>
.search-page {
  min-height: 100vh;
  background: black;
  color: white;
  padding: 50px 30px 80px;
}
.search-header {
  max-width: 900px;
  margin: 0 auto 50px;
  text-align: center;
}
.search-header h1 {
  font-size: 42px;
  margin-bottom: 25px;
  font-weight: 700;
}
.search-box {
  display: flex;
  gap: 12px;
  align-items: center;
  width: 100%;
}
.search-box .v-text-field {
  flex: 1;
}
.search-btn {
  height: 56px;
  min-width: 110px;
  font-weight: 600;
}
.results {
  padding: 0;
}
.results h2 {
  margin-bottom: 25px;
  font-size: 24px;
  font-weight: 600;
}
.loading {
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: gray;
}
.loading p {
  margin-top: 15px;
  font-size: 16px;
}
.empty {
  text-align: center;
  color: gray;
  padding: 80px 20px;
}
.empty h2 {
  color: white;
  margin: 20px 0 10px;
  font-size: 28px;
}
.empty p {
  font-size: 16px;
}
@media (max-width: 600px) {
  .search-page {
    padding: 30px 15px 60px;
  }

  .search-header {
    margin-bottom: 30px;
  }

  .search-header h1 {
    font-size: 32px;
  }

  .search-box {
    flex-direction: column;
  }

  .search-box .v-text-field,
  .search-btn {
    width: 100%;
  }

  .search-btn {
    height: 50px;
  }

  .results h2 {
    font-size: 20px;
  }
}
</style>
