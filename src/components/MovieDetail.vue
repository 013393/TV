<template>
  <div class="movie-detail">
    <div v-if="movie" class="detail-container">
      <div
        class="backdrop"
        :style="{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }"
      >
        <div class="backdrop-overlay"></div>
      </div>

      <v-row class="main-content">
        <v-col cols="12" md="4">
          <v-img
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            class="poster"
            cover
          />
        </v-col>

        <v-col cols="12" md="8" class="info">
          <h1>{{ movie.title }}</h1>

          <div class="meta">
            <span>⭐ {{ movie.vote_average?.toFixed(1) }}</span>
            <span>{{ movie.release_date }}</span>
            <span>{{ movie.runtime }} min</span>
          </div>

          <div class="genres">
            <v-chip v-for="genre in movie.genres" :key="genre.id" class="genre">
              {{ genre.name }}
            </v-chip>
          </div>

          <p class="overview">
            {{ movie.overview }}
          </p>

          <v-btn color="red" class="back-btn" @click="$router.back()">
            <v-icon start>mdi-arrow-left</v-icon>
            Back
          </v-btn>
        </v-col>
      </v-row>

      <div v-if="cast.length" class="cast-section">
        <h2>Cast</h2>

        <v-row>
          <v-col v-for="actor in cast" :key="actor.id" cols="6" sm="4" md="3" lg="2">
            <div class="cast-card">
              <v-img
                v-if="actor.profile_path"
                :src="`https://image.tmdb.org/t/p/w300${actor.profile_path}`"
                class="cast-image"
                cover
              />

              <div v-else class="no-image">
                <v-icon size="50">mdi-account</v-icon>
              </div>

              <div class="cast-info">
                <h3>{{ actor.name }}</h3>
                <p>{{ actor.character || 'Unknown character' }}</p>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <div v-if="trailer" class="trailer-section">
        <h2>Official Trailer</h2>

        <div class="video-container">
          <iframe
            :src="`https://www.youtube.com/embed/${trailer.key}`"
            title="Movie Trailer"
            frameborder="0"
            allow="
              accelerometer;
              autoplay;
              clipboard-write;
              encrypted-media;
              gyroscope;
              picture-in-picture;
            "
            allowfullscreen
          ></iframe>
        </div>
      </div>

      <div v-else class="no-trailer">Trailer not available</div>
    </div>

    <div v-else class="loading">Loading...</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      movie: null,
      trailer: null,
      cast: [],
    }
  },

  async mounted() {
    try {
      const id = this.$route.params.id

      const movieRes = await this.$http.get(`/movie/${id}`)
      this.movie = movieRes.data

      const videoRes = await this.$http.get(`/movie/${id}/videos`)
      const videos = videoRes.data.results || []

      this.trailer =
        videos.find((video) => video.site === 'YouTube' && video.type === 'Trailer') ||
        videos.find((video) => video.site === 'YouTube' && video.type === 'Teaser') ||
        videos.find((video) => video.site === 'YouTube')

      const creditsRes = await this.$http.get(`/movie/${id}/credits`)

      this.cast = (creditsRes.data.cast || []).filter((actor) => actor.profile_path).slice(0, 12)
    } catch (error) {
      console.log('Movie detail error:', error)
    }
  },
}
</script>

<style>
.movie-detail {
  min-height: 100vh;
  background: black;
  color: white;
  padding-bottom: 80px;
}

.detail-container {
  position: relative;
  max-width: 1400px;
  margin: auto;
}

.backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 650px;
  background-size: cover;
  background-position: center;
  z-index: 0;
}

.backdrop-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to bottom, rgba(0, 0, 0, 0.25), #050505 90%),
    linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.3));
}

.main-content {
  position: relative;
  z-index: 1;
  padding: 100px 50px 50px;
  min-height: 550px;
}

.poster {
  max-width: 350px;
  margin: auto;
  border-radius: 12px;
  box-shadow: 0 20px 50px black;
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
}

.info h1 {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 20px;
}

.meta {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  font-size: 15px;
}

.genres {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 25px;
}

.genre {
  background: black;
  color: white;
}

.overview {
  max-width: 750px;
  color: whitesmoke;
  line-height: 1.8;
  font-size: 17px;
  margin-bottom: 30px;
}

.back-btn {
  width: fit-content;
}

.cast-section {
  position: relative;
  z-index: 2;
  padding: 30px 50px 50px;
}

.cast-section h2 {
  font-size: 28px;
  margin-bottom: 25px;
}

.cast-card {
  background: #151515;
  border-radius: 10px;
  overflow: hidden;
  height: 100%;
  transition: transform 0.3s ease;
}

.cast-card:hover {
  transform: scale(1.05);
}

.cast-image,
.no-image {
  width: 100%;
  height: 260px;
}

.no-image {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #222;
  color: #777;
}

.cast-info {
  padding: 12px;
}

.cast-info h3 {
  font-size: 16px;
  margin-bottom: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cast-info p {
  color: #aaa;
  font-size: 14px;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.trailer-section {
  position: relative;
  z-index: 2;
  padding: 20px 50px;
}

.trailer-section h2 {
  font-size: 28px;
  margin-bottom: 25px;
}

.video-container {
  position: relative;
  width: 100%;
  max-width: 1100px;
  margin: auto;
  aspect-ratio: 16 / 9;
  background: black;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 15px 40px black;
}

.video-container iframe {
  width: 100%;
  height: 100%;
}

.no-trailer {
  position: relative;
  z-index: 2;
  text-align: center;
  color: gray;
  padding: 50px;
}

.loading {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
}

@media (max-width: 768px) {
  .main-content {
    padding: 60px 20px 30px;
  }

  .info {
    padding: 20px 5px;
  }

  .info h1 {
    font-size: 32px;
  }

  .cast-section {
    padding: 30px 20px;
  }

  .trailer-section {
    padding: 20px;
  }

  .cast-image,
  .no-image {
    height: 220px;
  }
}
</style>
