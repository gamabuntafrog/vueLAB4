<template>
  <div>
    <h1>Create Student</h1>
    <form @submit.prevent="createStudent">
      <div class="form-group">
        <label for="pib">ПІБ:</label>
        <input type="text" id="pib" v-model="student.pib" required />
      </div>

      <div class="form-group">
        <img style="width: 50px" :src="student.image" />

        <label for="image">Фото:</label>
        <input type="file" id="image" accept="image/*" @change="handleImageUpload" :required="!isUpdate" />
      </div>

      <div class="form-group">
        <label for="course">Курс:</label>
        <input type="text" id="course" v-model="student.course" required />
      </div>

      <div class="form-group">
        <label for="category">Категорія:</label>
        <input type="text" id="category" v-model="student.category" required />
      </div>

      <button type="submit">Зберегти</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      student: {
        pib: '',
        image: '',
        course: '',
        category: ''
      }
    }
  },
  props: ['students'],
  computed: {
    isUpdate() {
      return !!this.$route.params.id
    },
    id() {
      return this.$route.params.id
    }
  },
  methods: {
    createStudent() {
      if (this.isUpdate) {
        this.$store.dispatch('updateStudents', this.student);
      } else {
        this.$store.dispatch('addStudents', this.student);
      }

      this.student = {
        pib: '',
        image: '',
        course: '',
        category: ''
      }

      this.$router.push('/students')
    },
    handleImageUpload(event) {
      const file = event.target.files[0]

      if (file) {
        this.student.image = URL.createObjectURL(file)
      }
    }
  },
  created() {
    if (this.id) {
      const student = this.students.find((el) => el.id === this.id)

      if (student) {
        this.student = student;
      } else {
        this.$router.push('/students/create-update')
      }
    }
  }
}
</script>
