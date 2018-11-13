<template>
    <div class="comp-box" :style="{width: width}">
      <div class="title">{{title}}</div>
      <div class="content">
        <slot></slot>
      </div>
    </div>
</template>

<script>
  export default {
    name: "CompBox",
    props: {
      title:{type:String},
      width:{type:String}
    }
  }
</script>

<style lang="scss" scoped>
.comp-box{
  padding:10px;
  margin: 5px;
  border:1px dashed #eaeaea;
  border-radius: 5px;
}
</style>
