<template>
  <v-app class="grey lighten-4">
    <Navbar/>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

import Navbar from '@/components/navigation/Navbar'
export default {
  name: 'App',
  components: {
    Navbar
  },
  data () {
    return {
      //
    }
  }
}
</script>

<style lang="stylus" scoped>
  .v-content{
    align-items: center
  }
</style>
