<template>
    <main>
        <b-container>
            정렬: 
            <b-form-select
            v-model="filter">
                <option value="">전체</option>
                <option value="처리대기">처리대기</option>
                <option value="처리중">처리중</option>
                <option value="처리완료">처리완료</option>
            </b-form-select>
            <!-- <b-form-radio-group
            v-model="filter"
            buttons
            class="statusSelected"
            >
                <b-form-radio value="">전체</b-form-radio>
                <b-form-radio value="처리대기">처리대기</b-form-radio>
                <b-form-radio value="처리중">처리중</b-form-radio>
                <b-form-radio value="처리완료">처리완료</b-form-radio>
            </b-form-radio-group> -->

            <b-table caption-top :filter="filter" class="text-center" head-row-variant="light" no-border-collapse 
            :items="items" :fields="fields">
                <template #table-caption>This is a table caption at the top.</template>
                <template #cell(contents)="row">
                    <b-button size="sm" @click="row.toggleDetails" class="mr-2">
                    {{ row.detailsShowing ? '닫기' : '보기'}}
                    </b-button>
                </template>
                <template #row-details="row">
                    <b-card>
                        <b-row class="">
                            <b-col sm="3" class="text-sm-right"><b>신청내용:</b></b-col>
                            <b-col>{{ row.item.age }}</b-col>
                        </b-row>
                    </b-card>
                </template>

                <template #cell(details)="row">
                    <b-button size="sm" class="mr-2"
                    @click="$router.push(`/admin/inquiryList/${row.item.id}`)">
                        자세히보기
                    </b-button>
                </template>
            </b-table>
        </b-container>
    </main>
</template>

<script>
export default {
    data() {
      return {
        fields: [
            {
                key: 'id',
                label: '순번',
                sortable: true,
            },
            {
                key: 'name',
                label: '이름',
                sortable: false,
                filterByFormatted: true
            },
            {
                key: 'tel',
                label: '연락처',
                sortable: false,
                filterByFormatted: true
            },
            {
                key: 'status',
                label: '처리상태',
                sortable: false,
                tdClass: (value) => {
                    if (value === '처리대기') return 'table-danger'
                    if (value === '처리중') return 'table-warning'
                    if (value === '처리완료') return 'table-success'
                },
            },
            {
                key: 'confirmUser',
                label: '처리자',
                sortable: false,
                filterByFormatted: true
            },
            {
                key: 'contents',
                label: '신청내용',
                sortable: false,
            },
            {
                key: 'details',
                label: '상세',
                sortable: false,
            },
        ],
        items: [
          {id: 1, name: '홍길동', tel: '01012345678', status: '처리중', confirmUser: 'admin'},
          {id: 2, name: '김민지', tel: '01012345678', status: '처리완료', confirmUser: 'admin'},
          {id: 3, name: '오성윤', tel: '01012345678', status: '처리중', confirmUser: 'admin'},
          {id: 4, name: '김도경', tel: '01012345678', status: '처리대기', confirmUser: 'admin'},
          {id: 5, name: '임하나', tel: '01012345678', status: '처리중', confirmUser: 'admin'},
          {id: 6, name: '윤민주', tel: '01012345678', status: '처리중', confirmUser: 'admin'},
        ],
        filter: '',
      }
    },
    methods: {
    },
    computed: {
    },
  }
</script>

<style lang="scss">
</style>