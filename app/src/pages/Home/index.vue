<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Commend></Commend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from './ListContainer';
import Commend from './Commend';
import Rank from './Rank';
import Like from './Like';
import Floor from './Floor';
import Brand from './Brand';
import {mapState} from 'vuex';
export default {
  name: "Home",
  components:{
    ListContainer,
    Commend,
    Rank,
    Like,
    Floor,
    Brand
  },
  computed:{
    ...mapState('home',['floorList'])
  },
  mounted(){
    this.$store.dispatch('home/getFloorList')

    // 派发action获取用户信息
    // this.$store.dispatch('user/getUserInfo')
  }
};
</script>

<style>
</style>