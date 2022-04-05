<template>
  <div class="submit-form mx-auto">
    <p>Add Tutorial</p>

    <div v-if="!submitted">
      <v-form ref="form">
        <v-text-field v-model="tutorial.title" label="Title"></v-text-field>
        <v-text-field
          v-model="tutorial.description"
          label="Description"
        ></v-text-field>
        <v-btn color="primary" @click="addTutotial">Submit</v-btn>
      </v-form>
    </div>

    <div v-else>
      <h1>Submitted success fully!</h1>
    </div>

  </div>
  
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";
export default {
  name: "add-tutorial",
  data() {
    return {
      tutorial: {
        id: "",
        title: "",
        description: "",
        published: false,
      },
      submitted: false,
    };
  },
  methods: {
    addTutotial() {
      var data = {
        title: this.tutorial.title,
        description: this.tutorial.description,
      };
      TutorialDataService.create(data) // อย่าลืมไปเขียน ฟังก์ชัน create ใน TutorialDataService
        .then((response) => {
          this.tutorial.id = response.data.id;
          console.log(response.data);
          this.submitted = true; // เมื่อเพิ่มข้อมูลสําเร็จ ให้ตัวแปร submitted เป็น true
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>