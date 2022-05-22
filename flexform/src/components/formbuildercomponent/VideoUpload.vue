<template>
  <div>
    <base-button
        buttonID="buttonSave"
        buttonText="Video"
        buttonTextColor="white"
        buttonBgColor="bg-green5"
        :callback="doButton"
    >
    </base-button>

    <transition name="theme-modal-fade" v-if="UploadVideoModal">
      <div class="theme-modal-backdrop">
        <div class="theme-modal">
          <header class="tw-flex tw-justify-between base-padding tw-relative tw-items-center">
            <div class="tw-flex">
              <Icon class="icon-upload semibold24 tw-mr-2 tw-mt-1 blue8" icon="bi:person-video"/>
              <span class="semibold24 blue8">Video</span>
            </div>
            <div class="button-close tw-flex tw-flex-col tw-items-center medium16 tw-absolute tw-top-0 tw-right-0"
                 style="width: fit-content" @click="doClose">
              <Icon class="icon semibold24" icon="heroicons-outline:x"/>
            </div>
          </header>
          <div class="tw-mb-2.5">
            <BaseTextInput
                type="text"
                placeholder="Enter a YouTube URL"
                @callBackString="inputUrl"
            >
            </BaseTextInput>
          </div>
          <div v-if="youtubeURL === ''">
            <BaseButton
                buttonID="buttonUse"
                buttonText="Use"
                buttonTextColor="white"
                buttonBgColor="bg-blue5"
                :callback="loadURL" 
                :disable="true">
            </BaseButton>
          </div>
          <div v-if="youtubeURL !== ''">
            <BaseButton
                buttonID="buttonUpload"
                buttonText="Upload"
                buttonTextColor="white"
                buttonBgColor="bg-blue5"
                :callback="loadURL">
            </BaseButton>
          </div>
        </div>
      </div>
    </transition>
    <div v-if="result !== ''">
    <iframe
        :width="videoWidth"
        :height="videoHeight"
        frameborder="0"
        :src="result"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
    ></iframe>
    </div>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2'
import BaseButton from "@/components/BaseButton";
import BaseTextInput from "@/components/BaseTextInput";
export default {
  name: "VideoUpload",
  components: {
    Icon,
    BaseButton,
    BaseTextInput
  },
  props:{
    videoWidth: {
      type: Number,
      default: 560
    },
    videoHeight: {
      type: Number,
      default: 315
    }
  },
  data() {
    return {
      UploadVideoModal: false,
      youtubeURL: '',
      result: '',
      url: '',
      YId: ''
    }
  },
  methods: {
    inputUrl(youtubeLink){
      this.youtubeURL = youtubeLink
      console.log(this.youtubeURL)
    },
    doButton(buttonName) {
      if (buttonName === 'buttonSave') {
        this.UploadVideoModal = !this.UploadVideoModal;
      }
    },
    doClose(){
      this.UploadVideoModal = !this.UploadVideoModal;
    },
    loadURL () {
      const youtubeEmbedTemplate = 'https://www.youtube.com/embed/'
      this.url = this.youtubeURL.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/)
      console.log("url", this.url)
      this.YId = undefined !== this.url[2] ? this.url[2].split(/[^0-9a-z_/\\-]/i)[0] : this.url[0]
      console.log("YId", this.YId)
      if (this.YId === this.url[0]) {
        alert('please input Youtube video link');
        console.log("not a youtube link")
      } else {
        console.log("it's  a youtube video")
        this.UploadVideoModal = !this.UploadVideoModal;
      }
      const topOfQueue = youtubeEmbedTemplate.concat(this.YId)
      console.log("topOfQueue", topOfQueue)
      this.result = topOfQueue
      this.youtubeURL = ''
    }
  },
  computed: {
    cssImage() {
      console.log(this.finalWidth)
      console.log(this.finalHeight)
      return {
        '--image-width': this.finalWidth,
        '--image-height': this.finalHeight
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.theme-modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 2;
}
.theme-modal {
  margin: 10rem 0;
  min-width: 375px;
  width: 460px;
  background-color: white;
  padding: 0.75rem;
  box-shadow: 0 0 0.5px rgba(10, 10, 10, 0.5);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  .button-close{
    color: #102A43;
    padding: 0.75rem;
    transition: all .1s ease-in;
    border-radius: 12px;
    margin: 0.25rem 0;
    cursor: pointer;
    &:hover{
      color: #D64545;
      box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
    }
  }
}
.theme-modal-fade-enter, .theme-modal-fade-leave-to {
  opacity: 0;
}
.theme-modal-fade-enter-active, .theme-modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.icon-close {
  padding: 0.75rem;
  transition: all .1s ease-in;
  border-radius: 12px;
  margin: 0.25rem 0;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  }
}

.dropZone-title {
  color: #787878;
}
</style>