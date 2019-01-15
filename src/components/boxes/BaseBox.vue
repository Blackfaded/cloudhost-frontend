<template>
  <div class="box">
    <slot name="header"></slot>

    <div class="boxBody"><slot name="body"></slot></div>

    <slot name="footer"></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.box {
  color: #000;
  margin: 10px 0;
  background-color: #fff;
  box-shadow: 10px 11px 59px 0px rgba(0, 0, 0, 0.75);
  border-radius: 5px;
  & > * {
    padding: 15px;
  }
  &Body {
    max-height: 500px;
    overflow-y: auto;
    border-top: 1px solid rgb(202, 202, 202);
    border-bottom: 1px solid rgb(202, 202, 202);
  }
}
</style>
