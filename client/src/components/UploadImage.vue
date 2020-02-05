<template>
    <div>
        <h6 v-if="message" class="text-success" :class="{ 'text-danger': error == true }">{{message}}</h6>
        <form @submit.prevent="sendFile" enctype="multipart/form-data">
            <div>
                <label for="file">Upload Image</label><br>
                <input ref="file" @change="selectFile" class="container-fluid" type="file">
            </div>
            <button v-if="!message" class="btn btn-success float-right">
                Upload
            </button><br>
        </form>
  </div>
</template>

<script>
/* eslint-disable no-console */
import axios from 'axios';

export default {
    name: 'uploadimage',
    data() {
        return {
            file: '',
            message: '',
            error: false,
            uploadedFile: '',
        }
    },
    methods: {
        selectFile() {
            const file = this.$refs.file.files[0];
            const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
            const MAX_SIZE = 10000000;
            const tooLarge = file.size > MAX_SIZE;

            if (allowedTypes.includes(file.type) && !tooLarge) {
                this.file = file;
                this.error = false;
                this.message = '';
            } else {
                this.error = true;
                this.message = tooLarge ? `Too large. Max size is ${MAX_SIZE/1000}Kb` : "Only image are allowed"
            }
        },

        async sendFile() {
            const formData = new FormData();
            formData.append('file', this.file);
            try {
                const res = await axios.post('subjects/uploadimage', formData, {headers: {'authorization': localStorage.token}})
                this.uploadedFile = res.data.file;
                this.imageURL = res.data.file;
                this.message = "Image Uploaded";
                this.file = '';
                this.error = false
            } catch (err){
                this.message = err.response.data.error;
                this.error = true
            }
        }
    },computed: {
        imageURL: {
            get() {
                return this.$store.state.admin.imageURL;
            },
            set(value) {
                this.$store.commit("admin/updateimageURL", value);
            }
        }
    },
}
</script>
