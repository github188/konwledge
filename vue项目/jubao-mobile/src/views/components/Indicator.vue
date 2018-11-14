<template>
  <div class="mt-indicator">
    <div class="mt-indicator-wrapper" style="padding: 15px;">
      <span class="mt-indicator-spin">
        <div class="mt-spinner-snake" :class="spinnerType"></div>
      </span>
      <span class="mt-indicator-text"></span>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      text:"",
      spinnerType:""
    },
    data() {
      return {}
    },
    created() {

    },
    methods: {

    }
  }
</script>

<style lang="scss" scoped>
  .mt-indicator {
    -webkit-transition: opacity .2s linear;
    transition: opacity .2s linear;
    .mt-indicator-wrapper {
      top: 50%;
      left: 50%;
      position: fixed;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      border-radius: 5px;
      background: rgba(0, 0, 0, 0.7);
      color: white;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      text-align: center;
      .mt-indicator-spin {
        display: inline-block;
        text-align: center;
        .mt-spinner-snake {
          -webkit-animation: mt-spinner-rotate 0.8s infinite linear;
          animation: mt-spinner-rotate 0.8s infinite linear;
          border: 4px solid transparent;

          border-radius: 50%;
          border-top-color: rgb(204, 204, 204);
          border-left-color: rgb(204, 204, 204);
          border-bottom-color: rgb(204, 204, 204);
          height: 32px;
          width: 32px;
        }
      }
      .mt-indicator-text {
        display: block;
        color: #fff;
        text-align: center;
        margin-top: 10px;
        font-size: 16px;
      }
    }
    .mt-indicator-mask {
      top: 0;
      left: 0;
      position: fixed;
      width: 100%;
      height: 100%;
      opacity: 0;
      background: transparent;
    }
  }

</style>
