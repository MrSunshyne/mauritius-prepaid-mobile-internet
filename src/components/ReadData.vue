<template>
  <div v-if="stats">{{ stats }}</div>
  <div v-else>loading..</div>
</template>

<script>
export default {
  data() {
    return {
      stats: "",
    };
  },
  mounted() {
    this.pullData();
  },
  methods: {
    async pullData() {
      //https://spreadsheets.google.com/feeds/list/1KjeUZEUa-xwjbER3o9RL18lvrn6G3TDamWB8B8hqlQQ/3/public/values?alt=json
      //https://docs.google.com/spreadsheets/d/e/2PACX-1vRBpFZQHWWZr24mtUavE7hoGytz98QLa4q5pQPnfPezLXWIfGzYvGFrtWVLDDp6J7bfm5nP1XZwB6xD/pubhtml
      //https://docs.google.com/spreadsheets/d/1i1_6IOA4wdm5Cl-hXRf46Dkwqz5bMcN3KdFcaGahbV0/edit?usp=sharing
      //

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
      this.stats = stats;
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
