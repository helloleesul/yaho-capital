<template>
    <main>
        <b-container>
            {{item}}
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
                    <b-card no-body v-model="item">
                        <template #header>
                            <span class="text-muted">이름</span>
                            <h5 class="mb-0">{{ item.name }}</h5>
                        </template>

                        <b-list-group flush>
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
                            <b-card-text>
                                <span class="text-muted">신청일시</span>
                                {{ $moment(item.createDate).format('YYYY-MM-DD hh:mm a') }}
                            </b-card-text>
                            <b-card-text>
                                <span class="text-muted">처리자</span>
                                <font-awesome-icon icon="user" /> {{ item.user == null ? '-' : item.user.serviceId}}
                            </b-card-text>
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
                                <font-awesome-icon :icon="newComment ? 'minus' : 'plus'" />
                                기록 작성
                            </b-btn>
                        </b-col>
                    </b-row>
                    <!-- 작성 -->
                    <b-card 
                    no-body
                    class="mb-3"
                    v-if="newComment"
                    >
                        <template #header>
                            <b-row class="align-items-center">
                                <b-col class="text-right">
                                    <font-awesome-icon icon="user" /> {{ $store.state.serviceId }}
                                </b-col>
                            </b-row>
                        </template>

                        <b-card-body>
                            <b-form-textarea
                            size="sm"
                            placeholder="처리기록 내용을 입력하세요."
                            rows="3"
                            max-rows="6"
                            v-model="item.comments.content"
                            ></b-form-textarea>
                        </b-card-body>

                        <b-card-footer>
                            <b-row class="align-items-center">
                                <b-col class="text-right">
                                    <b-btn size="sm" @click="addComment()">저장</b-btn>
                                </b-col>
                            </b-row>
                        </b-card-footer>
                    </b-card>

                    <!-- 기록 없을 때 -->
                    <b-card v-if="!item.comments"
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
                        v-for="(list, i) in item.comments"
                        :key="list.id"
                        >
                            <template #header>
                                <b-row class="align-items-center">
                                    {{list.id}}
                                    <b-col class="text-right">
                                        <font-awesome-icon icon="user" /> {{list.user.serviceId}}
                                    </b-col>
                                </b-row>
                            </template>

                            <b-card-body>
                                <div>
                                    <b-card-sub-title class="mb-2">처리기록 내용</b-card-sub-title>
                                    <b-form-textarea
                                    v-if="list.edit"
                                    size="sm"
                                    v-model="list.content"
                                    rows="3"
                                    max-rows="6"
                                    ref="editInput"
                                    ></b-form-textarea>
                                    <b-card-text v-else>{{list.content}}</b-card-text>
                                </div>
                            </b-card-body>

                            <b-card-footer>
                                <b-row class="align-items-center">
                                    <b-col>
                                        <span class="text-muted">작성일시</span>
                                        {{ $moment(list.createDate).format('YYYY-MM-DD hh:mm a') }}
                                    </b-col>
                                    <b-col class="text-right" v-if="$store.state.serviceId == list.user.serviceId">
                                        <b-btn v-if="list.edit" size="sm" class="mx-2" @click="editComment(i)">저장</b-btn>
                                        <b-btn v-else size="sm" class="mx-2" @click="editBtn(i)">수정</b-btn>
                                        <b-btn size="sm" variant="danger" @click="delComment(list, i)">삭제</b-btn>
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
        statusOptions: [
            { text: '처리대기', value: 'WAIT' },
            { text: '처리중', value: 'ING' },
            { text: '처리완료', value: 'CHECKED' },
        ],
        newComment: false,
        item: {
            name: null,
            phone: null,
        },
        itemPhone: null,
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
    methods: {
        async updateStatus(){
            await this.$axios.put("/admin/inquiry/"+this.id, {
                status: this.item.status
            });
        },
        async updateComment(){
            await this.$axios.put("/admin/comments/"+this.id, {
                content: this.item.content
            });
        },
        async addComment(){
            const { data } = await this.$axios.post("/admin/comments/"+this.id, this.item);
            console.log(data)
            console.log(this.item)

            // if (data.code === "0000") {
            //     this.$bvModal.msgBoxOk('상담신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.', {
            //         title: '상담신청 완료',
            //         size: 'sm',
            //         buttonSize: 'sm',
            //         okVariant: 'success',
            //         centered: true,
            //         okTitle: '확인',
            //         footerClass: 'p-2',
            //     }).then(value => {
            //         console.log(value)
            //         Object.assign(this.$data, this.$options.data());
            //         this.$refs.observer.reset();
            //         this.checkHide = true;
            //     })
            // } 
        },
        async getInquiryDetail(){
            const { data } = await this.$axios.get("/admin/inquiry/"+this.id);
            console.log(data);

            this.item = data.data;
            this.itemPhone = data.data.phone;
        },
        newCommentToggle() {
            this.newComment = !this.newComment
        },
        delComment(list, i) {
            console.log(list, i)
            // this.selectComment = i;
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
        editBtn(i) {
            this.item.comments[i].edit = true;
            // this.$nextTick(function () {
            //     this.$refs.editInput;
            // })
        },
        editComment(i) {
            this.item.comments[i].edit = false;
            // this.$nextTick(function () {
            //     this.$refs.editInput;
            // })
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
                    size: 'md',
                    okTitle: '확인',
                    okVariant: 'success',
                    footerClass: 'p-2',
                })
                this.updateStatus()
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