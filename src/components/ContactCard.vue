<script>
export default {
  props: {
    contact: { type: Object, required: true },
  },
};
</script>
<template>
  <div>
    <div class="p-1">
      <strong>Tên:</strong>
      {{ contact.name }}
    </div>
    <div class="p-1">
      <strong>E-mail:</strong>
      {{ contact.email }}
    </div>
    <div class="p-1">
      <strong>Địa chỉ:</strong>
      {{ contact.address }}
    </div>
    <div class="p-1">
      <strong>Điện thoại:</strong>
      {{ contact.phone }}
    </div>
    <div class="p-1">
      <strong>Sở thích:&nbsp;</strong>
      <span v-if="contact.hobbies && contact.hobbies.length > 0">
        <span
          v-for="hobby in contact.hobbies"
          :key="hobby"
          class="badge badge-info mr-1"
        >
          {{ hobby }}
        </span>
      </span>
      <span v-else class="text-muted">Chưa có sở thích nào.</span>
    </div>
  </div>
</template>