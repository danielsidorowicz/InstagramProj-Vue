<template>
    <div class="mainUploadDiv">
        <FileUpload 
        :customUpload="true"
        name="photos"
        mode="advanced"
        label="Choose files"
        :auto="false"
        @uploader="uploadFiles"
        :fileLimit="1"
        :multiple="false"
        accept="image/*"
        url="default">
            <template #empty>
                <div class="dragAndDrop">
                    <i class="pi pi-cloud-upload" style="font-size: 2em; border: 1px solid white; border-radius: 50% 50%; padding: 20px;"></i>
                    <p class="mt-4 mb-0">Drag and drop files to here to upload.</p>
                </div>
            </template>
        </FileUpload>
    </div>
</template>
<script>
import FileUpload from 'primevue/fileupload';
import { post } from '@/stores/requests';
import { getCookie } from '@/stores/requests';

export default {
    components: {
        FileUpload
    },
    data() {
        return {

        };
    },
    methods: {
        async uploadFiles(event) {
            // console.log("robie");

            const formData = new FormData();
            for (let file of event.files) {
                formData.append('file', file);
            }

            const config = {
                headers: {
                    'authorization': `Bearer ${getCookie("token")}`,
                    'Content-Type': 'multipart/form-data'
                }
            };

            let response = await post('http://localhost:3000/api/photos', formData, config);

            console.log(response);
        },
    },
    
    setup() {

    }
};
</script>
<style>
    .mainUploadDiv {
        width: 100%;
        height: 100%;
        padding: 40px;
        outline-offset: -20px;
        outline: 2px solid white;

        display: flex;
        justify-content: center;
    }

    .p-fileupload {
        width: 50%;
        height: fit-content;
        display: flex;
        flex-direction: column;
    }

    .p-fileupload .p-fileupload-buttonbar {
        padding: 20px;
    }

    .p-fileupload .p-fileupload-content {
        padding: 20px;
        height: 200px;
        overflow: auto;
    }

    .dragAndDrop {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 1.5em;
        gap: 10px;
        overflow: auto;
    }

    .p-button {
        padding: 5px;
        gap: 5px;
    }

    .p-fileupload-file {
        width: 100%;
        flex-direction: row;
        justify-content: space-between;
        overflow: auto;
    }

    .p-fileupload-file-details {
        width: fit-content;
        display: flex;
        flex-direction: row;
        gap: 10px;
    }

    .p-fileupload-file-badge {
        padding: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>