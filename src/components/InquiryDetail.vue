<template>
    <main>
        <b-container>
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
                    <b-card no-body v-model="items">
                        <template #header>
                            <h5 class="mb-0 d-inline">{{ items.name }}</h5>
                        </template>

                        <b-list-group flush>
                            <b-list-group-item>
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
                    <!-- 작성버튼 -->
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

                    <!-- 작성 -->
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

                    <!-- 기록 없을 때 -->
                    <b-card v-if="historys && !historys.length"
                    border-variant="warning"
                    text-variant="warning"
                    align="center">
                        <b-card-text>작성된 기록이 없습니다.</b-card-text>
                    </b-card>

                    <!-- 기록 -->
                    <section v-else class="historyWrap">
                        <b-card
                        no-body
                        class="mb-3"
                        v-for="(list, i) in historys"
                        :key="list.id"
                        >
                            <template #header>
                                <b-row class="align-items-center">
                                    <b-col class="col-10">
                                        <b-form-input v-if="editHistory" size="sm" v-model="list.title"></b-form-input>
                                        <span v-else>{{list.title}}</span>
                                    </b-col>
                                    <b-col class="text-right">
                                        <font-awesome-icon icon="user" /> {{list.confirmUser}}
                                    </b-col>
                                </b-row>
                            </template>

                            <b-card-body>
                                <b-form-textarea v-if="editHistory"
                                size="sm"
                                v-model="list.contents"
                                rows="3"
                                max-rows="6"
                                ></b-form-textarea>
                                <div v-else>
                                    <b-card-sub-title class="mb-2">처리기록 내용</b-card-sub-title>
                                    <b-card-text>{{list.contents}}</b-card-text>
                                </div>
                            </b-card-body>

                            <b-card-footer>
                                <b-row class="align-items-center">
                                    <b-col>작성일시: 2022-01-01 12:00</b-col>
                                    <b-col class="text-right">
                                        <b-btn size="sm" class="mx-2" @click="historyEdit(i)">
                                            {{editHistory ? '저장' : '수정'}}
                                        </b-btn>
                                        <b-btn size="sm" variant="danger" @click="historyDel(i)">삭제</b-btn>
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
            {confirmUser: 'admin', title:'제목1', contents: '내용1'},
            {confirmUser: 'admin', title:'제목2', contents: '내용2'},
            {confirmUser: 'admin', title:'제목3', contents: '내용3'},
        ],
        statusOptions: [
          { text: '처리대기', value: '처리대기' },
          { text: '처리중', value: '처리중' },
          { text: '처리완료', value: '처리완료' },
        ],
        newHistory: false,
        editHistory: false,
        // selectHistory: null
      }
    },
    methods: {
        newHistoryToggle() {
            this.newHistory = !this.newHistory
        },
        historyDel(i) {
            console.log(i)
            // this.selectHistory = i;
            this.$bvModal.msgBoxConfirm('기록을 삭제하시겠습니까?', {
            title: '처리기록 삭제',
            size: 'sm',
            buttonSize: 'sm',
            okVariant: 'danger',
            okTitle: '삭제',
            cancelTitle: '취소',
            footerClass: 'p-2',
            centered: true
            })
        },
        historyEdit(i) {
            console.log(i)
            this.editHistory = !this.editHistory;
        }
    },
    watch: {
      'items.status'(newVal, oldval) {
            console.log(newVal, oldval)
            const h = this.$createElement
            // Using HTML string
            const titleVNode = h('div', { domProps: { innerHTML: '처리상태 변경' } })
            // More complex structure
            const messageVNode = h('div', { class: ['foobar'] }, [
            h('p', { class: ['mb-0'] }, [
                h('strong', { class: ['fw-900'] }, oldval),
                '에서 ',
                h('strong', { class: ['fw-900 text-danger'] }, newVal),
                '으로 변경되었습니다. ',
            ]),
            ])
            // We must pass the generated VNodes as arrays
            this.$bvModal.msgBoxOk([messageVNode], {
            title: [titleVNode],
            buttonSize: 'sm',
            centered: true, 
            size: 'md',
            okTitle: '확인',
            okVariant: 'success',
            footerClass: 'p-2',
        })
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