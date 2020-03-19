<template>
  <div>
    <div class="g-container" @click="toggleButton">
      <div class="g-box">OPEN CHAT</div>
    </div>

    <div
      style="position: fixed; right: 10px; top: 10%; z-index: 10; display: flex; flex-direction: column; justify-content: center; align-items: center"
    >
      <iframe
        id="iframe"
        style="border: 1px solid antiquewhite; border-radius: 20px"
        :src="url"
        height="568"
        width="316"
        v-show="show"
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: 'floatIframe',
  data() {
    return {
      show: false
    }
  },
  props: {
    url: {
      default: ''
    }
  },
  methods: {
    toggleButton() {
      this.show = !this.show
    }
  }
}
</script>

<style scoped>
.g-container {
  position: fixed;
  display: flex;
  right: 2%;
  bottom: 0;
  z-index: 11;
  width: 100px;
  height: 30px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: #35bc98;
}

.g-box {
  margin: auto;
  color: #cdf6ee;
  text-shadow: 3px 3px 2px #999;
  text-align: center;
}
</style>