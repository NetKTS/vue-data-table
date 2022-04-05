<template>
  <div v-if="currentTutorial" class="edit-form">
    <p class="headline">Edit Tutorial</p>
    <v-form ref="form">
      <v-text-field
        v-model="currentTutorial.title"
        label="Title"
      ></v-text-field>
      <v-text-field
        v-model="currentTutorial.description"
        label="description"
      ></v-text-field>
      <label><strong>Status:</strong></label>
      {{ currentTutorial.published ? "Published" : "Pending" }}
      <br />
      <v-btn
        v-if="currentTutorial.published"
        color="primary"
        small
        @click="updatePublished(false)"
      >
        UnPublish
      </v-btn>
      <v-btn v-else color="primary" small @click="updatePublished(true)">
        Publish
      </v-btn>
      <v-btn color="success" small @click="updateTutorial"> Update </v-btn>
      <v-btn color="error" small @click="deleteTurotial"> Delete </v-btn>
    </v-form>
    <p>{{ message }}</p>
  </div>
  <div v-else>
    <p>Please click on a Tutorial...</p>
  </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";
export default {
  name: "tutorial",
  data() {
    return {
      currentTutorial: null,
      message: "",
    };
  },
  methods: {
    getTutorial(id) {
      TutorialDataService.get(id) // //เรียกใช้ TutorialDataService.get(id) เขียนฟังก์ชัน get ด้วย
        .then((response) => {
          this.currentTutorial = response.data; // เอา data ขึ้นมาใส่ใน this.currentTutorial
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updatePublished(status) {
      var data = {
        id: this.currentTutorial.id,
        title: this.currentTutorial.title,
        description: this.currentTutorial.description,
        published: status,
      };
      TutorialDataService.update(this.currentTutorial.id, data) // เขียนหรือยัง?
        .then((response) => {
          this.currentTutorial.published = status;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateTutorial() {
      TutorialDataService.update(this.currentTutorial.id, this.currentTutorial)
        .then((response) => {
          console.log(response.data);
          this.message = "The tutorial was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async deleteTurotial(){
        await TutorialDataService.DeleteById(this.currentTutorial.id)
        this.message = "The tutorial was Deleted!"
    }
  },
  mounted() {
    this.message = "";
    this.getTutorial(this.$route.params.id); // เริ่มต้นทํางานที่นี่
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>