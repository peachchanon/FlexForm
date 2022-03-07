<template>
  <StarRating :star="this.star" :disabled="this.disabled" :maxstars="this.maxstars" 
              :starsize="this.starsize" :hasresults="this.hasresults"
              :hasdescription="this.hasdescription" 
              :ratingdescription="this.ratingdescription"/>
</template>

<script>
import StarRating from 'awesome-vue-star-rating' // install npm install --save awesome-vue-star-rating
export default {
  components:{
    StarRating
  },
  props: {
    hasresults: Boolean,
    maxstars: Number,
    disabled: Boolean
  },
  data() {
    return {
      star: 5, // show started default rating star
      ratingdescription: [
        {
          text: 'Poor',
          class: 'star-poor'
        },
        {
          text: 'Below Average',
          class: 'star-belowAverage'
        },
        {
          text: 'Average',
          class: 'star-average'
        },
        {
          text: 'Good',
          class: 'star-good'
        },
        {
          text: 'Excellent',
          class: 'star-excellent'
        }
      ],
      //hasresults: true,
      hasdescription: false,
      starsize: 'lg', //[xs,lg,1x,2x,3x,4x,5x,6x,7x,8x,9x,10x],
      //maxstars: 6,
      //disabled: false
    }
  }
}
</script>

<style lang="scss" scoped>
/*.star {
  color: mediumpurple;
}
.star.active {
  color: green;
}
.list, .list.disabled {
  &:hover {
    .star {
      color: blue !important;
    }
    .star.active {
      color: red;
    }
  }
}*/
</style>