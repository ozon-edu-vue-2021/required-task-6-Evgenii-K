<template>
  <div>  
    <div>
      <label :for="id" class="base-input__label">
        {{ label }}
      </label>
      <input
        :id="id"
        :class="ifError"
        :type="type"
        :value="value"
        @input="$emit('input', $event.target.value)"
        :readonly="readonly"
        :max="max"
      />
    </div>
    <span class="base-input__span">{{error}}</span>
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    id: {
      type: String,
      require
    },
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String,
      default: ''
    },
    readonly: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    },
    max: {
      type: String,
      default: 'text'
    }
  },
  computed: {
    ifError() {
      return ['base-input', {
        'base-input__error' : this.error
      }]
    }
  },
}
</script>

<style scoped>
.base-input {
  background-color: #fff;
  width: 100%;
  border: 2px solid #dce0e6;
  border-radius: 5px;
  padding: 0px 10px;
  margin-top: 10px;
  font-size: 16px;
  height: 40px;
}
.base-input:focus-visible {
  border-color: #2459f6;
  outline: 0px solid #2459f6;
}
.base-input:active {
  border-color: #2459f6;
}
.base-input__label {
  color: #8a99a9;
}
.base-input__error {
  border-color: red;
}
.base-input__span {
  color: red;
  position: absolute;
}
</style>