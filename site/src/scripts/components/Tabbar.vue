<template>
    <div class="tabbar">
        <slot></slot>
    </div>
</template>

<script>
    import Tab from '../mixins/tab';

    export default {
        name: 'tabbar',
        mixins: [Tab],
        props: {
            activeKey: {
                default: 0,
            },
        },
    };
</script>
