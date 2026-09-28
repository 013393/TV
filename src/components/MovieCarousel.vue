<template>
  <section class="carousel">
    <button class="arrow left" @click="prevMovie">‹</button>
    <div class="carousel-track">
      <div
        v-for="(movie, index) in visibleMovies"
        :key="movie.id"
        class="carousel-card"
        :class="getPosition(index)"
        @click="openMovie(movie)"
      >
        <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title" />

        <div class="card-title">
          {{ movie.title }}
        </div>
      </div>
    </div>
    <button class="arrow right" @click="nextMovie">›</button>
  </section>
</template>
<script>
export default {
  data() {
    return {
      movies: [],
      currentIndex: 0,
    }
  },

  computed: {
    visibleMovies() {
      if (!this.movies.length) return []

      const total = this.movies.length

      return [-2, -1, 0, 1, 2].map((offset) => {
        const index = (this.currentIndex + offset + total) % total

        return this.movies[index]
      })
    },
  },

  async mounted() {
    try {
      const response = await this.$http.get('/trending/movie/day')

      this.movies = response.data.results
    } catch (error) {
      console.error('TMDB Error:', error)
    }
  },

  methods: {
    getPosition(index) {
      const positions = ['far-left', 'left-card', 'center', 'right-card', 'far-right']

      return positions[index]
    },

    nextMovie() {
      this.currentIndex = (this.currentIndex + 1) % this.movies.length
    },

    prevMovie() {
      this.currentIndex = (this.currentIndex - 1 + this.movies.length) % this.movies.length
    },

    openMovie(movie) {
      this.$router.push(`/movie/${movie.id}`)
    },
  },
}
</script>

<style scoped>
.carousel {
  position: relative;
  width: 100%;
  height: 680px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: black;
}

.carousel-track {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1200px;
}
.carousel-card {
  position: absolute;
  width: 300px;
  height: 530px;
  overflow: hidden;
  cursor: pointer;
  border-radius: 2px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  transition:
    transform 0.5s ease,
    opacity 0.5s ease;
}

.carousel-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-card::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 25%;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.85));
}

.card-title {
  position: absolute;
  bottom: 20px;
  left: 15px;
  right: 15px;
  z-index: 2;
  color: white;
  text-align: center;
  font-size: 15px;
  font-weight: bold;
  text-transform: uppercase;
}

.center {
  transform: translateX(0) scale(1);
  z-index: 5;
}

.left-card {
  transform: translateX(-300px) scale(0.9) rotateY(8deg);
  z-index: 4;
}

.right-card {
  transform: translateX(300px) scale(0.9) rotateY(-8deg);
  z-index: 4;
}

.far-left {
  transform: translateX(-500px) scale(0.82) rotateY(15deg);
  z-index: 3;
}

.far-right {
  transform: translateX(500px) scale(0.82) rotateY(-15deg);
  z-index: 3;
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;

  border: none;
  background: transparent;
  color: red;
  font-size: 65px;
  cursor: pointer;
}

.arrow:hover {
  transform: translateY(-50%) scale(1.2);
}

.arrow.left {
  left: 15px;
}

.arrow.right {
  right: 15px;
}

@media (max-width: 1000px) {
  .carousel-card {
    width: 250px;
    height: 450px;
  }

  .left-card {
    transform: translateX(-230px) scale(0.85) rotateY(8deg);
  }

  .right-card {
    transform: translateX(230px) scale(0.85) rotateY(-8deg);
  }

  .far-left {
    transform: translateX(-390px) scale(0.75) rotateY(15deg);
  }

  .far-right {
    transform: translateX(390px) scale(0.75) rotateY(-15deg);
  }
}

@media (max-width: 700px) {
  .carousel {
    height: 500px;
  }

  .carousel-card {
    width: 220px;
    height: 380px;
  }

  .left-card {
    transform: translateX(-150px) scale(0.8);
  }

  .right-card {
    transform: translateX(150px) scale(0.8);
  }

  .far-left,
  .far-right {
    opacity: 0;
  }
}
</style>
