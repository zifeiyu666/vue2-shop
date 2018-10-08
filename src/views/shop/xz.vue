<template>
    <div class='xz'>
        <v-header>
         <h1 slot="title">{{title}}</h1>
        </v-header>
        <div style='padding: 30px 15px' v-html='content.NewsContent'>

        </div>
    </div>
</template>
<script>
    import * as mockapi from '@/../mockapi'
    import Header from '@/common/_header.vue'
    export default{
        components: {
            'v-header':Header,
        },
        data() {
            return {
                title: '',
                code: '',
                content: ''
            }
        },
        mounted() {
            this.title=this.$route.query.title
            this.code=this.$route.query.code
            this.getItemIntro()
        },
        methods: {
            getItemIntro() {
                this.$store.commit('SET_LOADING', true)
                mockapi.show.api_Show_getXMJJ_get({
                    params: {
                        typeCode: this.code
                    }
                }).then(response => {
                    this.$store.commit('SET_LOADING', false)
                    var data = response.data.data
                    this.content = data
                    console.log(this.content)
                }).catch(error => {
                    this.$store.commit('SET_LOADING', false)
                    console.log(error)
                })
            }
        }
    }
</script>