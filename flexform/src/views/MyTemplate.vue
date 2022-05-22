<template>
  <div class="tw-w-full tw-h-full tw-flex tw-flex-row tw-justify-center md:tw-items-center tw-items-start bg-grey1">
    <div class="box__style radius12px bg-white base-shadow base-padding tw-w-full">
      <div class="tw-flex tw-flex-row">
        <base-button-back :callback="PreviousPage"></base-button-back>
        <div class="tw-ml-2 tw-flex tw-flex-row tw-items-center tw-flex-wrap">
          <Icon class="icon blue10 tw-mr-1.5" icon="heroicons-outline:folder"/>
          <span class="semibold24 blue10">Ticket Template</span>
        </div>
      </div>
      <div class="tw-my-4 tw-mx-4">
        <SearchBar placeholder="Search By Ticket Name" @callBackString="formNameInput"></SearchBar>
      </div>
      <div class="scroller">
      <div v-for="FormData in filteredList" :key="FormData.formId">
        <div v-if="FormData.useTemplate === true && FormData.ticketId ===''">
            <div class="tw-ml-3 tw-my-3">
              <div class="bg-white base-padding base-shadow radius12px tw-flex tw-flex-row tw-items-start tw-justify-between tw-w-full">
                <div class="tw-flex tw-flex-row">
                  <div class="base-padding radius12px" style="height: fit-content">
                    <Icon class="semibold32 icon blue10" icon="heroicons-outline:folder"/>
                  </div>
                  <div class="tw-flex tw-flex-col tw-items-start base-padding radius12px" style="height: fit-content">
                    <div class=" tw-truncate" style="width: 100%; max-width: 220px;">
                    <label class="medium16 blue10">{{ FormData.formName }}</label>
                    </div>
                  </div>
                </div>
                <div class="tw-flex tw-flex-row tw-mx-2">
<!--                  <div class="tw-mr-2">-->
<!--                    <div class="choose-delete tw-flex tw-flex-row tw-items-center tw-ml-2 medium16">-->
<!--                      <Icon class="semibold24 icon " icon="heroicons-outline:trash"/>-->
<!--                      <label class="tw-mt-0.5 tw-mx-3 tw-cursor-pointer semibold16 ">Delete</label>-->
<!--                    </div>-->
<!--                  </div>-->
                  <!--                <div class="tw-mr-2">-->
                  <!--                  <base-button-blue-->
                  <!--                      buttonID="buttonPreview"-->
                  <!--                      buttonText="Preview"-->
                  <!--                      buttonIcon="heroicons-outline:eye"-->
                  <!--                  ></base-button-blue>-->
                  <!--                </div>-->
                  <div class="button-usetemplate tw-flex tw-flex-row tw-items-center tw-ml-2 medium16" @click="SelectTicketTemplate(FormData.formId)">
                    <span class="tw-mt-0.5 tw-mr-3 tw-ml-2" >Use Template</span>
                  </div>
                </div>
              </div>
            </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue2/dist/iconify"
import {mapActions, mapGetters} from "vuex"
import BaseButtonBack from "@/components/BaseButtonBack"
import SearchBar from "@/components/SearchBar";
// import BaseButtonBlue from "@/components/BaseButtonBlue";
import axios from "axios";

export default {
  name: "MyTemplate.vue",
  components: {
    Icon,
    BaseButtonBack,
    SearchBar,
    // BaseButtonBlue
  },
  data() {
    return {
      ShowContent: true,
      formNameSearch: '',
      FormData: [],
    }
  },
  watch: {
    windowResize () {
      this.ShowContent = window.innerWidth >= 1440
    }
  },
  computed: {
    ...mapGetters(['windowResize']),
    filteredList: function () {
      return this.FormData.filter(FormData =>
          FormData.formName.toLowerCase().match(this.formNameSearch.toLowerCase())
      );
    },
  },
  async mounted () {
    window.onresize = () => {
      this.flapWindowResize()
    }
    this.ShowContent = window.innerWidth >= 1440
    await axios.get(process.env.VUE_APP_API_URL + '/api/Flexform/AllForm')
        .then(response => {
          if(response.status===200 && response.data) {
            // this.FormData = response.data[1]["createdByUser"]
            this.FormData = response.data;
            //console.log(response.status)
            //console.log(this.FormData)
          }
        })
        .catch(error => {
          // this.errors.push(error)
          console.log(error)
        })
  },
  methods: {
    ...mapActions(['flapWindowResize']),
    PreviousPage() {
      this.$router.push('/form')
    },
    formNameInput(input){
      this.formNameSearch = input
    },
    async SelectTicketTemplate(string){
      this.ClickedFormId = string
      //console.log("clicked for id: " + this.ClickedFormId)
      this.$router.push({
        name: 'Builder', // ไปหน้าที่ทำ ticket
        params: { ClickedForm: this.ClickedFormId}})
    },
  }
}
</script>

<style lang="scss" scoped>
.icon{
  font-size: 2rem;
}
@media only screen and (max-width: 767px){
  .box__style {
    height: 100%;
    max-height: 736px;
  }
}
@media only screen and (min-width: 768px) {
  .box__style {
    width: 100%;
    max-width: 1024px;
    height: 100%;
    max-height: 560px;
  }
}
.choose-delete{
  color: $red5;
  padding: 0.75rem;
  transition: all .1s ease-in;
  border-radius: 10px;
  margin: 0.25rem 0;
  cursor: pointer;
  &:hover{
    color: white;
    background-color: $red5;
  }
}
.button-usetemplate {
  color: white;
  background-color: $green5;
  padding: 0.75rem;
  transition: all .1s ease-in;
  border-radius: 12px;
  margin: 0.25rem 0;
  cursor: pointer;
  box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.1);
  &:hover{
    color: white;
    background-color: $green3;
  }
}
.scroller{
  width: 100%;
  //height: 420px;
  overflow-y: scroll;
  scrollbar-color: rebeccapurple green;
  scrollbar-width: thin;
}
</style>