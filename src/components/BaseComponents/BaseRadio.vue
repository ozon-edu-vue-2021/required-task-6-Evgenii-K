<template>
  <div class="form-radio">
    <div
      v-for="item in items"
      :key="item.name"
    >
      <input class="radio-button" type="radio" :id="item.title" v-model="pickedModel" :value="item.name">
      <label :for="item.title">{{item.title}}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseRadioButton',
  props: {
    items: {
      type: Array,
      default: () => []
    },
    picked: {
      type: String,
    }
  },
  data() {
    return {
      pickedModel: this.picked
    }
  },
  watch: {
    pickedModel() {
      this.$emit('picked', this.pickedModel)
    }
  }
}
</script>

<style scoped>
.form-radio {
  display: flex;
}
.radio-button {
  position: absolute;
  z-index: -1;
  opacity: 0;
  margin: 10px 0 0 7px;
}
.radio-button+label {
  position: relative;
  padding: 0 20px 0 35px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  color: #2c3e50;
}
.radio-button+label:before {
  content: '';
  position: absolute;
  top: -2px;
  left: 0;
  width: 17px;
  height: 17px;
  border: 1px solid #A4A4A4;
  border-radius: 50%;
}
.radio-button:checked+label:before {
  border: 5px solid #005bff;
  width: 10px;
  height: 10px;
}
</style>