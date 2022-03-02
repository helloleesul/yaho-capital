<template>
    <main>
        <b-container v-if="errorPage">
            <ErrorPage />
        </b-container>
        <b-container v-else>
            <b-row class="yellow-wrap title mb-5">
                <p class="text-30 fw-900 m-0">상담신청 상세</p>
            </b-row>
            <!-- {{item}} -->
            <!-- {{item.comments}} -->
            <b-row class="align-items-start justify-content-between pt-4">
                <!-- 상담신청 상세 -->
                <b-col class="me-5">
                    <b-row class="mb-3 align-items-center">
                        <b-col>
                            <b-btn @click="$router.go(-1)" variant="dark fw-900 text-17">
                                <font-awesome-icon icon="arrow-left" />
                                <span class="ms-2">이전으로</span>
                            </b-btn>
                        </b-col>
                    </b-row>
                    <b-card no-body v-model="item">
                        <b-list-group flush>
                            <b-list-group-item>
                                <span class="text-muted">이름</span>
                                <b-card-text>
                                    {{ item.name }}
                                </b-card-text>
                            </b-list-group-item>
                            <b-list-group-item>
                                <span class="text-muted">연락처</span>
                                <b-card-text>
                                    {{ phoneFomatter(itemPhone) }}
                                </b-card-text>
                            </b-list-group-item>
                            <b-list-group-item>
                                <span class="text-muted">상담내용</span>
                                <b-card-text :style="{height:'19rem'}">
                                    <span v-if="!item.content" :style="{opacity:'.2'}">상담내용이 없습니다.</span>
                                    <span v-else :style="{whiteSpace: 'pre-wrap'}">
                                        <vue-scroll>{{item.content}}</vue-scroll>
                                    </span>
                                </b-card-text>
                            </b-list-group-item>
                        </b-list-group>

                        <template #footer>
                            <b-row class="align-items-center">
                                <b-col>
                                    <span class="text-muted">신청일시</span>
                                    {{ $moment(item.createDate).format('YYYY-MM-DD hh:mm a') }}
                                </b-col>
                                <b-col class="text-right fw-900 text-17">
                                    <span :style="{borderRadius: '2rem'}">최종처리자</span>
                                    <span v-if="item.user" class="ms-2 yellow-underline">{{ item.user.name}}</span>
                                    <span v-else class="ms-2">-</span>
                                </b-col>
                            </b-row>
                        </template>
                    </b-card>
                </b-col>

                <!-- 처리기록 상세 -->
                <b-col>
                    <!-- 작성버튼 -->
                    <b-row class="mb-3 align-items-center">
                        <b-col class="col-8">
                            <b-form-radio-group
                            class="statusSelected"
                            v-model="item.status"
                            buttons>
                                <b-form-radio value="WAIT" class="wait">처리대기</b-form-radio>
                                <b-form-radio value="ING" class="ing">처리중</b-form-radio>
                                <b-form-radio value="CHECKED" class="checked">처리완료</b-form-radio>
                            </b-form-radio-group>
                        </b-col>
                        <b-col class="text-right">
                            <b-btn @click="newCommentToggle()" variant="dark fw-900 text-17">
                                <font-awesome-icon :icon="newCommentShow ? 'minus' : 'plus'" />
                                기록 작성
                            </b-btn>
                        </b-col>
                    </b-row>
                    <!-- 작성 -->
                    <b-card 
                    no-body
                    class="mb-3"
                    v-if="newCommentShow"
                    >
                        <b-card-body>
                            <b-form-textarea
                            placeholder="처리기록 내용을 입력하세요."
                            rows="3"
                            v-model="newCommentContent"
                            ref="commentInput"
                            ></b-form-textarea>
                        </b-card-body>

                        <template #footer>
                            <b-row class="align-items-center">
                                <b-col class="text-right">
                                    <b-btn size="sm" variant="outline-dark" @click="addCommentCheck(newCommentContent)">저장</b-btn>
                                </b-col>
                            </b-row>
                        </template>
                    </b-card>

                    <!-- 기록 없을 때 -->
                    <b-card v-if="item.comments && item.comments.length < 1 || item.comments === null"
                    border-variant="dark"
                    text-variant="dark"
                    :style="{opacity:.15}"
                    align="center"
                    >
                        <b-card-text class="m-0">작성된 기록이 없습니다.</b-card-text>
                    </b-card>

                    <!-- 기록 -->
                    <section v-else class="commentsWrap">
                        <vue-scroll>
                        <b-card
                        no-body
                        class="mb-3 me-3"
                        :class="{'active': list.edit}"
                        v-for="(list, index) in item.comments"
                        :key="list.id"
                        >
                            <b-card-body v-if="list.edit">
                                <div>
                                    <b-card-sub-title class="mb-2">{{list.user.name}}</b-card-sub-title>
                                    <b-form-textarea
                                    v-model="list.content"
                                    placeholder="처리기록 내용을 입력하세요."
                                    rows="3"
                                    ref="commentInput2"
                                    ></b-form-textarea>
                                </div>
                            </b-card-body>
                            <b-card-body v-else>
                                <div>
                                    <b-card-sub-title class="mb-2">{{list.user.name}}</b-card-sub-title>
                                    <b-card-text :style="{whiteSpace: 'pre-wrap'}">{{list.content}}</b-card-text>
                                </div>
                            </b-card-body>

                            <b-card-footer>
                                <b-row class="align-items-center">
                                    <b-col>
                                        <span class="text-muted">작성일시</span>
                                        {{ $moment(list.updateDate).format('YYYY-MM-DD hh:mm a') }}
                                    </b-col>
                                    <!-- <b-col v-if="$moment(list.createDate).format('YYYY-MM-DD hh:mm a') !== $moment(list.updateDate).format('YYYY-MM-DD hh:mm a')">
                                        <span class="text-muted">수정일시</span>
                                        {{ $moment(list.updateDate).format('YYYY-MM-DD hh:mm a') }}
                                    </b-col>
                                    <b-col class="text-right">
                                        <span class="text-muted">작성일시</span>
                                        {{ $moment(list.createDate).format('YYYY-MM-DD hh:mm a') }}
                                    </b-col> -->
                                    <!-- {{list}} -->
                                    <!-- {{list.edit}} -->
                                    <!-- {{list.disable}} -->
                                    <b-col class="text-right" v-if="$store.state.serviceId == list.user.serviceId">
                                        <div v-if="list.edit">
                                            <b-btn  size="sm" class="me-2" variant="outline-dark" @click="updateCommentCheck(list.content, list)">저장</b-btn>
                                            <b-btn  size="sm" variant="outline-danger" @click="getInquiryDetail()">취소</b-btn>
                                        </div>
                                        <div v-else>
                                            <b-btn size="sm" class="me-2" variant="outline-dark" :disabled="list.disable" @click="editBtn(index)">수정</b-btn>
                                            <b-btn size="sm" variant="outline-danger" :disabled="list.disable" @click="delCommentCheck(list)">삭제</b-btn>
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-card-footer>
                        </b-card>
                        </vue-scroll>
                    </section>
                </b-col>
            </b-row>
        </b-container>
        <Alert :okVariant="okVariant" :title="title" :body="body" />
    </main>
