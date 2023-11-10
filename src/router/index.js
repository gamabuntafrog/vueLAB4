import { createRouter, createWebHistory } from 'vue-router'
import Main from '../components/Main.vue'
import Students from '../components/Students.vue'
import Contacts from '../components/Contacts.vue'
import CreateUpdateStudent from '../components/CreateUpdateStudent.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '/students',
      name: 'students',
      component: Students
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: Contacts
    },
    {
      path: '/students/create-update',
      name: 'createUpdateStudent',
      component: CreateUpdateStudent
    },
    {
      path: '/students/create-update/:id',
      name: 'createUpdateStudentById',
      component: CreateUpdateStudent
    }
  ]
})

export default router
