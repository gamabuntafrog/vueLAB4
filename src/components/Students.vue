<template>
  <div>
    <RouterLink to="/students/create-update">Додати нового студента</RouterLink>
    <h2>Список студентів</h2>
    <div style="display: flex">
      <p>Фільтри:</p>
      <select v-model="category">
        <option default value="all">Всі категорії</option>
        <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
      </select>

      <select v-model="course">
        <option default value="all">Всі курси</option>
        <option value="1">Курс 1</option>
        <option value="2">Курс 2</option>
        <option value="3">Курс 3</option>
        <option value="4">Курс 4</option>
        <option value="5">Курс 5</option>
      </select>
    </div>
    <ul>
      <li class="student_item" v-for="student in filteredStudents" :key="student.id">
        <img style="width: 50px" :alt="student.pib" :src="student.image" />
        <RouterLink :to="`students/create-update/${student.id}`" style="margin-right: 10px">
          {{ student.pib }}
        </RouterLink>
        <p style="margin-right: 10px">Курс: {{ student.course }}</p>
        <p>{{ student.category }}</p>
        <button @click="deleteStudent(student.id)">Видалити</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      course: 'all',
      category: 'all'
    }
  },
  methods: {
    deleteStudent(id) {
      this.$store.dispatch('deleteStudents', id);
    }
  },
  computed: {
    options() {
      const options = this.students.map((el) => el.category)
      const uniqueArray = [...new Set(options)]

      return uniqueArray
    },
    filteredStudents() {
      return this.students.filter((el) => {
        let returnFlag = true

        if (this.category !== 'all' && el.category !== this.category) {
          returnFlag = false
        }

        if (this.course !== 'all' && el.course != this.course) {
          returnFlag = false
        }

        return returnFlag
      })
    },
    students() {
      return this.$store.getters.students;
    }
  }
}
</script>

<style>
.student_item {
  display: flex;
}
</style>
