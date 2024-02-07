const AppTemplate = `
<div class="control-section" style="margin-top: 5%">
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
                    <e-column field="sequencia" textAlign="Center" headerText="seq"></e-column>
                    <e-column field="dataT" textAlign="Center" headerText="data"></e-column>
                    <e-column field="tipoT" textAlign="Center" headerText="tipo"></e-column>
                    <e-column field="tipofluxo" textAlign="Center" headerText="tipo f"></e-column>
                    <e-column field="valor" textAlign="Center" headerText="valor"></e-column>
                    <e-column field="obs" textAlign="Center" headerText="obs"></e-column>
                </e-columns>
            </ejs-grid>
        </div>
    </div>
    <ejs-dialog
        class="teste"
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
                <ejs-dropdownlist 
                    v-model="dadosManipulando.DROPTIPO"
                    cssClass="e-outline"
                    :dataSource='lancTipo'
                    ref="tipoLanc"
                    :fields="{ text:'descricao', value:'sequencia'}"
                    placeholder='Tipo do Lançamento'>
                </ejs-dropdownlist>
            </div>
            <div class="col-md-3">
                    <ejs-dropdownlist 
                        floatLabelType="Auto"
                        v-model="dadosManipulando.DROPFLUXO"
                        cssClass="e-outline"
                        :fields="{ text:'descricao', value:'codigo'}"
                        :dataSource='fluxoData'
                        ref="dropfluxo"
                        placeholder='Fluxo'>
                </ejs-dropdownlist>
            </div>
            <div class="col-md-3">
                <ejs-numerictextbox 
                floatLabelType="Auto"
                min="0"
                decimals="2"
                v-model="dadosManipulando.VALOR"
                cssClass="e-outline" 
                placeholder="Valor">
                </ejs-numerictextbox>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <ejs-textbox 
                    floatLabelType="Auto" 
                    v-model="dadosManipulando.OBS"
                    ref="obs"
                    cssClass="e-outline"
                    placeholder='Observações'>
                </ejs-textbox>
            </div>
        </div>
    </ejs-dialog>
</div>
`;

