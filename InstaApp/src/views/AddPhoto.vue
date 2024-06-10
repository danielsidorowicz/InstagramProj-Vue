<template>
    <div class="mainUploadDiv">
        <div class="logoDiv" id="logoDiv">
            <RouterLink to="/">
                <img src="../assets/AppLogo.png" alt="AppLogo">
            </RouterLink>
        </div>
        <FileUpload v-model="uploadedFiles" :customUpload="true" name="photos" mode="advanced" label="Choose files" :auto="false"
            @uploader="uploadFiles" :fileLimit="1" :multiple="false" accept="image/*" url="default">
            <template #empty>
                <div class="dragAndDrop">
                    <i class="pi pi-cloud-upload"
                        style="font-size: 2em; border: 1px solid white; border-radius: 50% 50%; padding: 20px;"></i>
                    <p class="mt-4 mb-0">Drag and drop files to here to upload.</p>
                </div>
            </template>
        </FileUpload>
        <div class="filters">
            <SelectButton v-model="selectedFilterValue" :options="filters" aria-labelledby="basic" />
        </div>
        <div class="tags">
            <div class="tagsWlabel">
                <h3>Dodaj istniejące tagi:</h3>
                <MultiSelect v-model="selectedTags" :options="renderTags" filter optionLabel="name" placeholder="Select Tags" :maxSelectedLabels="3" class="w-full md:w-20rem" />
            </div>
            <div class="tagsWlabel">
                <h3>Albo dodaj nowy:</h3>
                <input v-model="ownTags" type="text" name="newTag" id="newTag" placeholder="Multiple seperate with spacebar">
            </div>
        </div>
    </div>
</template>
<script>
import FileUpload from 'primevue/fileupload';
import { get, post, patch, getCookie } from '@/stores/requests';
import { useUserStore } from '@/stores/userEmailStore';
import { useTagsStore } from '@/stores/useTagsStore';
import SelectButton from 'primevue/selectbutton';
import MultiSelect from 'primevue/multiselect';
import setTagsAgain from '@/main';
import router from '@/router';


export default {
    components: {
        FileUpload,
        SelectButton,
        MultiSelect,
    },
    data() {
        return {
            selectedFilterValue: null,
            filters: ["Grayscale", "Flip", "Flop", "Negate", "Tint"],
            selectedTags: null,
            uploadedFiles: [],
            ownTags: null
            // tags: null
        };
    },
    methods: {
        async uploadFiles(event) {
            // console.log("robie");
            const userStore = useUserStore()

            const formData = new FormData();
            for (let file of event.files) {
                formData.append('file', file);
            }

            // console.log(userStore.email);

            formData.append('album', userStore.email)

            let config = {
                headers: {
                    'authorization': `Bearer ${getCookie("token")}`,
                    'Content-Type': 'multipart/form-data'
                }
            };

            let responseAddPhoto = await post('http://localhost:3000/api/photos', formData, config);

            // console.log(responseAddPhoto);

            if(this.selectedFilterValue != null) {
                // console.log(this.selectedFilterValue);

                config = {
                    headers: {
                        'authorization': `Bearer ${getCookie("token")}`,
                    }
                }

                // console.log(responseAddPhoto.data.id);
                let responseFilter = await get(`http://localhost:3000/api/getimage/${responseAddPhoto.data.id}/filter/${this.selectedFilterValue}`, config);

                // console.log(responseFilter);
                
            }

            if(this.selectedTags != null) {
                let config = {
                    headers: {
                        'authorization': `Bearer ${getCookie("token")}`,
                        'Content-Type': 'application/json'
                    }
                };

                let tagsToSend = []
                for(let i = 0; i < this.selectedTags.length; i++) {
                    tagsToSend.push({name: this.selectedTags[i].name})
                }

                let tagsData = {
                    id: responseAddPhoto.data.id,
                    tags: tagsToSend
                }

                let responseTags = await patch(`http://localhost:3000/api/photos/tags/mass`, tagsData, config);

                // console.log(responseTags);
            }

            // console.log(this.ownTags);

            if(this.ownTags != null && this.ownTags != "") {
                let newTags = this.ownTags.split(" ")

                let tagsToSend = []
                for(let i = 0; i < newTags.length; i++) {
                    tagsToSend.push({name: newTags[i], popularity: Math.floor(Math.random() * 100) + 1})
                }

                let tagsData = {
                    id: responseAddPhoto.data.id,
                    tags: tagsToSend
                }

                // console.log(tagsData);
                let config = {
                    headers: {
                        'authorization': `Bearer ${getCookie("token")}`,
                        'Content-Type': 'application/json'
                    }
                };

                // console.log("Przed new");
                let responseTagsNew = await post(`http://localhost:3000/api/tags`, tagsData, config);
                // console.log("Po new");
                // console.log(responseTagsNew);

                let responseTags = await patch(`http://localhost:3000/api/photos/tags/mass`, tagsData, config);

                // console.log(responseTags);

                setTagsAgain()
            }
            router.push("/")
        },
    },

    setup() {
        const tagsStore = useTagsStore()
        let tags = tagsStore.tags

        // console.log(tags);

        let renderTags = []

        for(let i = 0; i < tags.length; i++){
            let tagCorrect = {
                name: tags[i],
                code: tags[i]
            }

            renderTags.push(tagCorrect)
        }

        return {
            renderTags
        }
    }
};
</script>
<style>
.mainUploadDiv {
    width: 100%;
    min-width: 518px;
    height: 100%;
    min-height: 718px;
    padding: 40px;
    outline-offset: -20px;
    outline: 2px solid white;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
}

.logoDiv {
    width: 400px;
    height: 200px;
    /* height: fit-content; */
    padding: 20px;

    display: flex;
    justify-content: center;
    flex-grow: 0;
    flex-shrink: 0;
}

.logoDiv img {
    height: 100%;
    width: 100%;
    object-fit: contain;
    margin-left:auto;
    margin-right:auto;
    transform: scale(0.95);
    transition: 0.3s;
} 

.logoDiv img:hover {
    transform: scale(1);
    transition: 0.3s;
} 

.p-fileupload {
    width: 75%;
    height: 40%;
    display: flex;
    flex-direction: column;
}

.p-fileupload .p-fileupload-buttonbar {
    padding: 20px;
}

.p-fileupload .p-fileupload-content {
    padding: 20px;
    height: 400px;
    overflow: auto;
}

.p-fileupload-empty {
    height: 100%;
    display: flex;
    justify-content: center;
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

.p-selectbutton .p-button .p-button-label {
    padding: 10px;
}

.tags {
    width: 25%;
    display: flex;
    flex-direction: row;
    gap:20px;
    
}


.tags .p-multiselect {
    padding: 10px;
    width: 100%
}

.tagsWlabel {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: space-between;
}

.tagsWlabel input[type="text"] {
    height: 43px;
}

.p-multiselect-header {
    gap: 10px;
    padding: 10px;
    
}

.p-multiselect-items-wrapper {
    /* gap: 10px; */
    padding: 10px
}

.p-multiselect-filter-icon {
    top: 0%;
    height: 100%;
}

.p-multiselect-item {
    gap: 10px;
}

.p-multiselect-header .p-checkbox-input .p-checkbox-input {
    width: auto !important;
    height: auto !important;
}
</style>