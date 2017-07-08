<template>
    <div class="accordion">
        <ul class="active" @mouseover="stopAnimate" @mouseout="startAnimate">
            <li class="active">
                <a href="javascript:void(0)">
                    <img src="../../../assets/temp.jpg"></img>
                </a>
            </li>
            <li>
                <a href="javascript:void(0)">
                    <img src="../../../assets/temp2.jpg"></img>
                </a>
            </li>
            <li>
                <a href="javascript:void(0)">
                    <img src="../../../assets/temp.jpg"></img>
                </a>
            </li>
            <li>
                <a href="javascript:void(0)">
                    <img src="../../../assets/temp2.jpg"></img>
                </a>
            </li>
            <li>
                <a href="javascript:void(0)">
                    <img src="../../../assets/temp.jpg"></img>
                </a>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            now: 0,
            interval: null
        }
    },
    methods:{
        stopAnimate() {
            
        },
        startAnimate(){
            

        }
    },
    mounted() {
        // this.$nextTick(() => {
        //     const accordionUl = document.querySelector('div.accordion ul');
        //     accordionUl.onmouseenter = function() {
        //         clearInterval(this.interval);
        //         this.className = '';
        //     }
        //     accordionUl.onmouseout = function() {
        //         this.interval = setInterval(() => {
        //         this.now > 4 && (this.now = 0);
        //         const accordionList = document.querySelectorAll('ul.active li');
        //         accordionList.forEach((element) => {
        //             element.className = '';
        //         });
        //         accordionList[this.now++].className = 'active';
        //     }, 3000);
        //         this.className = 'active';
        //     }

            
        // });
    },
    beforeDestroy() {
        // clearInterval(this.interval);
    }
}
</script>
<style lang="scss" scoped>
.accordion {
    overflow: hidden;
    ul {
        position: relative;
        margin: 0;
        padding: 0;
        list-style: none;
        &:hover {
            li {
                width: 10%;
            }
        }
        li {
            width: 20%;
            float: left;
            transition: all 0.5s;
            &:hover {
                width: 60%;
            }
        }
        &.active {
            li {
                width: 10%;
                &.active {
                    width: 60%;
                }
            }
        }
    }
}
</style>