<template>
    <div class="md-layout">
        <p v-if="user">{{user.username}}</p>
        <p v-if="!user">
            You must be logged in to view this page
        </p>
    </div>
</template>
<script>
    module.exports = {
        props: ['user']
    }
</script>