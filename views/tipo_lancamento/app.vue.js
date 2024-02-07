const AppTemplate = `

<div class="control-section" style="margin-top: 5%">

    <div class="row">
        <div class="col-md-12">
            <ejs-dialog
                isModal="true"
                :header="modalHeader"
                :buttons="modalButtons"
                :open="(args) => {args.preventFocus = false;} /*tirar o foco do botão primário do modal*/"
                ref="modal"
                v-bind:visible="false"
                :animationSettings="{ effect: 'Zoom' }"
                :showCloseIcon='false'
                :closeOnEscape="false"
                target='body'
                width="900px">

                <div class="row" style="margin-top: 10px;">
                    <div class="col-md-6">
                        <ejs-textbox 
                            floatLabelType="Auto"
                            v-model="dadosManipulando.DESCRICAO"
                            ref="desc"
                            cssClass="e-outline" 
                            placeholder="Descrição">
                        </ejs-textbox>
                    </div>
                </div>
        </div>
        
    <div class="row" style="margin-top: 10%;">
        <div class="col-md-12">
            <ejs-grid
                ref="grid"
                :dataSource="dataSourceList"
                :toolbar="toolbar"
                :toolbarClick="toolbarClick"
                :allowPaging="true"
                :allowSorting="true"
                :pageSettings="{ pageSizes: true, pageSize: 20 }"
                :searchSettings="{ ignoreCase: true, ignoreAccent: true }">
                    <e-columns>
                        <e-column field="descricao" textAlign="Left" headerText="DESCRIÇÃO"></e-column>
                        <e-column field="sequencia" textAlign="Left" headerText="SEQUENCIA"></e-column>
                    </e-columns>
            </ejs-grid>
        </div>
    </div>
</div>
`;

Vue.component('AppVue', {
    template: AppTemplate,
    data: function() {
        return {
            dataSourceList: [],
            dadosManipulando: {
                DESCRICAO: null
            },
            modalHeader: null,
            modalButtons: null,
            list: [],
            toolbar: [
                "Search",
                {
                    text: "Adicionar",
                    toolGrupoText: "add",
                    prefixIcon: "fas fa-plus",
                    id: "Adicionar"
                },
                {
                    text: "Editar",
                    toolGrupoText: "edit",
                    prefixIcon: "fas fa-pen-square",
                    id: "Editar"
                },
                {
                    text: "Excluir",
                    toolGrupoText: "Excluir",
                    prefixIcon: "fas fa-trash",
                    id: "Excluir"
                },
            ]
        }
    },
    methods: {
        hide(){
            let hide = this.dadosManipulando;
            hide.DESCRICAO = null;
        },

        editTypeLanc(){
            axios.post(BASE + "/tipo_lancamento/editTypeLanc", this.dadosManipulando).then(res=>{
                if(res.data.code == 1){
                    this.hide();
                    this.getDados();
                    this.fecharModal();
                    alert("Registro Atualizado com sucesso");
                } else if (res.data.code == 0){
                    alert(res.data.txt);
                }
            });
        },

        newTypeLanc(){
            axios.post(BASE + "/tipo_lancamento/newTypeLanc", this.dadosManipulando).then(res =>{
                if(res.data.code == 1){
                    this.getDados();
                    this.hide();
                    this.fecharModal();
                    alert("Novo Tipo Registrado Com Sucesso");
                } else if (res.data.code == 0){
                    alert(res.data.txt);
                }
            });
        },  

        toolbarClick: function (args) {
            if (args.item.id == 'Adicionar') {
                this.abrirModal();
                this.modalHeader = "Visualização do Documento";
                this.modalButtons = [
                    {
                        click: this.fecharModal,
                        buttonModel: {content: '<i class="fas fa-times-circle"></i>&nbsp&nbspFechar'}
                    },
                    {
                        click: this.newTypeLanc,
                        buttonModel: {content: '<i class="fas fa-plus"></i>&nbsp&nbspConfirmar'}
                    },
                ];
            }

            if (args.item.id == 'Editar'){
                if (this.$refs.grid.getSelectedRecords().length > 0){
                    this.abrirModal();

                    let data = this.$refs.grid.getSelectedRecords();
                    
                    this.dadosManipulando.SEQUENCIA = data[0].sequencia;
                   
                    this.dadosManipulando.DESCRICAO = data[0].descricao;

                    this.modalHeader = "Visualização do Documento";
                    this.modalButtons = [
                        {
                            click: this.fecharModal,
                            buttonModel: {content: '<i class="fas fa-times-circle"></i>&nbsp&nbspFechar'}
                        },
                        {
                            click: this.editTypeLanc,
                            buttonModel: {content: '<i class="fas fa-plus"></i>&nbsp&nbspConfirmar'}
                        },
                    ];
                } else {
                    alert("Selecione o campo");
                }
            }

            if(args.item.id == "Excluir"){
                if(this.$refs.grid.getSelectedRecords().length > 0){
                    let data = this.$refs.grid.getSelectedRecords();
                    mostrando = data[0].nome;
                    dadosManipulando = data[0].sequencia;

                    if (confirm(`deseja excluir "${mostrando}?" `) == true) {
                        axios.post(BASE + "/tipo_lancamento/delTypeLanc", dadosManipulando).then(res =>{
                            if(res.data.code == 1){
                                this.getDados();
                                this.$refs.grid.dataSourceList = [];
                                alert("Registro Exlcluído com sucesso");
                            } else{
                                alert("erro");
                            }
                        })
                    }
                } else {
                    alert("Selecione o campo");
                }
            }
        },

        getDados() {
            axios.post(BASE + "/tipo_lancamento/getDados").then(res => {
                if (res.data.code == 1) {
                    this.dataSourceList = res.data.data;
                } else {
                    alert("Erro");
                }
            });
        },

        abrirModal() {
            this.hide();
            this.$refs.modal.show();
        },

        fecharModal() {
            this.$refs.modal.hide();
        },
    },
    computed: {},
    mounted: function(){ 
        this.getDados()
    },
    watch: {}
})