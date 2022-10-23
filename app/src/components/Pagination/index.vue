<template>
  <div class="pagination">
    <button :disabled="pageNo===1" @click="$emit('getPage',pageNo-1)">上一页</button>
    <button v-show="startNumAndEndNum.start>1" @click="$emit('getPage',1)">1</button>
    <button v-show="startNumAndEndNum.start>2">···</button>

    <button v-for="(page,index) in startNumAndEndNum.end" :key="index" v-show="page>=startNumAndEndNum.start" @click="$emit('getPage',page)" :class="{active:pageNo===page}">{{page}}</button>
    
    <button v-show="startNumAndEndNum.end<totalPages-1">···</button>
    <button v-show="startNumAndEndNum.end<totalPages" @click="$emit('getPage',totalPages)">{{totalPages}}</button>
    <button :disabled="pageNo===totalPages" @click="$emit('getPage',pageNo+1)">下一页</button>
    
    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props:['pageNo','totalPages','total','continues'],
    computed:{
      // 连续页码的起始页码和结束页码
      startNumAndEndNum(){
        let {pageNo,continues,totalPages}=this;
        let start = 0,end = 0;
        // 连续页码个数5【就是至少五页】，如果出现不正常现象【就是总页码没有五页】
        if(totalPages<continues){
          start=1;
          end=totalPages;
        }else{
          // 正常现象
          start=pageNo-parseInt(continues/2);
          end=pageNo+parseInt(continues/2);
          // 当start数字出现0|负数时，纠正
          if(start<1){
            start=1;
            end=continues;
          }
          // 当end数字大于总页码，纠正
          if(end>totalPages){
            end=totalPages;
            start=totalPages-continues+1;
          }
        }
        return {start,end}
      }
    }
  }
</script>

<style lang="less" scoped>
  .pagination {
    text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>
