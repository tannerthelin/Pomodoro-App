import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pomodoroCount: 0,
    totalPomodoros: 0,
    activePomo: null,
    pomos: [
      {
        todo: "Work on Pomodoro App",
        count: 0,
        complete: false
      },
      {
        todo:
          "Design first version of personal portfolio.",
        count: 0,
        complete: false
      },
      {
        todo: "Play Animal Crossing",
        count: 0,
        complete: false
      },
      {
        todo: "Develop first version of personal portfolio (Webflow)",
        count: 0,
        complete: false
      },
      {
        todo:
          "Write speech for graduation ceremonies",
        count: 0,
        complete: false
      },
      {
        todo:
          "Write the first chapter of my novel",
        count: 0,
        complete: false
      },
    ]
  }
});
