<template>
  <div>
    <div @dragover.prevent @drop.prevent>
      <!--   <div :class="['dropZone', dragging ? 'dropZone-over' : false]" @dragenter="dragging = true" @dragleave="dragging = false" @drop="handleFileDrop">!-->
      <div :class="['dropZone', dragging ? 'dropZone-over' : false]" @dragenter="dragging = true" @dragleave="dragging = false"
           @drop="onChange" >
        <div class="dropZone-info" >
          <span class="dropZone-title">Drop file or click to upload</span>
          <div class="dropZone-upload-limit-info">
            <div>extension support:  {{FileType}}</div>
            <div>maximum file size: {{ FileSize/1000000 +' MB' }}</div>
          </div>
        </div>
        <input type="file" multiple @change="onChange"
               :FileSize="this.FileSize" :FileType="this.FileType" :maxFile="this.maxFile">
      </div>
    </div>
    <!--</div>!-->

    <div class="uploadedFile-info">
      <div v-for="(file, index) in files" :key="index">
        <div v-if="files.length!==0" class="list">
          <div class="tw-flex tw-flex-row tw-w-full tw-justify-between">
            <div class="tw-flex tw-flex-col tw-justify-center tw-items-start">
              <div>FileName: {{ file.name }}</div>
              <div>FileSize(bytes): {{ file.size }}</div>
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
    <div>
      <BaseButton
          buttonID="buttonSubmit"
          buttonText="Submit"
          buttonTextColor="white"
          buttonBgColor="bg-blue5"
          :callback="upload">

      </BaseButton>
    </div>
  </div>
</template>

<script>
import BaseButtonDelete from "@/components/BaseButtonDelete";
import BaseButton from "@/components/BaseButton";
export default {
  components:{
    BaseButtonDelete,
    BaseButton
  },
  props:{
    FileSize: Number,
    maxFile : Number,
    FileType : String //mime type
  },
  data(){
    return {
      files: [],
      dragging: false,
    }
  },
  methods: {
    onChange(e) {
      let files = e.target.files.length > 0 ? e.target.files : e.dataTransfer.files;
      files = Array.from(files)
      console.log(files)
      console.log(this.FileType)
      if(!files || files.length === 0) return;
      if (!files.every((file)=> file.type.match(this.FileType))){
        alert('please select ' + this.FileType);
        this.dragging = false;
        return;
      }
      if (this.files.length + files.length > this.maxFile){
        alert('You can only upload a maximum of ' + this.maxFile +' files')
        this.dragging = false;
        return;
      }
      if ([...files,...this.files].reduce((sum, file) =>  sum + file.size, 0) > this.FileSize) {
        alert('please check file size no over ' + this.FileSize)
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
    upload(){
      const formData = new FormData();
      console.log('Upload processing')
      this.files.forEach((f,x)=>{
        formData.append('file'+ (x+1), f)
        console.log(f)
      })
      fetch('https://httpbin.org/post',{
        method: 'POST',
        body: formData
      })
          .then(res => res.json())
          .then(res => {
            console.log('Done Uploading',res)
          })
          .catch(e => {
            console.error(JSON.stringify(e.message))
          })
    }
  },
  computed: {
  }

}
</script>

<style lang="scss" scoped>
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