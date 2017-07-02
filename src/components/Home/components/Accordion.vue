<template>
  <div class="accordion">
    <ul>
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
  
}
</script>
<style lang="scss">
.accordion{
    overflow: hidden;
    ul{
        position: relative;
        margin: 0;
        padding: 0;
        list-style: none;
        &:hover{
            li{
                width: 10%;
            }
        }
        li{
            width: 20%;
            float: left;
            transition:all 0.5s;
            &:hover{
                width: 60%;
            }
        }
    }
}
</style>