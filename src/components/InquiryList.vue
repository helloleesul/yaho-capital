<template>
    <main>
        <!-- <p>리스트: {{ inquiryItems }}</p> -->
        <!-- <p>총 리스트 행 수: {{totalElements}}</p> -->
        <!-- <p>총 페이지 수: {{totalPages}}</p> -->
        <!-- <p>현재 페이지 넘버: {{currentPage}}</p> -->
        <!-- <p>서버 페이지 넘버: {{serverPageNum}}</p> -->
        <!-- <p>리스트 갯수 제한: {{perPage}}</p> -->
        <!-- <p>{{inquiryItems[2].user.serviceId === null ? 'ㄴㄴㄴㄴ' : inquiryItems[2].user.serviceId}}</p> -->
        
        <b-container>
            <h1>상담 리스트</h1>
            정렬: 
            <b-form-select
            v-model="filter" class="p-1">
                <b-form-select-option value="">전체</b-form-select-option>
                <b-form-select-option value="WAIT">처리대기</b-form-select-option>
                <b-form-select-option value="ING">처리중</b-form-select-option>
                <b-form-select-option value="CHECKED">처리완료</b-form-select-option>
            </b-form-select>
            <!-- <b-form-group
            label="Filter"
            label-for="filter-input"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            class="mb-0"
            >
            <b-input-group size="sm">
                <b-form-input
                id="filter-input"
                v-model="filter"
                type="search"
                placeholder="Type to Search"
                ></b-form-input>

                <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                </b-input-group-append>
            </b-input-group>
            </b-form-group> -->

            <b-table caption-top class="text-center" head-row-variant="light" no-border-collapse
            :items="inquiryItems" :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
            :filter="filter"
            :filter-included-fields="filterOn"
            @filtered="onFiltered">
                <template #table-caption>This is a table caption at the top.</template>
                <template #cell(status)="row">
                    {{row.item.status == 'WAIT' ? '처리대기' : ''}}
                    {{row.item.status == 'ING' ? '처리중' : ''}}
                    {{row.item.status == 'CHECKED' ? '처리완료' : ''}}
                </template>
                <template #cell(user)="row">
                    {{row.item.user == null ? '-' : row.item.user.serviceId}}
                </template>
                <template #cell(phone)="row">
                    <!-- {{ row.item.phone }} -->
                    {{ phoneFomatter(row.item.phone) }}
                    <!-- {{row.item.phone.length == 11 ? row.item.phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3") : '' }}
                    {{row.item.phone.length == 10 ? row.item.phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3") : '' }}
                    {{row.item.phone.length == 9 ? row.item.phone.replace(/(\d{2})(\d{3})(\d{4})/, "$1-$2-$3") : '' }} -->
                </template>
                <template #cell(details)="row">
                    <b-button size="sm" class="mr-2"
                    @click="$router.push(`/admin/inquiryList/${row.item.id}`)">
                        관리
                    </b-button>
                </template>
            </b-table>
            <b-pagination
            v-model="currentPage"
            :total-rows="totalElements"
            :per-page="perPage"
            align="center"
            class="mt-5 mb-0"
            ></b-pagination>
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
                thClass: 'w10',
            },
            {
                key: 'name',
                label: '이름',
                sortable: false,
                thClass: 'w20',
                filterByFormatted: true,
            },
            {
                key: 'phone',
                label: '연락처',
                sortable: false,
                thClass: 'w20',
                filterByFormatted: true
            },
            {
                key: 'status',
                label: '상태',
                sortable: false,
                thClass: 'w10',
                tdClass: (value) => {
                    if (value === 'WAIT') return 'table-danger'
                    if (value === 'ING') return 'table-warning'
                    if (value === 'CHECKED') return 'table-success'
                },
            },
            {
                key: 'user',
                label: '처리자',
                thClass: 'w10',
                sortable: false,
                filterByFormatted: true,
            },
            // {
            //     key: 'contents',
            //     label: '신청내용',
            //     sortable: false,
            // },
            {
                key: 'details',
                label: '상세보기',
                thClass: 'w10',
                sortable: false,
            },
        ],
        filter: '',
        filterOn: [],
        inquiryItems: null,
        totalElements: null,
        // totalPages: null,
        currentPage: 1,
        perPage: 10,
        // serverPageNum: null,
      }
    },
    mounted() {
        this.getInquiry();
    },
    methods: {
        async getInquiry(){
            // const { data } = await this.$axios.get("/admin/inquiry?page=1");
            const { data } = await this.$axios.get("/admin/inquiry");
            console.log(data);
            
            this.inquiryItems = data.data;
            this.totalElements = data.data.length;
            // this.totalElements = data.data.totalElements;
            // this.totalPages = data.data.totalPages;
            // this.serverPageNum = data.data.number;
            // this.perPage = data.data.size;
        },
        onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalElements = filteredItems.length
            this.currentPage = 1
        },
        phoneFomatter(num) {
            if (num?.length == 11) {
                this.inquiryItems.phone = num.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
            } else if (num?.length == 10) {
                this.inquiryItems.phone = num.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
            } else if (num?.length == 9) {
                this.inquiryItems.phone = num.replace(/(\d{2})(\d{3})(\d{4})/, "$1-$2-$3");
            } 
            return this.inquiryItems.phone;
        }
    },
    computed: {
    },
  }
</script>

<style lang="scss">
</style>