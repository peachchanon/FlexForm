<template>
  <div>
    <base-button
        buttonID="buttonSave"
        buttonText="Save"
        buttonTextColor="white"
        buttonBgColor="bg-green5"
        :callback="doButton"
    >
    </base-button>
  
    <transition name="theme-modal-fade" v-if="UploadPictureModal">
    <div class="theme-modal-backdrop">
      <div class="theme-modal">
        <header class="tw-flex tw-justify-between base-padding tw-relative tw-items-center">
          <div  class="tw-flex">
            <Icon class="icon-upload semibold24 tw-mr-2 tw-mt-1 red5" icon="heroicons-outline:trash"/>
            <span class="semibold24 blue8">Upload Image</span>
          </div>
          <div class="button-close tw-flex tw-flex-col tw-items-center medium16 tw-absolute tw-top-0 tw-right-0" 
               style="width: fit-content" @click="doClose">
            <Icon class="icon semibold24" icon="heroicons-outline:x"/>
          </div>
        </header>
        
        <div @dragover.prevent @drop.prevent>
          <div v-if="files.length < 1" @change="onFileChange">
          <div :class="['dropZone', dragging ? 'dropZone-over' : false]" @dragenter="dragging = true" @dragleave="dragging = false"
               @drop="onChange">
            <div class="dropZone-info">
              <span class="dropZone-title">Drop image or click to upload</span>
              <div class="dropZone-upload-limit-info">
                <div>extension support:  {{FileType}}</div>
              </div>
            </div>
            <input type="file" multiple @change="onChange" :FileType="this.FileType">
          </div>
          </div>
          <div v-if="files.length === 1">
            <div class="imgPreview" >
              <div class="dropZone-info" >
                <img class="imgDrop" v-if="url" :src="url" alt="picture">
              </div>
            </div>
          </div>
        </div>
        <div class="uploadedFile-info">
          <div v-for="(file, index) in files" :key="index">
            <div v-if="files.length!==0" class="list">
              <div class="tw-flex tw-flex-row tw-w-full tw-justify-between">
                <div class="tw-flex tw-flex-col tw-justify-center tw-items-start">
                  <div>FileName: {{ file.name }}</div>
                </div>
                <base-button-delete
                    buttonID="buttonRemove"
                    buttonText="Remove"
                    button-icon="heroicons-outline:trash"
                    :callback="removeFile"
                >
                </base-button-delete>
              </div>
            </div>
          </div>
        </div>
          <div v-if="files.length < 1">
          <BaseButton
              buttonID="buttonSubmit"
              buttonText="Submit"
              buttonTextColor="white"
              buttonBgColor="bg-blue5"
              :callback="doUpload" 
              :disable="true">
          </BaseButton>
        </div>
        <div v-if="files.length === 1">
          <BaseButton
              buttonID="buttonSubmit"
              buttonText="Submit"
              buttonTextColor="white"
              buttonBgColor="bg-blue5"
              :callback="doUpload">
          </BaseButton>
        </div>
      </div>
    </div>
  </transition>
    <div v-if="this.upload === true" >
      <img class="imgShow" :style="cssImage" v-if="url" :src="url" alt="picture">
    </div>
    </div>
</template>

