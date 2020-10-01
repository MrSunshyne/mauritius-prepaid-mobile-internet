<template>
  <div v-if="displayStats">
    <pre>
          {{ displayStats }}
        </pre
    >
  </div>
  <div v-else>loading..</div>
</template>

<script>
export default {
  data() {
    return {
      displayStats: "",
    };
  },
  mounted() {
    this.pullData();
  },
  methods: {
    async pullData() {
      const URL =
        "https://spreadsheets.google.com/feeds/list/1i1_6IOA4wdm5Cl-hXRf46Dkwqz5bMcN3KdFcaGahbV0/1/public/values?alt=json";

      let entry;
      try {
        const { feed } = await this.fetchJson(URL);
        entry = feed.entry;
      } catch (error) {
        throw new Error(
          "Error should be caught by Vue global error handler." + error
        );
      }

      const stats = this.extractData(entry);
      //   commit(SET_STATS, stats);
      this.displayStats = stats;
      return stats;
    },
    async fetchJson(url) {
      try {
        const response = await fetch(url);
        return await response.json();
      } catch (error) {
        const isJsonError =
          error.message.includes("Unexpected token") &&
          error.message.includes("in JSON at position");

        if (isJsonError) {
          return null;
        }

        throw new Error("Response is not JSON", url);
      }
    },
    extractObject(entry) {
      const fieldNameList = Object.keys(entry).filter((fieldName) =>
        fieldName.includes("gsx$")
      );

      const formattedObjet = {};
      fieldNameList.forEach((fieldName) => {
        const trimmedName = fieldName.replace("gsx$", "");
        formattedObjet[trimmedName] = entry[fieldName][`$t`];
      });

      return formattedObjet;
    },
    extractData(entries) {
      return entries.map(this.extractObject);
    },
  },
};
</script>
