<template>
    <main>
        <b-container>
            <!-- 버튼 헤더 영역 -->
            <!-- <b-row class="mb-3 align-items-center">
                <b-col>
                    <b-btn
                    @click="$router.go(-1)"
                    ><font-awesome-icon icon="bars" /> 목록으로</b-btn>
                </b-col>
                <b-col class="text-right">
                    상태변경: 
                    <b-form-select
                    v-model="items.status"
                    :options="statusOptions"
                    ></b-form-select>
                </b-col>
            </b-row> -->

            <!-- 상세 영역 -->
            <b-row class="align-items-start justify-content-between">
                <!-- 상담신청 상세 -->
                <b-col :style="{marginRight:'3rem'}">
                    <b-row class="mb-3 align-items-center">
                        <b-col>
                            <b-btn
                            @click="$router.go(-1)"
                            ><font-awesome-icon icon="bars" /> 목록으로</b-btn>
                        </b-col>
                    </b-row>
                    <b-card 
                        no-body
                        v-model="items"
                    >
                        <template #header>
                            <h5 class="mb-0 d-inline">{{ items.name }}</h5>
                        </template>

                        <b-list-group flush>
                            <b-list-group-item>
                                <!-- {{ getPhoneMask(items.tel) }} -->
                                {{items.tel}}
                            </b-list-group-item>
                        </b-list-group>

                        <b-card-body>
                            <b-card-sub-title class="mb-2">상담신청 내용</b-card-sub-title>
                            <b-card-text v-for="i in 2" :key="i">
                                Some quick example text to build on the card title and make up the bulk of the card's
                                content. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, quidem itaque! Optio unde recusandae earum impedit repellendus magni sed laborum doloribus officiis amet, temporibus dolore distinctio numquam iste ullam exercitationem.
                            </b-card-text>
                        </b-card-body>

                        <b-card-footer>
                            신청일시: 2022-01-01 12:00
                            <span :style="{float:'right'}">처리자: <font-awesome-icon icon="user" /> admin</span>
                        </b-card-footer>
                    </b-card>
                </b-col>

                <!-- 처리기록 상세 -->
                <b-col>
                    <b-row class="mb-3 align-items-center">
                        <b-col>
                            <b-form-radio-group
                            class="statusSelected"
                            button-variant="outline-secondary"
                            v-model="items.status"
                            :options="statusOptions"
                            buttons>
                            </b-form-radio-group>
                        </b-col>
                        <b-col class="text-right">
                            <b-btn @click="newHistoryToggle()">
                                <font-awesome-icon :icon="newHistory ? 'minus' : 'plus'" />
                                기록 작성
                            </b-btn>
                        </b-col>
                    </b-row>

                    <b-card 
                        no-body
                        class="mb-3"
                        v-if="newHistory"
                    >
                        <template #header>
                            <b-row class="align-items-center">
                                <b-col class="col-10">
                                    <b-form-input size="sm" placeholder="제목을 입력하세요."></b-form-input>
                                </b-col>
                                <b-col class="text-right">
                                    <font-awesome-icon icon="user" /> admin
                                </b-col>
                            </b-row>
                        </template>

                        <b-card-body>
                            <b-form-textarea
                            size="sm"
                            placeholder="처리기록 내용을 입력하세요."
                            rows="3"
                            max-rows="6"
                            ></b-form-textarea>
                        </b-card-body>

                        <b-card-footer>
                            <b-row class="align-items-center">
                                <b-col class="text-right">
                                    <b-btn size="sm">저장</b-btn>
                                </b-col>
                            </b-row>
                        </b-card-footer>
                    </b-card>

                   
                        <b-card v-if="historys && !historys.length"
                        border-variant="warning"
                        text-variant="warning"
                        align="center">
                            <b-card-text>작성된 기록이 없습니다.</b-card-text>
                        </b-card>
                        
                         <section v-else class="historyWrap">
                        <b-card
                            no-body
                            v-model="historys"
                            class="mb-3"
                            v-for="(list, i) in historys"
                            :key="i"
                        >
                            <template #header>
                                <b-row class="align-items-center">
                                    <b-col class="col-10">
                                        제목
                                    </b-col>
                                    <b-col class="text-right">
                                        <font-awesome-icon icon="user" /> admin
                                    </b-col>
                                </b-row>
                            </template>

                            <b-card-body>
                                <b-card-sub-title class="mb-2">처리기록 내용</b-card-sub-title>
                                <b-card-text>
                                    Some quick example text to build on the card title and make up the bulk of the card'
                                </b-card-text>
                            </b-card-body>

                            <b-card-footer>
                                <b-row class="align-items-center">
                                    <b-col>작성일시: 2022-01-01 12:00</b-col>
                                    <b-col class="text-right">
                                        <b-btn size="sm" class="mx-2">수정</b-btn>
                                        <b-btn size="sm" variant="danger">삭제</b-btn>
                                    </b-col>
                                </b-row>
                            </b-card-footer>
                        </b-card>
                    </section>
                </b-col>
            </b-row>
        </b-container>
    </main>
