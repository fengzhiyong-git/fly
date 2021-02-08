<template>
  <div class="container-wrapper">
      <Header />
      <Aside />
      <div class="main-container">
        <router-view />
      </div>
  </div>
  
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import Header from '@/Layout/Header.vue'
import Aside from '@/Layout/Aside.vue'
@Component({
  name: 'Home',
  components:{
      Header,
      Aside
  }
})
export default class Home extends Vue{

}
</script>
<style lang="scss" scoped>
.container-wrapper{
  width: 100%;
  height: 100%;
  .main-container{
    width: calc(100% -300px);
    height: calc(100% - 60px);
    margin-left: 300px;
    padding: 24px;
    box-sizing: border-box;
    overflow-y: auto;
  }
}

</style>
