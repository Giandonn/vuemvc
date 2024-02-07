const AppTemplate = `

<div class="control-section" style="margin-top: 10%">
    <div class="row">
        <div class="col-md-6">
            <ejs-textbox 
            floatLabelType="Auto" 
            cssClass="e-outline" 
            placeholder="Seu ID" 
            v-model="dados.id">
            </ejs-textbox>
        </div>

        <div class ="col-md-6">
            <ejs-textbox 
            type="password"
            floatLabelType="Auto" 
            cssClass="e-outline" 
            placeholder="Sua Senha" 
            v-model="dados.senha">
            </ejs-textbox>
        </div>

        <div class="btnLog">
            <ejs-button 
            cssClass="e-info" 
            v-on:click.native="checkLogin" 
            v-model="checkLogin">
            Logar
            </ejs-button>
        </div>
    </div>
</div>
`

Vue.component('AppVue', {
    template: AppTemplate,
    data() {
        return {
            dados: {
                id: null,
                senha: null
            }
        }
    },
    methods: {
        checkLogin() {
            axios.post(BASE + "/login/checkLogin", this.dados).then(res => {
                if(res.data.code == 1){
                    alert(res.data.txt);
                    window.location.href = BASE + "/index"
                } else if (res.data.code == 4) {
                    alert(res.data.txt);
                }
            });
        },
    },
    computed: {},
    mounted() {
    },
    watch: {}
})