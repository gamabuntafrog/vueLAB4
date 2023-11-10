<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Головна</RouterLink>
        <RouterLink to="/students">Студенти</RouterLink>
        <RouterLink to="/contacts">Контакти</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script>
export default {
  data() {
    return {
    }
  },
  computed: {
    students() {
      return this.$store.getters.students;
    }
  },
  methods: {
    createStudent(student) {
      if (!student) return

      this.students.push(student)
    },
    updateStudent(student) {
      if (!student) return

      const index = this.students.findIndex((el) => el.id === student)

      if (index > -1) {
        this.students[index] = student
      }
    }
  },
  beforeMount() {
    this.$store.dispatch('initFromLocalStorage');
  }
  
}
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