</template>

<script>
import Alert from './Alert.vue';
import ErrorPage from './ErrorPage.vue';
export default {
    name: 'InquiryDetail',
    components: { Alert, ErrorPage },
    data() {
      return {
        statusOptions: [
            { text: '처리대기', value: 'WAIT' },
            { text: '처리중', value: 'ING' },
            { text: '처리완료', value: 'CHECKED' },
        ],
        newCommentShow: false,
        item: {
            name: null,
            phone: null,
        },
        itemPhone: null,
        newCommentContent: null,

        okVariant: null,
        title: null,
        body: null,

        errorPage: false
      }
    },
    computed: {
        id() {
            return this.$route.params.id;
        },
        commentSet() {
            return  this.item.comments.forEach(function(el) {
                    // console.log('commentSet', el);
                    this.$set(el, 'edit', false);
                    this.$set(el, 'disable', false);
            }, this)
        },
    },
    mounted() {
        this.getInquiryDetail();
    },
    methods: {
        // 리스트 불러오기
        async getInquiryDetail(){
            await this.$axios.get("/admin/inquiry/"+this.id)
            .then((res) => {
                console.log(res.data);
                this.item = res.data.data;
                this.itemPhone = res.data.data.phone;
    
                if (this.item.comments !== null) {
                    this.commentSet;
                }
            }).catch(() => {
                this.errorPage = true
            });
        },
        // 처리상태 변경
        async updateStatus(){
            await this.$axios.put("/admin/inquiry/"+this.id, {
                status: this.item.status
            });
            this.getInquiryDetail();
        },

        // 수정 입력체크
        updateCommentCheck(text, list){
            const blank_pattern = /^\s+|\s+$/g;
            if(text == "" || text == undefined) {
                // console.log(text)
                // console.log('입력하세요.')
                this.$refs.commentInput2[0].focus()
                this.alertModal('내용 입력','내용을 입력해주세요.','danger')
            } else if( text.replace( blank_pattern, '' ) == "" ) {
                // console.log('공백입니다.')
                list.content = null
                this.$refs.commentInput2[0].focus()
                this.alertModal('내용 입력','내용을 입력해주세요.','danger')
            } else {
                // console.log(text)
                // console.log('입력되었습니다.')
                this.updateComment(list);
            }
        },

        // 수정 처리
        async updateComment(list){
            const { data } = await this.$axios.put("/admin/comments/"+list.id, {
                content: list.content
            });
            console.log(data)
            
            if (data.code === "0000") {
                this.getInquiryDetail()
                this.alertModal('기록 수정','기록이 수정되었습니다.','success')
            } else if (data.code === "4001") {
                this.alertModal('내용 입력','내용을 입력해주세요.','danger')
            } else if (data.code === "4040") {
                this.alertModal('요청 오류','요청하신 정보를 찾을 수 없습니다.','danger')
            }
            // console.log(list.id)
            // console.log(list)
            // console.log(list.content)
        },

        // 작성 입력체크
        addCommentCheck(text) {
            const blank_pattern = /^\s+|\s+$/g;
            if(text == "" || text == undefined) {
                // console.log(text)
                // console.log('입력하세요.')
                this.$refs.commentInput.focus()
                this.alertModal('내용 입력','내용을 입력해주세요.','danger')
            } else if( text.replace( blank_pattern, '' ) == "" ) {
                // console.log('공백입니다.')
                this.newCommentContent = null
                this.$refs.commentInput.focus()
                this.alertModal('내용 입력','내용을 입력해주세요.','danger')
            } else {
                // console.log(text)
                // console.log('입력되었습니다.')
                this.addComment();
            }
        },

        // 작성 처리
        async addComment(){
            const { data } = await this.$axios.post("/admin/comments/"+this.id, {
                content: this.newCommentContent
            });
            console.log(data)

            if (data.code === "0000") {
                this.newCommentContent = null;
                this.getInquiryDetail();
                this.alertModal('기록 작성','새 기록이 작성되었습니다.','success')
                // this.newCommentShow = false;
            } else if (data.code === "4001") {
                this.$refs.commentInput.focus()
                this.alertModal('내용 입력','내용을 입력해주세요.','danger')
            } else if (data.code === "4040") {
               this.alertModal('요청 오류','요청하신 정보를 찾을 수 없습니다.','danger')
            } 
            // console.log(this.item.comments.content)
        },
        newCommentToggle() {
            this.newCommentShow = !this.newCommentShow
        },
        delCommentCheck(list) {
            this.$bvModal.msgBoxConfirm('기록을 삭제하시겠습니까?', {
            title: '처리기록 삭제',
            size: 'sm',
            buttonSize: 'sm',
            okVariant: 'danger',
            okTitle: '삭제',
            cancelTitle: '취소',
            footerClass: 'p-2',
            centered: true,
            noCloseOnBackdrop: true,
            titleClass: 'fw-900',
            footerBgVariant: 'white'
            }).then((value)=> {
                // console.log(list, value)
                if(value) {
                    this.delComment(list)
                }
            });
        },
        async delComment(list) {
            const { data } = await this.$axios.delete("/admin/comments/"+list.id);
            console.log(data)
            this.getInquiryDetail()
        },
        editBtn(index) {
            this.item.comments.forEach(function(el, idx) {
                console.log( index, idx)
                if ( index === idx ) {
                    el.edit = true;
                    el.disable = false;
                } 
                else {
                    el.edit = false;
                    el.disable = true;
                }
            }, this);
        },
        phoneFomatter(num) {
            if (num?.length == 11) {
                this.itemPhone = num.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
            } else if (num?.length == 10) {
                this.itemPhone = num.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
            } else if (num?.length == 9) {
                this.itemPhone = num.replace(/(\d{2})(\d{3})(\d{4})/, "$1-$2-$3");
            } 
            return this.itemPhone;
        },
        alertModal(title, body, okVariant) {
            this.title = title
            this.body = body
            this.okVariant = okVariant
            this.$bvModal.show('alertModal')
        },
    },
    watch: {
        'item.status'(newVal, oldval) {
            if(newVal == 'WAIT') newVal = '처리대기'
            if(newVal == 'ING') newVal = '처리중'
            if(newVal == 'CHECKED') newVal = '처리완료'

            if(oldval !== undefined) {
                const h = this.$createElement
                // Using HTML string
                const titleVNode = h('div', { domProps: { innerHTML: '처리상태 변경' } })
                // More complex structure
                const messageVNode = h('div', { class: ['foobar'] }, [
                    h('p', { class: ['mb-0'] }, [
                        // h('strong', { class: ['fw-900'] }, oldval),
                        // '에서 ',
                        h('strong', { class: ['fw-900 yellow-underline'] }, newVal),
                        ' 변경되었습니다. ',
                    ]),
                ])
                // We must pass the generated VNodes as arrays
                this.$bvModal.msgBoxOk([messageVNode], {
                    title: [titleVNode],
                    buttonSize: 'sm',
                    centered: true, 
                    size: 'sm',
                    okTitle: '확인',
                    okVariant: 'success',
                    footerClass: 'p-2',
                    noCloseOnBackdrop: true,
                    titleClass: 'fw-900',
                    footerBgVariant: 'white'
                }).then(() => {
                    this.updateStatus();
                })
            }
        },
    },
  }