<script>
import { Icon } from '@iconify/vue2'
import BaseButtonDelete from "@/components/BaseButtonDelete";
import BaseButton from "@/components/BaseButton";
export default {
  name: "ImageUpload",
  components: {
    Icon,
    BaseButtonDelete,
    BaseButton
  },
  props:{
    FileType: {
      type: String, //mime type
      default: 'image.*'
    },
    imageHeight: {
      type: Number,
      default: 250
    },
    imageWidth: {
      type: Number,
      default: 300
    },
    imageSet: {
      type: String,
      default: "ratioW"
    }
  },
  data() {
    return {
      UploadPictureModal: false,
      files: [],
      dragging: false,
      url: null,
      upload: false,
      finalWidth: "",
      finalHeight: ""
    }
  },
  methods: {
    doButton(buttonName) {
      if (buttonName === 'buttonSave') {
        this.UploadPictureModal = !this.UploadPictureModal;
      }
    },
    doClose(){
        this.UploadPictureModal = !this.UploadPictureModal;
    },
    doUpload(){
      this.UploadPictureModal = !this.UploadPictureModal;
      this.upload = !this.upload;
      console.log(this.upload)
      console.log(this.imageSet)
      if (this.imageSet === "ratioW") {
        this.finalWidth = "auto";
        this.finalHeight = this.imageHeight + "px";
      }
      if(this.imageSet === "ratioH") {
        this.finalWidth = this.imageWidth + "px";
        this.finalHeight = "auto";
      }
      if(this.imageSet === "custom") {
        this.finalWidth = this.imageWidth + "px";
        this.finalHeight = this.imageHeight  + "px";
      }
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
      console.log(this.url)
    },
    onChange(e) {
      let files = e.target.files.length > 0 ? e.target.files : e.dataTransfer.files;
      files = Array.from(files)
      console.log(files)
      console.log(this.FileType)
      if(!files || files.length === 0) return;
      if (!files.every((file)=> file.type.match('image.*'))){
        alert('please select ' + this.FileType);
        this.dragging = false;
        return;
      }
      if (this.files.length + files.length > 1){
        alert('You can only upload a maximum of 1 file')
        this.dragging = false;
        return;
      }
      ([...files]).forEach(f => {
        this.files.push(f);
      });
      this.dragging = false;
    },
    removeFile(fileKey) {
      this.files.splice(fileKey, 1)
    },
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

.button__style__white {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: $blue5;
  padding: 0.75rem;
  transition: all .1s ease-in;
  border-radius: 12px;
  margin: 0.25rem 0;
  cursor: pointer;
  border-width: 1px;
  border-color: $blue5;
  background-color: white;
  &:hover{
    color: $blue3;
    border-color: $blue3;
  }
}
.button__style__white.red {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: $red5;
  padding: 0.75rem;
  transition: all .1s ease-in;
  border-radius: 12px;
  margin: 0.25rem 0;
  cursor: pointer;
  border-width: 1px;
  border-color: $red5;
  background-color: white;
  &:hover{
    color: $red3;
    border-color: $red3;
  }
}
.button__style__red {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  padding: 0.75rem;
  transition: all .1s ease-in;
  border-radius: 12px;
  margin: 0.25rem 0;
  cursor: pointer;
  background-color: $red5;
  &:hover{
    background-color: $red6;
  }
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

.imgPreview {
  width: 100%;
  height: 200px;
  position: relative;
  border: 2px $blue5;
}
.imgDrop {
  width: auto;
  height: 200px;
  position: relative;
  border: 2px $blue5;
  margin: auto;
}
.imgShow{
  width: var(--image-width);
  height: var(--image-height);
}
.dropZone {
  width: 100%;
  height: 200px;
  position: relative;
  border: 2px dashed $blue5;
}

.dropZone:hover {
  border: 2px solid #2e94c4;
}

.dropZone:hover .dropZone-title {
  color: #1975A0;
}

.dropZone-info {
  color: #787878;
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translate(0, -50%);
  text-align: center;
}

.dropZone-title {
  color: #787878;
}

.dropZone input {
  position: absolute;
  cursor: pointer;
  top: 0px;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.dropZone-upload-limit-info {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}

.dropZone-over {
  background: $grey4;
  opacity: 0.8;
}

.dropZone-uploaded {
  width: 80%;
  height: 200px;
  position: relative;
  border: 2px dashed #eee;
}

.dropZone-uploaded-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #A8A8A8;
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translate(0, -50%);
  text-align: center;
}

.removeFile {
  width: 200px;
}
.list{
  border-radius: $radius10px;
  background-color: white;
  padding: 0.75rem;
  margin-top: 2px;
}
</style>