</template>

<script>
export default {
    data() {
      return {
        items: {id: 1, name: '홍길동', tel: '01012345678', status: '처리중', confirmUser: 'admin'},
        historys: [
            {confirmUser: 'admin', text:'제목'},
            {confirmUser: 'admin', text:'제목'},
            {confirmUser: 'admin', text:'제목'},
        ],
        statusOptions: [
          { text: '처리대기', value: '처리대기' },
          { text: '처리중', value: '처리중' },
          { text: '처리완료', value: '처리완료' },
        ],
        newHistory: false
      }
    },
    methods: {
        newHistoryToggle() {
            this.newHistory = !this.newHistory
        },
        getPhoneMask(val) {
            let res = this.getMask(val)
            this.items.tel = res
        },
        
        getMask( phoneNumber ) {
            if(!phoneNumber) return phoneNumber
            phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
        
            let res = ''
            if(phoneNumber.length < 3) {
                res = phoneNumber
            }
            else {
                if(phoneNumber.substr(0, 2) =='02') {
            
                    if(phoneNumber.length <= 5) {//02-123-5678
                        res = phoneNumber.substr(0, 2) + '-' + phoneNumber.substr(2, 3)
                    }
                    else if(phoneNumber.length > 5 && phoneNumber.length <= 9) {//02-123-5678
                        res = phoneNumber.substr(0, 2) + '-' + phoneNumber.substr(2, 3) + '-' + phoneNumber.substr(5)
                    }
                    else if(phoneNumber.length > 9) {//02-1234-5678
                        res = phoneNumber.substr(0, 2) + '-' + phoneNumber.substr(2, 4) + '-' + phoneNumber.substr(6)
                    }
            
                } else {
                    if(phoneNumber.length < 8) {
                        res = phoneNumber
                    }
                    else if(phoneNumber.length == 8)
                    {
                        res = phoneNumber.substr(0, 4) + '-' + phoneNumber.substr(4)
                    }
                    else if(phoneNumber.length == 9)
                    {
                        res = phoneNumber.substr(0, 3) + '-' + phoneNumber.substr(3, 3) + '-' + phoneNumber.substr(6)
                    }
                    else if(phoneNumber.length == 10)
                    {
                        res = phoneNumber.substr(0, 3) + '-' + phoneNumber.substr(3, 3) + '-' + phoneNumber.substr(6)
                    }
                    else if(phoneNumber.length > 10) { //010-1234-5678
                        res = phoneNumber.substr(0, 3) + '-' + phoneNumber.substr(3, 4) + '-' + phoneNumber.substr(7)
                    }
                }
            }
            return res
        }
    },
  }
</script>

<style lang="scss" scoped>
    .historyWrap {
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        padding-top: 1rem;
        height: 35rem;
        overflow-y: scroll;
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
        &::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera*/
        }
    }
</style>