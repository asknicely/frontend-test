<script>
import axios from "axios";

export default {
  name: "Todo",
  data() {
    return {
      todos: [],
      todo: {},
      todoDescription: ""
    };
  },
  methods: {
    // Updates the dom by refreshing the contents of cart_items retrieved from the ajax api
    load() {
      axios({
        method: "GET",
        headers: { "Content-Type": "application/json" },
        url: "/todo",
        data: {}
      }).then(response => {
        if (response.status === 200) {
          this.todos = response.data;
        } else {
          console.warn(response);
        }
      });
    },
    getTodo(id) {
      axios({
        method: "GET",
        headers: { "Content-Type": "application/json" },
        url: `/todo/${id}`,
        data: {}
      }).then(response => {
        if (response.status === 200) {
          this.todo = response.data;
        } else {
          console.warn(response);
        }
      });
    },
    add() {
      let bodyFormData = new FormData();
      bodyFormData.set("description", this.todoDescription);
      axios({
        method: "POST",
        url: `${this.baseurl}/todo/add`,
        headers: { "Content-Type": "application/json" },
        data: bodyFormData
      }).then(response => {
        if (response.status === 200) {
          this.todoDescription = "";
          this.load();
        } else {
          console.warn(response);
        }
      });
    },
    complete(id) {
      axios({
        url: `${this.baseurl}/todo/complete/${id}`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: {}
      }).then(response => {
        if (response.status === 200) {
          this.$emit("update-todos");
        } else {
          console.warn(response);
        }
      });
    },
    remove(id) {
      axios.post(`${this.baseurl}/todo/delete/${id}`).then(response => {
        if (response.status === 200) {
          this.$emit("update-todos");
        } else {
          console.warn(response);
        }
      });
    }
  }
};
</script>
