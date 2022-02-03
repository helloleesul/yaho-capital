<template>
    <main>
        <b-container>
            <b-table striped :items="items" :fields="fields">
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
            },
            {
                key: 'tel',
                label: '연락처',
                sortable: false,
            },
            {
                key: 'contents',
                label: '신청내용',
                sortable: false,
            },
            {
                key: 'status',
                label: '처리상태',
                sortable: false,
            },
            {
                key: 'confirmUser',
                label: '처리자',
                sortable: false,
            },
            {
                key: 'confirmUser',
                label: '처리자',
                sortable: false,
            },
        ],
        items: [
          {id: 1, name: '홍길동', tel: '01012345678', status: '처리중', confirmUser: 'admin'},
          {id: 2, name: '홍길동', tel: '01012345678', status: '처리중', confirmUser: 'admin'},
          {id: 3, name: '홍길동', tel: '01012345678', status: '처리중', confirmUser: 'admin'},
          {id: 4, name: '홍길동', tel: '01012345678', status: '처리중', confirmUser: 'admin'},
          {id: 5, name: '홍길동', tel: '01012345678', status: '처리중', confirmUser: 'admin'},
          {id: 6, name: '홍길동', tel: '01012345678', status: '처리중', confirmUser: 'admin'},
        ]
      }
    }
  }
</script>

<style>

</style>