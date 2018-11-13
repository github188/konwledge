<template>
  <div class="current-task">
    <iframe src="/static/model/channel/new_viewer_jin/model/channel/page.html" class="iframe"></iframe>
  </div>
</template>

<script>
  export default {
    name: 'CurrentTask'
  }
</script>

<style lang="scss" scoped>
  .current-task{
    box-sizing: border-box;
    padding-left: 224px;
    min-height:824px;
    height:100vh;
    padding-top:76px;
    margin-top:-76px;
    background: #000428;
  }
.iframe{
  width:100%;height:100%;
}
</style>
