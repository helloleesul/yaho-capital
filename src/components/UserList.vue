<template>
    <main>
        <!-- <p>리스트: {{ userItems }}</p> -->
        <!-- <p>총 리스트 행 수: {{totalElements}}</p> -->
        <!-- <p>총 페이지 수: {{totalPages}}</p> -->
        <!-- <p>현재 페이지 넘버: {{currentPage}}</p> -->
        <!-- <p>서버 페이지 넘버: {{serverPageNum}}</p> -->
        <!-- <p>리스트 갯수 제한: {{perPage}}</p> -->
        <!-- <p>{{userItems[2].user.serviceId === null ? 'ㄴㄴㄴㄴ' : userItems[2].user.serviceId}}</p> -->
        
        <b-container>
            <h1>계정 리스트</h1>
            <!-- 정렬: 
            <b-form-select
            v-model="filter" class="p-1">
                <b-form-select-option value="">전체</b-form-select-option>
                <b-form-select-option value="WAIT">처리대기</b-form-select-option>
                <b-form-select-option value="ING">처리중</b-form-select-option>
                <b-form-select-option value="CHECKED">처리완료</b-form-select-option>
            </b-form-select> -->
            <b-button size="sm" class="mr-2"
            @click="$router.push('/admin/userCreate')">
                계정 생성
            </b-button>
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
            :items="userItems" :fields="fields"
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
                <template #cell(email)="row">
                    {{row.item.email == null ? '-' : row.item.email}}
                </template>
                <template #cell(phone)="row">
                    {{row.item.phone == null ? '-' : phoneFomatter(row.item.phone)}}
                </template>
                <template #cell(leave)="row">
                    {{row.item.leave ? '비활성' : '활성'}}
                    <!-- {{ $store.state.serviceId == row.item.serviceId ? '(나)' : '' }} -->
                </template>
                <template #cell(control)="row">
                    <b-button size="sm" class="mr-2" @click="leaveToggle(row)" v-if="$store.state.serviceId !== row.item.serviceId">
                        {{row.item.leave ? '활성' : '비활성'}}
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
                key: 'serviceId',
                label: '아이디',
                sortable: false,
                thClass: 'w10',
                filterByFormatted: true,
            },
            {
                key: 'name',
                label: '이름',
                sortable: false,
                thClass: 'w10',
                filterByFormatted: true,
            },
            {
                key: 'email',
                label: '이메일',
                sortable: false,
                thClass: 'w20',
                filterByFormatted: true
            },
            {
                key: 'phone',
                label: '연락처',
                sortable: false,
                thClass: 'w20',
                filterByFormatted: true
            },
            {
                key: 'role',
                label: '권한',
                sortable: false,
                thClass: 'w10',
                // tdClass: (value) => {
                //     if (value === 'SUPER') return 'table-danger'
                //     if (value === 'ADMIN') return 'table-warning'
                // },
            },
            {
                key: 'leave',
                label: '회원상태',
                thClass: 'w10',
                sortable: false,
                filterByFormatted: true,
                tdClass: (value) => {
                    if (value) return 'table-danger'
                },
            },
            {
                key: 'control',
                label: '상태변경',
                thClass: 'w30',
                sortable: false,
                filterByFormatted: true,
            },
        ],
        filter: '',
        filterOn: [],
        userItems: null,
        totalElements: null,
        // totalPages: null,
        currentPage: 1,
        perPage: 10,
        // serverPageNum: null,
      }
    },
    mounted() {
        this.getUser();
    },
    methods: {
        async getUser(){
            const { data } = await this.$axios.get("/admin/users");
            console.log(data);
            
            this.userItems = data.data;
            this.totalElements = data.data.length;
        },
        async leaveToggle(row){
            this.userItems.leave = row.item.leave
            row.item.leave = !row.item.leave
            
            const { data } = await this.$axios.get("/admin/users/leave/"+row.item.id);
            console.log(data);
            // console.log(row.item.leave);
            // console.log(this.userItems.leave);
        },
        onFiltered(filteredItems) {
            this.totalElements = filteredItems.length
            this.currentPage = 1
        },
        phoneFomatter(num) {
            if (num?.length == 11) {
                this.userItems.phone = num.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
            } else if (num?.length == 10) {
                this.userItems.phone = num.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
            } else if (num?.length == 9) {
                this.userItems.phone = num.replace(/(\d{2})(\d{3})(\d{4})/, "$1-$2-$3");
            } 
            return this.userItems.phone;
        }
    },
    computed: {
    },
  }
</script>

<style lang="scss">
</style>