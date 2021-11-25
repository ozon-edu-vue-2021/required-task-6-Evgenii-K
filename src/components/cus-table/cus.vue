<template>
  <div>
    <div
      v-for="slot in slots"
      :key="slot.prop"
    >
      <th>
        <!-- {{slot.scopedSlots && slot.scopedSlots.title ? slot.scopedSlots.title() : slot.title}} -->
      </th>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slots: []
    }
  },
  created() {
    this.slots = this.$slots.default.
      map(post => post = {...post.data.attrs, scopedSlots: post.data.scopedSlots})

    console.log(this.$slots.default);
  },
}
</script>

<style>

</style>