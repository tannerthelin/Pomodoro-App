<template>
  <v-container fluid class="text-center">
    <h3 class="text-center">Hi there!</h3>
    <br>
    <h1 class="text-center">
      You've completed <span class="green-text">{{this.$store.state.totalPomodoros}}</span> pomodoro(s).
      <br>
      The current timer has
      <span id="minutes" class="grey-text">{{ getMinutes() }}</span>
      <span id="middle" class="grey-text">:</span>
      <span id="seconds" class="grey-text">{{ getSeconds() }}</span> 
      left.
    </h1>

    <br>

    <div id="buttons" width="200px">
      <!-- PLAY BUTTON -->
      <v-btn class="ma-2" outlined medium fab color="#A4A4A4" v-if="!timer" @click="playPause()">
        <v-icon>mdi-play</v-icon>
      </v-btn>
      <!-- PAUSE BUTTON -->
      <v-btn class="ma-2" outlined medium fab color="#A4A4A4" v-if="timer" @click="pause()">
        <v-icon>mdi-pause</v-icon>
      </v-btn>
      <!-- RESET BUTTON -->
      <v-btn class="ma-2" outlined medium fab color="#A4A4A4" @click="reset()">
        <v-icon>mdi-restart</v-icon>
      </v-btn>
      <!-- COMPLETE BUTTON -->
      <v-btn class="ma-2" outlined x-large rounded color="#A4A4A4" @click="complete()">
        Complete Pomodoro<v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </div>

    <br><br>

    <v-row>
      <v-col cols="12">
        
        <!-- ADD NEW DIALOGUE BOX -->
        

        <div class="data-container">


          <v-dialog v-model="dialog" max-width="500px" persistent>
          
          <template v-slot:activator="{ on }">
            <div class="add-button-container">
            <button class="add-button" v-on="on" width="100%"><v-icon color="#A4A4A4" small class="mb-1 mr-2">mdi-plus</v-icon>Add a new pomodoro</button>
            </div>
          </template>


          <v-card>
            <v-card-title>
              <span class="headline">New Task</span>
            </v-card-title>

            <v-card-text>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-textarea
                  solo
                    v-model="editedItem.todo"
                    label="Pomodoro"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" @click="save" dark>Update List</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

          <v-data-table
            :headers="headers"
            hide-default-header
            hide-default-footer
            :items="pomos"
            :sort-by="['approval']"
            :sort-desc="[true, false]"
            class="elevation-0 my-0 pl-0 ml-4 mr-4"
          >
            <template v-slot:item.checkbox="{ item }">
              <v-btn class="ma-2" outlined medium rounded color="#42C395" @click="playPause(item)">
              Start
              </v-btn>
            </template>

            <template v-slot:item.action="{ item }">
              <v-icon
                medium
                class="mr-5"
                @click="editItem(item)"
                color="#A4A4A4"
              >
                mdi-pencil-outline
              </v-icon>
              <v-icon medium @click="deleteItem(item)" color="#A4A4A4">
                mdi-delete-outline
              </v-icon>
            </template>
          </v-data-table>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    defaultTime: 60 * 25,
    defaultBreak: 60 * 5,
    pomodoro: true,
    longBreak: 60 * 20,
    break: false,
    breakStart: false,
    pomodoroCount: 0,
    time: 0,
    completeTime: 0,
    timer: null,
    pomos: [],
    editedIndex: -1,
    dateTime: null,
    headers: [
      { text: "Start Task", value: `checkbox`, sortable: false },
      { text: "Todo", value: "todo", sortable: false },
      // { text: "Pomodoro's", value: "count", sortable: false },
      { text: "Actions", value: "action", sortable: false }
    ],
    editedItem: {
      todo: "",
      count: 0
    },
    defaultItem: {
      todo: "",
      count: 0
    }
  }),
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  created() {
    this.initialize();
    this.time = this.defaultTime;
  },
  methods: {
    formatNumber(num) {
      return (num < 10 ? "0" : "") + num.toString();
    },
    getMinutes() {
      return this.formatNumber(Math.floor(this.time / 60));
    },
    getSeconds() {
      return this.formatNumber(this.time % 60);
    },
    getType() {
      return this.pomodoro ? "Task" : "Break";
    },
    playPause(item) {
      // console.log(`Count: ${item.count} | ID: ${item}`)
      // console.log(item)
      this.$store.state.activePomo = this.pomos.indexOf(item)
      console.log(this.$store.state.activePomo)
      if (!this.timer) {
        this.play(item.count);
      } else {
        this.pause();
      }
    },
    play() {
      if (this.time <= 0) this.time = this.defaultTime;
      this.timer = setInterval(() => {
        this.time -= 1;
        if (this.time <= 0) this.playPause();
      }, 1000);
    },
    pause() {
      clearInterval(this.timer);
      this.timer = null;
    },
    reset() {
      !this.pomodoro
        ? (this.time = this.defaultBreak)
        : (this.time = this.defaultTime)
        this.playPause();
    },
    complete() {
      this.pomodoro = !this.pomodoro;
      if(!this.pomodoro) {
        this.$store.state.pomodoroCount++
        this.$store.state.totalPomodoros++
        this.$store.state.pomos[`${this.$store.state.activePomo}`].count++
      }
      if (this.$store.state.pomodoroCount === 4) {
        this.time = 60 * 20;
        this.$store.state.pomodoroCount = 0;
      } else {
        this.pomodoro
          ? (this.time = this.defaultTime)
          : (this.time = this.defaultBreak)
      }
      this.pause()
    },
    getPlayState() {
      return !!this.timer;
    },
    // get data from the store
    initialize() {
      this.pomos = this.$store.state.pomos
    },
    editItem(item) {
      this.editedIndex = this.pomos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.pomos.indexOf(item);
      confirm("Are you sure you want to delete this task?") &&
        this.pomos.splice(index, 1);
    },
    addLabel(label) {
      this.item.label.push(label);
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.pomos[this.editedIndex], this.editedItem);
      } else {
        this.pomos.push(this.editedItem);
      }
      this.close();
    },
  }
};
</script>

<style>
.v-data-table-header {
  background-color: #666!important;
}
.v-data-table-header span {
  color: rgb(233, 233, 233)!important;
}

.v-data-table {
  background-color: #F3F3F3;
  border: 1px solid rgba(0,0,0, 0.12);
  
}

.data-container {
  max-width: 1000px;
  margin: auto;
  font-family: 'Apercu' !important;
  font-weight: 300;
}

.data-container tr .text-start {
  font-size: 16px;
  padding: 6px 0px;
}

.add-button {
  color: #A4A4A4;
  font-size: 18px;
  background-color: #F3F3F3;
  border: 1px solid rgba(0,0,0, 0.12); 
  border-bottom: 0px;
  border-radius: 10px 10px 0px  0px ;
  height: 60px;
  width: 100%;  
}

.add-button:hover {
  background-color: #F0F0F0;
  color: #969696;
}

.add-button:focus {
  outline: none;
}

.add-button-container {
  padding: 0px 16px;  
}
</style>
