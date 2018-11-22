<template>
    <div>
        <ul class="project-box">
            <router-link to="/login">AIBox-frontend-vue</router-link>
            <li>待定</li>
        </ul>
    </div>
</template>

<script>
export default {
    
}
</script>
<style lang="scss" scoped>
.project-box{
    li{
        padding:5px 0;
    }
    li:hover{
        cursor: pointer;
    }
}
</style>


