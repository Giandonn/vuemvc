const AppTemplate = `
<div class="row">
     <div class="col-md-12">
                <ejs-grid
                    ref="grid"
                    :dataSource="dataSorceList"
                    :toolbar="toolbar"
                    :toolbarClick="toolbarClick"
                    :allowPaging="true"
                    :allowSorting="true"
                    :pageSettings="{ pageSizes: true, pageSize: 5 }"
                    :searchSettings="{ ignoreCase: true, ignoreAccent: true }">
                    <e-columns>
                        <e-column field="sequencia" textAlign="Left" headerText="seq"></e-column>
                        <e-column field="dataT" textAlign="Left" headerText="data"></e-column>
                        <e-column field="tipoT" textAlign="Left" headerText="tipo"></e-column>
                        <e-column field="tipofluxo" textAlign="Left" headerText="tipo f"></e-column>
                        <e-column field="valor" textAlign="Left" headerText="valor"></e-column>
                        <e-column field="obs" textAlign="Left" headerText="obs"></e-column>
                    </e-columns>
                </ejs-grid>
            </div>
        </div>
`;

Vue.component('AppVue', {
    template: AppTemplate,
    data() {
        return {
            dataSorceList: [],
            toolbarClick: [],
            toolbar: []
        }
    },
    methods: {
        getDados(){
            axios.post(BASE + "/relatorio/getDados").then(res =>{
                if (res.data.code == 1){
                    this.dataSorceList = res.data.data;
                } else if (res.data.code == 0){
                }
            });
        }
    },
    computed: {},
    mounted() {
        this.getDados();
    },
    watch: {}
})