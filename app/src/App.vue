<template>
  <div>
    <MyHeader />
    <router-view></router-view>
    <MyFooter v-show="$route.meta.isShow"></MyFooter>
  </div>
</template>

<script>
import MyHeader from "./components/MyHeader";
import MyFooter from "./components/MyFooter";
import 'swiper/css/swiper.css';
export default {
  name: "App",
  components: {
    MyHeader,
    MyFooter,
  },
  mounted(){
    // 在store里面给服务器发请求获取三级列表数据
     this.$store.dispatch("home/categoryList");
  }
};
</script>

<style>
</style>
