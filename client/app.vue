<template>
    <div id="app">
        <div id="cover"></div>
        <div id="loading" v-show="loading">
          <loading></loading>
        </div>
        <Header></Header>
        <!-- <todo></todo> -->
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
        <Footer></Footer>
    </div>
</template>

<script>
import {
  mapState
  // mapGetters,
  // mapActions,
  // mapMutations
} from 'vuex'
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
import Loading from './components/loading/loading.vue'
// import Todo from './views/todo/todo.vue'

export default {
  metaInfo: {
    title: 'chu8ug\'s Todo App'
  },
  components: {
    Header,
    Footer,
    Loading
    // Todo
  },
  mounted () {
  },
  methods: {
    // ...mapActions(['updateCountAsync']),
    // ...mapMutations(['updateCount']),
    notify () {
      this.$notify({
        content: 'test $notify',
        btn: 'close'
      })
    }
  },
  computed: {
    ...mapState(['loading'])
    // ...mapState(['count']),
    // ...mapGetters(['fullName'])
  }
}
</script>

<style lang="stylus" scoped>
#app{
    position: absolute
    left 0
    top 0
    right 0
    bottom 0
}
#cover{
    position: absolute
    left 0
    top 0
    right 0
    bottom 0
    background-color #999
    opacity .8
    z-index -1
}
</style>
