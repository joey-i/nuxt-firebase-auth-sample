<template>
  <v-app>
    <v-container>
      <v-row wrap justify="center" align="center">
        <v-main>
          <v-container>
            <nuxt />
          </v-container>
        </v-main>
      </v-row>
      <v-footer app>
        <span>&copy; {{ new Date().getFullYear() }}</span>
      </v-footer>
    </v-container>
  </v-app>
</template>
