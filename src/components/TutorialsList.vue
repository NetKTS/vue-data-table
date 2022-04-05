<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" md="8">
      <v-text-field v-model="title" label="Search by Title" @change="SearchTutorial(title)"></v-text-field>
    </v-col>
    <v-col cols="12" md="4">
      <v-btn small @click="SearchTutorial(title)"> Search </v-btn>
    </v-col>
    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Tutorials</v-card-title>
        <v-data-table
          :headers="headers"
          :items="tutorials"
          disable-pagination
          :hide-default-footer="true"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editTutorial(item.id)"
              >mdi-pencil</v-icon
            >
            <v-icon small @click="deleteTurotial(item.id)">mdi-delete</v-icon>
          </template></v-data-table
        ></v-card
      ></v-col
    ></v-row
  >
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";
export default {
  name: "tutorials-list",
  data() {
    return {
      tutorials: [],
      title: "",
      headers: [
        { text: "Title", align: "start", sortable: false, value: "title" },
        { text: "Description", value: "description", sortable: false },
        { text: "Status", value: "status", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    retrieveTutorials() {
      TutorialDataService.getAll()
        .then((response) => {
          this.tutorials = response.data.map(this.getDisplayTutorial);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveTutorials();
    },

    getDisplayTutorial(tutorial) {
      return {
        id: tutorial.id,
        title:
          tutorial.title.length > 30
            ? tutorial.title.substr(0, 30) + "..."
            : tutorial.title,
        description:
          tutorial.description.length > 30
            ? tutorial.description.substr(0, 30) + "..."
            : tutorial.description,
        status: tutorial.published ? "Published" : "Pending",
      };
    },
    async deleteTurotial(itemID) {
      console.log(itemID);
      await TutorialDataService.DeleteById(itemID);
      this.refreshList();
    },
    editTutorial(id) {
      this.$router.push({ name: "tutorial-details", params: { id: id } });
    },
    async SearchTutorial(title) {
      if (title) {
        var { data } = await TutorialDataService.findByTitle(title);
        this.tutorials = data.map(this.getDisplayTutorial);
      }else{
        this.refreshList();
      }
    },
  },
  mounted() {
    this.retrieveTutorials();
  },
};
</script>

<style>
</style>