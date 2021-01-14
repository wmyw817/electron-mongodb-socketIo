<template>
<div class="bottom-setting">bottom setting</div>
</template>

<script>
export default {
  name: 'BottomSetting'
}
</script>

<style lang="scss" scoped>
@import "@/styles/index";
.bottom-setting {
  grid-column: 1/3;
  border-top: 1px dotted $border-color;
}
</style>
