module.exports = {
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "vue"],
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.vue$": "@vue/vue3-jest",
  },
};
