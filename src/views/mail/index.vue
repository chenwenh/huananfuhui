<template>
<div class="agreement">
    <breadcrumb :breadcrumbList="breadcrumbs"/>
    <div class="content">
        <h3>站内信</h3>
        
    </div>
</div>
</template>
<script>
import breadcrumb from '@/components/breadcrumb.vue';
export default {
    data(){
        return{
            breadcrumbs:['站内信'],
        }
    },
    components:{
        breadcrumb
    }
}
</script>
<style scoped>

</style>