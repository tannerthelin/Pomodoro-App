<template>
  <v-app>
    <Header />
    <v-content>
      <Main class="ml-auto mr-auto"/>
    </v-content>
    <br><br>

    <v-footer padless>
      <v-col
        class="text-center"
        cols="12"
      >
        Copyright <a id="footer-link" href="https://www.tannerthelin.com">Tanner Thelin</a>, 2020
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import Main from './components/Main';
import Header from './components/Header';

export default {
  name: 'App',
  computed: {
  },

  components: {
    Main,
    Header
  },

  data: () => ({
    icons: [
        {icon: 'mdi-github', color: '', to: 'https://github.com/CobyYates/Pomodoro_App'},
        {icon: 'mdi-at', color: '', to: 'http://coberapps.com'},
        {icon: 'mdi-linkedin', color: '', to: 'https://www.linkedin.com/in/coby-yates/'},
        {icon: 'mdi-delete', color: '', to: ''},
      ],
  }),
  methods: {
  }
};
</script>

<style>
  @font-face {
  font-family: "Apercu";
  src: url("./assets/fonts/Apercu.woff") format("woff")
  } 

  @font-face {
  font-family: "Apercu Medium";
  src: url("./assets/fonts/Apercu-Medium.woff") format("woff")
  } 

  body {
    font-family: 'Apercu', sans-serif;
  }

  h1 {
    font-family: 'Apercu', sans-serif;
    font-weight: 300;
    color: #202020;
  }

  h3 {
    font-family: 'Apercu', sans-serif;
    text-transform: uppercase;
    font-size: 16px;
    letter-spacing: 2px;
    color: #42C395;
  }

  .green-text {
    color: #42C395;
  }

  .grey-text {
    color: #A4A4A4;
  }

  #footer-link {
    color: #42C395;
  }

</style>