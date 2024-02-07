const AppTemplate = `

<div class="control-section" style="margin-top: 5%">
    <div class="row">

       <div class="col-md-2">
           <ejs-dropdownlist 
           floatLabelType="Auto"
               v-model="dadosManipulando.nivel"
               cssClass="e-outline"
               :fields="{ value:'codigo', text:'nivel'}"
               :dataSource='nivelData'
               ref="dropnivel"
               placeholder='Nivel'>
           </ejs-dropdownlist>
        </div>
        
        <div class="col-md-3 col-mt-5"
            <ejs-textbox 
                floatLabelType="Auto" 
                cssClass="e-outline" 
                v-model="dadosManipulando.ID" 
                placeholder="ID Usuário">
            </ejs-textbox>
        </div>
        
        <div class="col-md-4 mt-5">
            <ejs-textbox 
            floatLabelType="Auto" 
            cssClass="e-outline" 
            v-model="dadosManipulando.nome" 
            placeholder="Nome Do Usuário">
            </ejs-textbox>
        </div>
        
        <div class="col-md-2 mt-5">
            <ejs-textbox floatLabelType="Auto" 
            cssClass="e-outline" 
            type="password"
            v-model="dadosManipulando.senha" 
            placeholder="Senha:">
            </ejs-textbox>
        </div>
        
        <div class="btnCad mt-5 text-center">
            <ejs-button v-on:click.native="insertUsers" 
            cssClass="e-info">
            Cadastrar
        </ejs-button>
    </div>
</div>
`;

Vue.component('AppVue', {
    template: AppTemplate,
    data: function() {
        return {
            nivelData: [],
            dadosManipulando:{
                ID: null,
                nome: null,
                nivel: 1,
                senha: null
            },
        }
    },
    methods: {
        showLvl()
        {
            axios.post(BASE + "/cadastro_usuario/showLvl").then(res =>{
                this.nivelData = res.data.data
                console.log(res.data.data)
            });
        },

        hide(){
           let hide = this.dadosManipulando;
           hide.senha = "";
           hide.nome = "";
           hide.ID = "";
           hide.nivel = null;
        },

        insertUsers(){
            axios.post(BASE + "/cadastro_usuario/insertUsers", this.dadosManipulando).then(res => {
                if(res.data.code == 1){
                    alert("Cadastro Registrado com sucesso");
                    this.hide();
                } else if (res.data.code == 0){
                    alert(res.data.txt);
                }
            });
        },
    },
    computed: {},
    mounted: function() {
        this.showLvl();
    },
    watch: {}
});
