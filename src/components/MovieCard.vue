```vue
<template>
  <div class="movie-card" @click="openMovie">
    <div class="poster-box">
      <v-img :src="posterUrl" class="poster" cover :alt="movie.title || movie.name" />

      <div class="play">
        <div class="play-icon">▶</div>
      </div>
    </div>

    <div class="movie-content">
      <h3>{{ movie.title || movie.name }}</h3>

      <div class="rating-row">
        <div class="stars">
          <span v-for="n in 5" :key="n" :class="{ empty: n > starRating }"> ★ </span>
        </div>

        <span class="percentage">{{ rating }}%</span>
      </div>

      <div class="date">
        {{ movie.release_date || movie.first_air_date || 'N/A' }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      required: true,
    },

    genres: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    posterUrl() {
      if (this.movie.poster_path) {
        return `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`
      }

      return ''
    },

    rating() {
      return Math.round((this.movie.vote_average || 0) * 10)
    },

    starRating() {
      return Math.round((this.movie.vote_average || 0) / 2)
    },
  },

  methods: {
    openMovie() {
      this.$router.push(`/movie/${this.movie.id}`)
    },
  },
}
</script>
```css
<style scoped>
.movie-card {
  width: 100%;
  cursor: pointer;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.movie-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
}

.poster-box {
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
  background: #111;
}

.poster {
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
}

.movie-card:hover .poster {
  transform: scale(1.05);
}

.play {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.7);
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.movie-card:hover .play {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

.play-icon {
  color: black;
  font-size: 19px;
  margin-left: 3px;
}

.movie-content {
  padding: 12px;
  background: white;
}

.movie-content h3 {
  margin: 0 0 8px;
  color: black;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.rating-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stars {
  display: flex;
  align-items: center;
  gap: 1px;
}

.stars span {
  color: orange;
  font-size: 15px;
  line-height: 1;
}

.stars span.empty {
  color: #d0d0d0;
}

.percentage {
  color: gray;
  font-size: 13px;
  font-weight: 500;
}

.date {
  margin-top: 5px;
  color: gray;
  font-size: 13px;
}

/* Tablet */
@media (max-width: 768px) {
  .poster-box {
    height: 220px;
  }

  .movie-content {
    padding: 11px;
  }

  .movie-content h3 {
    font-size: 15px;
  }
}

/* iPhone / Mobile */
@media (max-width: 600px) {
  .poster-box {
    height: 200px;
  }

  .movie-content {
    padding: 10px;
  }

  .movie-content h3 {
    font-size: 14px;
    margin-bottom: 7px;
  }

  .stars span {
    font-size: 13px;
  }

  .percentage,
  .date {
    font-size: 12px;
  }
}

/* iPhone */
@media (max-width: 430px) {
  .movie-card {
    border-radius: 7px;
  }

  .poster-box {
    height: 175px;
  }

  .movie-content {
    padding: 9px;
  }

  .movie-content h3 {
    font-size: 13px;
    margin-bottom: 6px;
  }

  .rating-row {
    gap: 5px;
  }

  .stars {
    gap: 0;
  }

  .stars span {
    font-size: 12px;
  }

  .percentage,
  .date {
    font-size: 11px;
  }

  .date {
    margin-top: 4px;
  }

  .play {
    width: 44px;
    height: 44px;
  }

  .play-icon {
    font-size: 16px;
  }
}

/* iPhone SE / Small screen */
@media (max-width: 375px) {
  .poster-box {
    height: 155px;
  }

  .movie-content {
    padding: 8px;
  }

  .movie-content h3 {
    font-size: 12px;
  }

  .stars span {
    font-size: 11px;
  }

  .percentage,
  .date {
    font-size: 10px;
  }

  .rating-row {
    gap: 4px;
  }
}
</style>
