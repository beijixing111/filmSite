<template>
  <span v-if="allfavNumber">{{ allfavNumber }}</span>
  <i class="fi fi-star fav " :class="[isFav ? 'fav-actived' : '']" @click="onFavorite"></i>
</template>

<script setup >
import { Dialog } from 'vant';
import { ref, computed } from 'vue'; 
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';

const store = useStore();
const router = useRouter();
const route = useRoute();

const props = defineProps({
  favId: Number,
  favFilmName: String,
  favNum: Number,
})

const favNumber = ref(props.favNum || 0); 

const getIndex = () => {
  // console.log(props.favId);
  let favoriteList = store.state.favoriteList;
  if(favoriteList.length === 0){
    return -1;
  }
  return favoriteList.findIndex(item => item.id === props.favId);
}

const isFav = computed(() => {
  let index = getIndex(); 
  return index > -1;
});

const allfavNumber = computed(() => {
  let index = getIndex();
  if(index > -1) { 
    return favNumber.value + 1; 
  } else { 
    return favNumber.value;
  }
})

const onFavorite = () => { 
  if(!store.getters.getUserIsLogin){
    Dialog.confirm({
      title: '提示',
      message: `未登录，前去登录？`,
      confirmButtonText: '去登录',
      confirmButtonColor: '#f46b84'
    }).then(() => {
      router.push({
        path: '/login',
        query: {
          redirectPath: route.path
        }
      });
    })
    return;
  }
  if(!isFav.value) { 
    store.dispatch('addFavorite', {
      id: props.favId,
      filmName: props.favFilmName,
    });
  } else {
    store.dispatch('removeFavorite', {
      id: props.favId,
      filmName: props.favFilmName
    });
  }
} 

</script>

<style lang="scss" scoped>
$favColor: #f46b84;

.fav{
  color: #ccc;
  font-size: 0.46rem;
  &.fav-actived{
    color: $favColor;
  }
}
span{
  color: #888;
  margin-right: 0.1rem;
  font-size: 0.32rem;
  margin-left: 0.2rem;
}
</style>