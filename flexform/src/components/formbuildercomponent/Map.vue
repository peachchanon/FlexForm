<template>
  <div>
    <longdo-map :zoom="8" :lastView="false" :location="{ lon: longitude, lat: latitude }" class="map" :style="cssMap">
      <longdo-map-marker
          v-for="(item, i) in markers"
          :key="i"
          :location="item.location"
          :title="item.title"
          :detail="item.detail"
      />
    </longdo-map>
  </div>
</template>

<script>
import { LongdoMap, LongdoMapMarker } from 'longdo-map-vue'
LongdoMap.init({ apiKey: 'cc30d982a0eb82cff17794b8e41dde9b' })
import axios from 'axios'
export default {
  name: "Map.vue",
  components: {
    LongdoMap,
    LongdoMapMarker,
  },
  props: {
    mapHeight: {
      type: Number,
      default: 450
    },
    mapWidth: {
      type: Number,
      default: 100
    },
    pinDrag: {
      type: Boolean,
      default: true
    },
    longitude: {
      default: 100.300145
    },
    latitude: {
      default: 8.043749
    },
  },
  data() {
    return {
      markers: [
        {
          location: {lon: this.longitude, lat: this.latitude },
          title: "Your Location",
          detail: " "
        }
      ],
      allData: "",
      country:  "",
      province:  "",
      district:  "",
      subDistrict:  "",
      postcode:  "",
      address: ""
    }
  },
  mounted() {
    axios.get("https://api.longdo.com/map/services/address?lon=" + this.longitude + "&lat=" + this.latitude + "&key=cc30d982a0eb82cff17794b8e41dde9b")
        .then(response => {
          if(response.data) {
            this.allData = response.data
            this.country = response.data.country
            this.province = response.data.province
            this.district = response.data.district
            this.subDistrict = response.data.subdistrict
            this.postcode = response.data.postcode
            this.address = this.subDistrict + " " + this.district + " " + this.province +
                " " + this.country + " " + this.postcode + "\n" + this.longitude + "," + this.latitude
            this.markers[0].detail=this.address
            console.log(this.address)
          }
        }
        )
        .catch((err) => { console.log(err)})
  },
  methods: {
    
  },
  computed: {
    cssMap() {
      return {
        '--map-width': this.mapWidth + "%",
        '--map-height': this.mapHeight + "px"
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.map{
  /*position: relative;*/
  width: var(--map-width);
  height: var(--map-height);
}
</style>