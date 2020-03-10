<template>
  <div>
    <div class="btnDiv" @click="toggleButton">
      <img :src="$withBase('/chat.png')" width="32px" height="32px" ></img>
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
      >
      </iframe>
    </div>
  </div>
  
</template>

<script>
export default {
  name: "floatIframe",
  data() {
    return {
      show: false
    };
  },
  props: {
    url: {
      default: ""
    }
  },
  methods: {
    toggleButton() {
      this.show = !this.show;
    }
  }
};
</script>

<style scoped>
.btnDiv {
  position: fixed; 
  right: 2%;
  bottom: 10%; 
  z-index: 11;
  display: flex; 
  flex-direction: column;
  justify-content: center; 
  align-items: center;
  width:32;
  height:32;
  radius:16;
}
</style>