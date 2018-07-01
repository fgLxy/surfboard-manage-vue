<template>
    <el-row>
        <el-button size="mini" v-if="title">{{$t(title)}}</el-button>
        <el-radio-group class="box" size="mini" text-color="#194D5B" v-model="dataValue">
            <el-radio-button v-for="item in checks" :key="item.key" :label="$t(item.label)" border></el-radio-button>
        </el-radio-group>
    </el-row>
</template>

<script>
    export default {
        name: 'radio-group',
        props: {
            value: {
                required: false
            },
            title: {
                type: String,
                required: false,
                defalt: ''
            },
            checks: {
                type: Array,
                required: true
            }
        },
        data: function() {
            return {
                dataValue: this.$t(this.value) || [],
                reversMap: {}
            }
        },
        mounted: function() {
            this.checks.forEach(item => {
                this.reversMap[this.$t(item.label)] = item.label
            })
        },
        watch: {
            dataValue: function(to, from) {
                this.$emit('input', this.reversMap[to])
                this.$emit('change', this.reversMap[to])
            }
        }
    }
</script>

<style scoped lang="less">
.box>* {
    margin-left: 5px;
}
</style>