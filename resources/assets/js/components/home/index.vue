<template>
    <div>
        <loading v-if="loading"/>
        <div v-if="isAuthenticated">
            <feed-item v-for="(feed, index) in fakeFeed" :key="index" :feed="feed"/>
        </div>
        <div v-if="!isAuthenticated && authStatus !== 'loading'">
            <h1>Welcome to DogeBook !</h1>
            <p>When meeting new doge friends is harder than ever, Dogebook closes the gap between all paws in the world</p>
            <login/>
        </div>
    </div>
</template>

<style>
    .home {
        display: flex;
        align-items: center;
        flex-direction: column;
    }
</style>

<script>
    import fakeFeed from './fakeFeed.js';
    import FeedItem from './FeedItem.vue';
    import {mapGetters} from 'vuex';
    import Login from '../login/index.vue'
    export default {
        components: {
            Login,
            FeedItem
        },
        name: 'home',
        computed: {
            ...mapGetters(['isAuthenticated', 'authStatus']),
            loading: function () {
                return this.authStatus === 'loading' && !this.isAuthenticated
            }
        },
        data () {
            return ({ fakeFeed })
        },
    }
</script>