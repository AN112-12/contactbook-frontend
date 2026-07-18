<template>
  <div class="page row">
    <div class="col-md-10">
      <InputSearch v-model="searchText" />
    </div>
    <div class="mt-3 col-md-6">
      <h4>
        Danh bạ
        <i class="fas fa-address-book"></i>
      </h4>

      <div class="mb-3">
        <label class="mb-1"><strong>Lọc theo sở thích:</strong></label>
        <div class="hobby-filter-list">
          <div class="form-check" v-for="hobby in hobbyOptions" :key="hobby">
            <input
              type="checkbox"
              class="form-check-input"
              :id="'filter-' + hobby"
              :value="hobby"
              v-model="selectedHobbies"
            />
            <label class="form-check-label" :for="'filter-' + hobby">
              {{ hobby }}
            </label>
          </div>
        </div>
      </div>

      <ContactList
        v-if="filteredContactsCount > 0"
        :contacts="filteredContacts"
        v-model:activeIndex="activeIndex"
      />
      <p v-else>Không có liên hệ nào.</p>
      <div class="mt-3 row justify-content-around align-items-center">
        <button class="btn btn-sm btn-primary" @click="refreshList()">
          <i class="fas fa-redo"></i> Làm mới
        </button>
        <button class="btn btn-sm btn-success" @click="goToAddContact">
          <i class="fas fa-plus"></i> Thêm mới
        </button>
        <button class="btn btn-sm btn-danger" @click="removeAllContacts">
          <i class="fas fa-trash"></i> Xóa tất cả
        </button>
      </div>
    </div>
    <div class="mt-3 col-md-6">
      <div v-if="activeContact">
        <h4>
          Chi tiết Liên hệ
          <i class="fas fa-address-card"></i>
        </h4>
        <ContactCard :contact="activeContact" />
    <router-link
        :to="{
        name: 'contact.edit',
        params: { id: activeContact._id },
    }"
>
    <span class="mt-2 badge badge-warning">
    <i class="fas fa-edit"></i> Hiệu chỉnh</span
    >
</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import ContactCard from "@/components/ContactCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import ContactList from "@/components/ContactList.vue";
import ContactService from "@/services/contact.service";
export default {
  components: {
    ContactCard,
    InputSearch,
    ContactList,
  },
  data() {
    return {
      contacts: [],
      activeIndex: -1,
      searchText: "",
      // Danh sách sở thích dùng để lọc - đang chọn sở thích nào thì lọc theo sở thích đó
      hobbyOptions: [
        "Đọc sách",
        "Du lịch",
        "Thể thao",
        "Âm nhạc",
        "Nấu ăn",
        "Chơi game",
        "Xem phim",
        "Nhiếp ảnh",
      ],
      selectedHobbies: [],
    };
  },
  watch: {
    // Giám sát các thay đổi của biến searchText.
    // Bỏ chọn phần tử đang được chọn trong danh sách.
    searchText() {
      this.activeIndex = -1;
    },
    selectedHobbies() {
      this.activeIndex = -1;
    },
  },
  computed: {
    // Chuyển các đối tượng contact thành chuỗi để tiện cho tìm kiếm.
    contactStrings() {
      return this.contacts.map((contact) => {
        const { name, email, address, phone } = contact;
        return [name, email, address, phone].join("");
      });
    },
    // Trả về các contact có chứa thông tin cần tìm kiếm, có áp dụng lọc theo sở thích.
    // Liên hệ được giữ lại nếu có ÍT NHẤT MỘT sở thích trùng với sở thích đang chọn lọc.
    filteredContacts() {
      let result = this.contacts;

      if (this.selectedHobbies.length > 0) {
        result = result.filter((contact) => {
          const contactHobbies = contact.hobbies || [];
          return this.selectedHobbies.some((h) => contactHobbies.includes(h));
        });
      }

      if (!this.searchText) return result;

      return result.filter((contact) => {
        const { name, email, address, phone } = contact;
        const contactString = [name, email, address, phone].join("");
        return contactString.includes(this.searchText);
      });
    },
    activeContact() {
      if (this.activeIndex < 0) return null;
      return this.filteredContacts[this.activeIndex];
    },
    filteredContactsCount() {
      return this.filteredContacts.length;
    },
  },
  methods: {
    async retrieveContacts() {
      try {
        this.contacts = await ContactService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveContacts();
      this.activeIndex = -1;
    },
    async removeAllContacts() {
      if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
        try {
          await ContactService.deleteAll();
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },
    goToAddContact() {
      this.$router.push({ name: "contact.add" });
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>
<style scoped>
.page {
  text-align: left;
  max-width: 750px;
}
.hobby-filter-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px 12px;
}
</style>