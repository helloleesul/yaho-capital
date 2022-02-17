<template>
    <main>
        <b-container>
            <!-- {{item}} -->
            <!-- {{item.comments}} -->
            <b-row class="align-items-start justify-content-between">
                <!-- 상담신청 상세 -->
                <b-col :style="{marginRight:'3rem'}">
                    <b-row class="mb-3 align-items-center">
                        <b-col>
                            <b-btn
                            @click="$router.go(-1)"
                            ><font-awesome-icon icon="bars" /> 목록으로</b-btn>
                        </b-col>
                        <b-col class="text-right">
                            <span class="text-muted">처리자 </span>
                            <font-awesome-icon icon="user" /> {{ item.user == null ? '-' : item.user.serviceId}}
                        </b-col>
                    </b-row>
                    <b-card no-body v-model="item">
                        <template #header>
                            <span class="text-muted">상담신청 상세</span>
                        </template>

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
                        </b-list-group>

                        <b-card-body>
                            <span class="text-muted">상담신청 내용</span>
                            <b-card-text>
                                <span v-if="!item.content" class="text-danger">상담내용이 없습니다.</span>
                                <span v-else>{{item.content}}</span>
                            </b-card-text>
                        </b-card-body>

                        <b-card-footer>
                            <b-row class="align-items-center">
                                <b-col class="text-right">
                                    <span class="text-muted">신청일시</span>
                                    {{ $moment(item.createDate).format('YYYY-MM-DD hh:mm a') }}
                                </b-col>
                                <!-- <b-col class="text-right">
                                    <span class="text-muted">처리자</span>
                                    <font-awesome-icon icon="user" /> {{ item.user == null ? '-' : item.user.serviceId}}
                                </b-col> -->
                            </b-row>
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
                            v-model="item.status"
                            :options="statusOptions"
                            buttons>
                            </b-form-radio-group>
                        </b-col>
                        <b-col class="text-right">
                            <b-btn @click="newCommentToggle()">
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
                        <template #header>
                            <b-row class="align-items-center">
                                <b-col>
                                    <font-awesome-icon icon="user" />
                                    {{ $store.state.serviceId }}
                                </b-col>
                                <b-col class="text-right">
                                    <b-btn size="sm" @click="addComment()">저장</b-btn>
                                </b-col>
                            </b-row>
                        </template>

                        <b-card-body>
                            <b-form-textarea
                            size="sm"
                            placeholder="처리기록 내용을 입력하세요."
                            rows="3"
                            max-rows="6"
                            v-model="newCommentContent"
                            ref="commentInput"
                            ></b-form-textarea>
                        </b-card-body>

                        <!-- <b-card-footer>
                            <b-row class="align-items-center">
                                <b-col class="text-right">
                                    <b-btn size="sm" @click="addComment()">저장</b-btn>
                                </b-col>
                            </b-row>
                        </b-card-footer> -->
                    </b-card>

                    <!-- 기록 없을 때 -->
                    <b-card v-if="item.comments === null || !item.comments.length"
                    border-variant="warning"
                    text-variant="warning"
                    align="center">
                        <b-card-text>작성된 기록이 없습니다.</b-card-text>
                    </b-card>

                    <!-- 기록 -->
                    <section v-else class="commentsWrap">
                        <b-card
                        no-body
                        class="mb-3"
                        v-for="list in item.comments"
                        :key="list.id"
                        >
                            <template #header>
                                <b-row class="align-items-center">
                                    {{list.id}}
                                    <b-col>
                                        <span class="text-muted">기록자 </span>
                                        <font-awesome-icon icon="user" /> {{list.user.serviceId}}
                                    </b-col>
                                    <!-- <b-col class="text-right">
                                        <span class="text-muted">작성일시</span>
                                        {{ $moment(list.createDate).format('YYYY-MM-DD hh:mm a') }}
                                    </b-col> -->
                                    <b-col class="text-right" v-if="$store.state.serviceId == list.user.serviceId">
                                        <b-btn v-if="list.edit" size="sm" class="mx-2" @click="updateComment(list)">저장</b-btn>
                                        <b-btn v-else size="sm" class="mx-2" @click="editBtn(list)">수정</b-btn>
                                        <b-btn size="sm" variant="danger" @click="delComment(list)">삭제</b-btn>
                                    </b-col>
                                </b-row>
                            </template>

                            <b-card-body v-if="list.edit">
                                <div>
                                    <b-card-sub-title class="mb-2">처리기록 내용</b-card-sub-title>
                                    <b-form-textarea
                                    size="sm"
                                    v-model="list.content"
                                    placeholder="처리기록 내용을 입력하세요."
                                    rows="3"
                                    max-rows="6"
                                    ></b-form-textarea>
                                </div>
                            </b-card-body>
                            <b-card-body v-else>
                                <div>
                                    <b-card-sub-title class="mb-2">처리기록 내용</b-card-sub-title>
                                    <b-card-text>{{list.content}}</b-card-text>
                                </div>
                            </b-card-body>

                            <b-card-footer>
                                <b-row class="align-items-center">
                                    <b-col v-if="$moment(list.createDate).format('YYYY-MM-DD hh:mm a') !== $moment(list.updateDate).format('YYYY-MM-DD hh:mm a')">
                                        <span class="text-muted">수정일시</span>
                                        {{ $moment(list.updateDate).format('YYYY-MM-DD hh:mm a') }}
                                    </b-col>
                                    <b-col class="text-right">
                                        <span class="text-muted">작성일시</span>
                                        {{ $moment(list.createDate).format('YYYY-MM-DD hh:mm a') }}
                                    </b-col>
                                    <!-- {{list.edit}} -->
                                    <!-- <b-col class="text-right" v-if="$store.state.serviceId == list.user.serviceId">
                                        <b-btn v-if="list.edit" size="sm" class="mx-2" @click="updateComment(list)">저장</b-btn>
                                        <b-btn v-else size="sm" class="mx-2" @click="editBtn(list)">수정</b-btn>
                                        <b-btn size="sm" variant="danger" @click="delComment(list)">삭제</b-btn>
                                    </b-col> -->
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
      }
    },
    computed: {
        id() {
            return this.$route.params.id;
        },
    },
    mounted() {
        this.getInquiryDetail();
    },
    created() {
        
    },
    methods: {
        async updateStatus(){
            await this.$axios.put("/admin/inquiry/"+this.id, {
                status: this.item.status
            });
            this.getInquiryDetail()
        },
        async updateComment(list){
            const { data } = await this.$axios.put("/admin/comments/"+list.id, {
                content: list.content
            });
            console.log(data)
            if (data.code === "0000") {
                this.$bvModal.msgBoxOk('기록이 수정되었습니다.', {
                    title: '기록 수정',
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'success',
                    centered: true,
                    okTitle: '확인',
                    footerClass: 'p-2',
                }).then(() => {
                    list.edit = false;
                    this.getInquiryDetail()
                })
            } else if (data.code === "4001") {
                this.$bvModal.msgBoxOk('내용을 입력해주세요.', {
                    title: '내용 입력',
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'danger',
                    centered: true,
                    okTitle: '확인',
                    footerClass: 'p-2',
                }).then(() => {
                    this.getInquiryDetail()
                })
            } else if (data.code === "4040") {
                this.$bvModal.msgBoxOk('요청하신 정보를 찾을 수 없습니다.', {
                    title: '기록 ID 불일치',
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'danger',
                    centered: true,
                    okTitle: '확인',
                    footerClass: 'p-2',
                })
            }
            // console.log(list.id)
            // console.log(list)
            // console.log(list.content)
        },
        async addComment(){
            const { data } = await this.$axios.post("/admin/comments/"+this.id, {
                content: this.newCommentContent
            });
            console.log(data)
            if (data.code === "0000") {
                this.$bvModal.msgBoxOk('새 기록이 작성되었습니다.', {
                    title: '기록 작성',
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'success',
                    centered: true,
                    okTitle: '확인',
                    footerClass: 'p-2',
                }).then(() => {
                    this.newCommentShow = false;
                    this.newCommentContent = null;
                    this.getInquiryDetail();
                })
            } else if (data.code === "4001") {
                this.$refs.commentInput.focus()
                this.$bvModal.msgBoxOk('내용을 입력해주세요.', {
                    title: '내용 입력',
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'danger',
                    centered: true,
                    okTitle: '확인',
                    footerClass: 'p-2',
                })
            } else if (data.code === "4040") {
                this.$bvModal.msgBoxOk('요청하신 정보를 찾을 수 없습니다.', {
                    title: '기록 ID 불일치',
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'danger',
                    centered: true,
                    okTitle: '확인',
                    footerClass: 'p-2',
                })
            }
            // console.log(this.item.comments.content)
        },
        async getInquiryDetail(){
            const { data } = await this.$axios.get("/admin/inquiry/"+this.id);
            console.log(data);

            this.item = data.data;
            this.itemPhone = data.data.phone;

            if (this.item.comments !== null) {
                this.item.comments.forEach(function(el) {
                    // console.log(el)
                    this.$set(el, 'edit', false)
                }, this)
            }

        },
        newCommentToggle() {
            this.newCommentShow = !this.newCommentShow
        },
        async delComment(list) {
            const { data } = await this.$axios.delete("/admin/comments/"+list.id);
            console.log(data)

            this.$bvModal.msgBoxConfirm('기록을 삭제하시겠습니까?', {
            title: '처리기록 삭제',
            size: 'sm',
            buttonSize: 'sm',
            okVariant: 'danger',
            okTitle: '삭제',
            cancelTitle: '취소',
            footerClass: 'p-2',
            centered: true
            }).then(()=> {
                this.getInquiryDetail()
            });
        },
        editBtn(list) {
            list.edit = true
            // console.log(list, i)
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
        }
    },
    watch: {
        'item.status'(newVal, oldval) {
            if(newVal == 'WAIT') newVal = '처리대기'
            if(newVal == 'ING') newVal = '처리중'
            if(newVal == 'CHECKED') newVal = '처리완료'
            // if(oldval == 'WAIT') oldval = '처리대기'
            // if(oldval == 'ING') oldval = '처리중'
            // if(oldval == 'CHECKED') oldval = '처리완료'

            if(oldval !== undefined) {
                const h = this.$createElement
                // Using HTML string
                const titleVNode = h('div', { domProps: { innerHTML: '처리상태 변경' } })
                // More complex structure
                const messageVNode = h('div', { class: ['foobar'] }, [
                    h('p', { class: ['mb-0'] }, [
                        // h('strong', { class: ['fw-900'] }, oldval),
                        // '에서 ',
                        h('strong', { class: ['fw-900 text-danger'] }, newVal),
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