Vue.component('AppVue', {
    template: AppTemplate,
    data: function() {
        return {
            teste: null,
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
            ],
            dataSorceList: [],
            sportsData: [],
            fluxoData: [],
            lancTipo: [],
            dadosManipulando: {
                DROPTIPO: null,
                VALOR: null,
                DROPFLUXO: null,
                OBS: null
            },
            modalHeader: null,
            modalButtons: null,
            disable: false
        }
    },
    methods: {
        hide(){
            let hide = this.dadosManipulando;
            hide.DROPTIPO = null,
            hide.DROPFLUXO = null,
            hide.VALOR = null,
            hide.OBS = ""
        },

        newLanc(){
            axios.post(BASE + "/lancamento/newLanc", this.dadosManipulando).then(res =>{
                if(res.data.code == 1){
                    alert("Registro inserido com sucesso");
                    this.hide();
                    this.fecharModal();
                    this.getDados();
                } else if (res.data.code == 0){
                    alert(res.data.txt);
                }
            });
        },

        editLanc(){
            axios.post(BASE + "/lancamento/editLanc", this.dadosManipulando).then(res =>{
                if(res.data.code === 1){
                    this.hide();
                    this.getDados();
                    this.fecharModal();
                    alert("Registro atualizado com sucesso");
                } else if (res.data.code === 0){
                    alert(res.data.txt);
                }
            });
        },

        showLanc(){
            axios.post(BASE + "/lancamento/showLanc").then(res =>{
                this.lancTipo = res.data.data.TIPOLANCAMENTO
                this.fluxoData = res.data.data.TIPOFLUXO
                this.hide();
            });
        },

        getDados: function () {
            axios.post(BASE + "/lancamento/getDados").then(res => {
                if (res.data.code == 1) {
                    this.dataSorceList = res.data.data;
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

        toolbarClick: function (args) {
            if (args.item.id == 'Adicionar') {
                this.disable = false;
                this.abrirModal();
                this.modalHeader = "Visualização do Documento";
                this.modalButtons = [
                    {
                        click: this.fecharModal,
                        buttonModel: {content: '<i class="fas fa-times-circle"></i>&nbsp&nbspFechar'}
                    },
                    {

                        click: this.newLanc,
                        buttonModel: {content: '<i class="fas fa-plus"></i>&nbsp&nbspConfirmar'}
                    },
                ];
            }

            if (args.item.id == 'Excluir'){
                if (this.$refs.grid.getSelectedRecords().length > 0){
                    let valor = this.$refs.grid.getSelectedRecords();
                    this.dadosManipulando.VALOR = valor[0].valor;

                    let data = this.$refs.grid.getSelectedRecords();
                    this.dadosManipulando.SEQUENCIA = data[0].sequencia;

                    let tipoLanc = data[0].tipoT.split(' - ');
                    this.dadosManipulando.DROPTIPO = parseInt(tipoLanc[1]);
                    
                    let tipoFluxo = data[0].tipofluxo.split(' ');
                    this.dadosManipulando.DROPFLUXO = parseInt(tipoFluxo[2]);

                    let obs =  this.$refs.grid.getSelectedRecords();
                    this.dadosManipulando.OBS = data[0].obs;

                    axios.post(BASE + "/lancamento/delLanc", this.dadosManipulando).then(res => {
                        if(res.data.code == 1){
                            alert("Registro Excluído com sucesso");
                            this.getDados();
                        } else{
                            alert("Erro");
                        }
                    });

                    this.modalHeader = "Visualização do Documento";
                    this.modalButtons = [
                        {
                            click: this.fecharModal,
                            buttonModel: {content: '<i class="fas fa-times-circle"></i>&nbsp&nbspFechar'}
                        },
                    ];
                } else {
                    alert("Selecione o campo");
                }
            }

            if (args.item.id == 'Editar') {
                if (this.$refs.grid.getSelectedRecords().length > 0) {
                    this.abrirModal();
                
                    let valor = this.$refs.grid.getSelectedRecords();
                    this.dadosManipulando.VALOR = valor[0].valor;

                    let data = this.$refs.grid.getSelectedRecords();
                    this.dadosManipulando.SEQUENCIA = data[0].sequencia;

                    let tipoLanc = data[0].tipoT.split(' - ');
                    this.dadosManipulando.DROPTIPO = parseInt(tipoLanc[1]);
                    
                    let tipoFluxo = data[0].tipofluxo.split(' ');
                    this.dadosManipulando.DROPFLUXO = parseInt(tipoFluxo[2]);

                    let obs =  this.$refs.grid.getSelectedRecords();
                    this.dadosManipulando.OBS = data[0].obs;

                    this.disable = true;

                    this.modalHeader = "Visualização do Documento";
                    this.modalButtons = [
                        {
                            click: this.fecharModal,
                            buttonModel: {content: '<i class="fas fa-times-circle"></i>&nbsp&nbspFechar'}
                        },
                        {
                            click: this.editLanc,
                            buttonModel: {content: '<i class="fas fa-plus"></i>&nbsp&nbspConfirmar'}
                        },
                    ];
                } else {
                    alert("Selecione o campo");
                }
            }
        },
    },
    computed: {},
    mounted: function () {
        this.getDados();
        this.showLanc();
    },
    watch: {}
})
/*

abrir:
this.$refs.modal.show();
fechar:
this.$refs.modal.hide();

this.modalHeader = "Visualização do Documento";
this.modalButtons = [
    {
        click: this.salvar,
        buttonModel: {content: '<i class="fas fa-check"></i>&nbsp&nbspAssinar Documento', isPrimary: true},
    },
    {
        click: this.fecharModal,
        buttonModel: {content: '<i class="fas fa-times-circle"></i>&nbsp&nbspFechar'}
    },
];
*/