</script>

<style lang="scss" scoped>
    .commentsWrap {
        // border-top: 1px solid rgba(0,0,0,.125);
        // border-bottom: 1px solid rgba(0,0,0,.125);
        // padding-top: 1rem;
        height: 35rem;
        overflow-y: scroll;
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
        &::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera*/
        }
        .card:last-child {
            margin-bottom: 0 !important;
        }
    }
    .card-text {
        font-weight: 900;
        margin-top: .5rem;
        font-size: 20px;
    }
    // .active {
    //     // border-color: #000;
    // }
    .text-muted {
        font-size: 17px;
    }
    .yellow-underline::before {
        bottom: 0;
    }
    .statusSelected {
        $wait: rgba(255, 69, 0, .8);
        $ing: lightseagreen;
        $checked: #aaa;
        $disable: lightgray;
        gap: 0 10px;
        .btn {
            background: #fff;
            font-size: 17px;
            font-weight: 700;
            border-radius: .25rem !important;
            padding: .375rem 1.5rem;
            color: $disable !important;
            border-color: $disable !important;
            &.active {
                color: #fff !important;
            }
        }
        .wait {
            &.active {
                background: $wait !important;
                border-color: $wait !important;
            }
        }
        .ing {
            &.active {
                background: $ing !important;
                border-color: $ing !important;
            }
        }
        .checked {
            &.active {
                background: $checked !important;
                border-color: $checked !important;
            }
        }
    }
</style>