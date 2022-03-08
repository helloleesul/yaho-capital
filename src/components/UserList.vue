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
      <b-row class="yellow-wrap title mb-5">
        <p class="text-30 fw-900 m-0">계정 목록</p>
      </b-row>
      <b-row class="mb-3">
        <b-col>
          <b-btn
            @click="$router.push('/admin/userCreate')"
            pill
            block
            :style="{ background: '#FDDA00', border: '3px solid #000' }"
          >
            <span class="text-18 px-2 fw-900" :style="{ color: '#000' }"
              >새 계정 추가</span
            >
          </b-btn>
        </b-col>
        <b-col class="col-3">
          <b-form-group v-slot="{ ariaDescribedby }">
            <b-input-group>
              <b-form-input
                class="mx-2"
                id="filter-input"
                v-model="filter"
                :aria-describedby="ariaDescribedby"
                type="search"
                placeholder="검색어를 입력하세요."
              ></b-form-input>
              <b-input-group-append>
                <b-btn
                  @click="filter = ''"
                  :disabled="!filter"
                  variant="outline-dark"
                  >초기화</b-btn
                >
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>

      <b-table
        caption-top
        class="text-center"
        head-row-variant="light"
        no-border-collapse
        hover
        :items="userItems"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :filter-included-fields="filterOn"
        @filtered="onFiltered"
      >
        <!-- <template #table-caption>This is a table caption at the top.</template> -->
        <template #cell(email)="row">
          {{ row.item.email == null || !row.item.email ? "-" : row.item.email }}
        </template>
        <template #cell(phone)="row">
          {{
            row.item.phone == null || !row.item.phone
              ? "-"
              : phoneFomatter(row.item.phone)
          }}
        </template>
        <template #cell(role)="row">
          {{ row.item.role == "ADMIN" ? "관리자" : "" }}
          {{ row.item.role == "SUPER" ? "최고관리자" : "" }}
          <!-- {{ $store.state.serviceId == row.item.serviceId ? '(나)' : '' }} -->
        </template>
        <template #cell(second)="row">
          <span class="status text-white px-3 py-1">
            {{ row.item.second ? "완료" : "미완료" }}
          </span>
          <!-- {{row.item.second}} -->
        </template>
        <template #cell(leave)="row">
          <span class="status text-white px-3 py-1">
            {{ row.item.leave ? "비활성" : "활성" }}
          </span>
          <!-- {{row.item.leave}} -->
        </template>
        <template #cell(control)="row">
          <b-button
            size="sm"
            pill
            :style="{ width: '2.5rem', height: '2.5rem' }"
            variant="outline-dark"
            @click="leaveToggle(row)"
            v-if="$store.state.serviceId !== row.item.serviceId"
          >
            <div class="d-flex justify-content-center">
              <font-awesome-icon icon="sync-alt" class="fa-lg" />
            </div>
          </b-button>
          <!-- <b-button size="sm" class="mr-2" @click="leaveToggle(row)" v-if="$store.state.serviceId !== row.item.serviceId">
                        {{row.item.leave ? '활성' : '비활성'}}
                    </b-button> -->
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
          key: "id",
          label: "순번",
          sortable: true,
          thClass: "w10",
        },
        {
          key: "serviceId",
          label: "아이디",
          sortable: false,
          thClass: "w10",
          filterByFormatted: true,
        },
        {
          key: "name",
          label: "이름",
          sortable: false,
          thClass: "w5",
          filterByFormatted: true,
        },
        {
          key: "email",
          label: "이메일",
          sortable: false,
          thClass: "w20",
          filterByFormatted: true,
        },
        {
          key: "phone",
          label: "연락처",
          sortable: false,
          thClass: "w15",
          filterByFormatted: true,
        },
        {
          key: "role",
          label: "권한",
          sortable: false,
          thClass: "w10",
          // tdClass: (value) => {
          //     if (value === 'SUPER') return 'table-danger'
          //     if (value === 'ADMIN') return 'table-warning'
          // },
        },
        {
          key: "second",
          label: "비밀번호변경",
          thClass: "w10",
          sortable: false,
          filterByFormatted: true,
          tdClass(value) {
            if (value) return "checked";
            if (!value) return "wait";
          },
        },
        {
          key: "leave",
          label: "회원상태",
          thClass: "w10",
          sortable: false,
          filterByFormatted: true,
          tdClass(value) {
            if (value) return "checked";
            if (!value) return "ing";
          },
        },
        {
          key: "control",
          label: "상태변경",
          thClass: "w10",
          sortable: false,
          filterByFormatted: true,
        },
      ],
      filter: "",
      filterOn: [],
      userItems: null,
      totalElements: null,
      // totalPages: null,
      currentPage: 1,
      perPage: 10,
      // serverPageNum: null,
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    async getUser() {
      const { data } = await this.$axios.get("/admin/users");
      console.log(data);

      this.userItems = data.data;
      this.totalElements = data.data.length;
    },
    async leaveToggle(row) {
      this.userItems.leave = row.item.leave;
      row.item.leave = !row.item.leave;

      const { data } = await this.$axios.get(
        "/admin/users/leave/" + row.item.id
      );
      console.log(data);
      console.log(row.item.leave);
      // console.log(this.userItems.leave);
      const h = this.$createElement;
      const titleVNode = h("div", { domProps: { innerHTML: "회원상태 변경" } });
      const messageVNode = h("div", { class: ["foobar"] }, [
        h("p", { class: ["mb-0"] }, [
          h("strong", { class: ["fw-900"] }, row.item.name),
          "님을 ",
          h(
            "strong",
            { class: ["fw-900 yellow-underline"] },
            row.item.leave ? "비활성" : "활성"
          ),
          "상태로 변경했습니다. ",
        ]),
      ]);
      // We must pass the generated VNodes as arrays
      this.$bvModal.msgBoxOk([messageVNode], {
        title: [titleVNode],
        buttonSize: "sm",
        centered: true,
        size: "sm",
        okTitle: "확인",
        okVariant: "success",
        footerClass: "p-2",
        noCloseOnBackdrop: true,
        titleClass: "fw-900",
        footerBgVariant: "white",
      });
    },
    onFiltered(filteredItems) {
      this.totalElements = filteredItems.length;
      this.currentPage = 1;
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
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
table {
  border-top: 1px solid #dee2e6;
}
.yellow-underline::before {
  bottom: 0;
}
</style>
