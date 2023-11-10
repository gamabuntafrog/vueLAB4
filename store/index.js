import { createStore } from 'vuex'

const initialStudents = [
  {
    id: '1',
    pib: 'Кириленко Ярослав Ярославович',
    image: 'https://cdn-icons-png.flaticon.com/512/6075/6075889.png',
    course: 1,
    category: 'Test category 1'
  },
  {
    id: '2',
    pib: 'Кириленко Владислав Владиславович',
    image: 'https://cdn-icons-png.flaticon.com/512/6075/6075889.png',
    course: 2,
    category: 'Test category 2'
  }
]

export default createStore({
  state() {
    return {
      students: []
    }
  },
  mutations: {
    setDataFromLocalStorage(state, students) {
      state.students = students
    },
    setDataToLocalStorage({ students }) {
      localStorage.setItem('students-vue', JSON.stringify(students))
    },
    addStudents(state, student) {
      state.students.push(student)
    },
    updateStudents(state, { student, index }) {
      state.students[index] = student
    },
    deleteStudents(state, {id}) {
      state.students = state.students.filter((el) => el.id !== id);
    }
  },
  actions: {
    initFromLocalStorage({ commit }) {
      const dataFromLocalStorage = localStorage.getItem('students-vue')

      commit(
        'setDataFromLocalStorage',
        dataFromLocalStorage ? JSON.parse(dataFromLocalStorage) : initialStudents
      )
    },
    addStudents({ commit }, student) {
      commit('addStudents', student)
      commit('setDataToLocalStorage')
    },
    updateStudents({ commit, state }, student) {
      if (!student) return

      const index = state.students.findIndex((el) => el.id === student.id)

      if (index > -1) {
        student.id = new Date()
        commit('updateStudents', { student, index })
        commit('setDataToLocalStorage')
      }
    },
    deleteStudents({ commit }, id) {
      commit('deleteStudents', {id});
      commit('setDataToLocalStorage');
    }
  },
  getters: {
    students: ({ students }) => students
  }
})
