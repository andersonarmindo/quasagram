<template>
  <q-page class="constrain 1-pa-md">
    <div class="row row q-col-gutter-lg">
      <div class="col-12 col-sm-8">
        <template v-if="!loadingPost && posts.length">
          <q-card
            v-for="post in posts"
            :key="post.id"
            class="card-post q-mb-md"
            flat
            bordered
          >
            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <img src="../../public/img/anderson.jpg" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-bold">_andersonarmindo</q-item-label>
                <q-item-label caption> {{ post.location }} </q-item-label>
              </q-item-section>
            </q-item>

            <q-separator />
            <q-img :src="post.imageUrl" />

            <q-card-section>
              <div class="text-h6">{{ post.caption }}</div>
              <div class="text-caption text-grey">
                {{ post.date | niceDate }}
              </div>
            </q-card-section>
          </q-card>
        </template>

        <template v-else-if="!loadingPost && !posts.length">
          <h5 class="text-center text-grey">Sem postagens, ainda...</h5>
        </template>
        <template v-else>
          <q-card flat bordered>
            <q-item>
              <q-item-section avatar>
                <q-skeleton type="QAvatar" animation="fade" size="40px" />
              </q-item-section>

              <q-item-section>
                <q-item-label>
                  <q-skeleton type="text" animation="fade" />
                </q-item-label>
                <q-item-label caption>
                  <q-skeleton type="text" animation="fade" />
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-skeleton height="200px" square animation="fade" />

            <q-card-section>
              <q-skeleton type="text" class="text-subtitle2" animation="fade" />
              <q-skeleton
                type="text"
                width="50%"
                class="text-subtitle2"
                animation="fade"
              />
            </q-card-section>
          </q-card>
        </template>
      </div>
      <div class="col-4 large-screen-only">
        <q-item class="fixed">
          <q-item-section avatar>
            <q-avatar size="48px">
              <img src="../../public/img/anderson.jpg" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-bold">_andersonarmindo</q-item-label>
            <q-item-label caption> Anderson Armindo </q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </div>
  </q-page>
</template>

<script>
import { date } from "quasar";
export default {
  name: "PageHome",

  data() {
    return {
      posts: [],
      loadingPost: false,
    };
  },
  methods: {
    getPosts() {
      this.loadingPost = true;

      this.$axios
        .get("http://https://backend-quasagram.onrender.com:3000/posts")
        .then((response) => {
          this.posts = response.data;
          this.loadingPost = false;
        })
        .catch((err) => {
          this.$q.dialog({
            title: "Erro",
            message: "Não foi possível baixar publicações",
          });
          this.loadingPost = false;
        });
    },
  },
  filters: {
    niceDate(value) {
      return date.formatDate(value, "D MMMM HH:mm");
    },
  },
  created() {
    this.getPosts();
  },
};
</script>

<style lang="sass">
.card-post
  .q-img
    min-height: 200px
</style>
