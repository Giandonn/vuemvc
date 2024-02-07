<?php
class Login_Model extends Model {

    public function __construct() {
        parent::__construct();
    }
    public function checkLogin()
    {
        @session_start();
        $sessao = Session::init();
        $post = json_decode(file_get_contents("php://input"));
        $num = $post->id;
        $s = $post->senha;
        $dados = array(':id' => $num, ':senha' => $s);

        if (empty($num) && empty($s)){
            $msg = array("code" => 4, "txt" => "É necessário preencher ambos os campos");
        } else if ($num == "" || empty($num)){
            $msg = array("code" => 4, "txt" => "É necessário preencher o ID");
        }else if ($s == "" || empty($s)){
            $msg = array("code" => 4, "txt" => "É necessário preencher a senha");
        } else{
            $result = $this->db->select("select 
                                                u.id,
                                                u.nome, 
                                                u.senha, 
                                                n.codigo, 
                                                u.nivel, 
                                                n.descricao  
                                            from 
                                                fluxocaixa.usuario u,
                                                nivelusuario n  
                                            where U.nivel = n.codigo
                                            and id = :id
                                            and senha = md5(:senha)", $dados);
            if($result){
                $msg = array("code" => 1, "txt" => "success", "data" => $dados);
            } else if (!empty($num) && !empty($s)) {
                $verificacao = $this->db->select("select 
                                            u.id,
                                            u.senha
                                        from 
                                            fluxocaixa.usuario u");

                foreach ($verificacao as $v){
                    if ($v->id != $num && $v->senha != md5($s)) {
                        $msg = array("code" => 4, "txt" => "Id ou Senha estao errados");
                    }
                }
            }
            $count = count($result);

            if (count($result) > 0) {
                Session::init();
                Session::set('nome', $result[0]->nome);
                Session::set('id', $result[0]->id);
                Session::set('nivel',$result[0]->nivel);
                Session::set('senha', $result[0]->senha);
                Session::set('logado',true);
            }else {
                $erro = "Dados incorreto";
            }
        }
        echo (json_encode($msg));
    }
}
//$msg = array("code" => 1, "txt" => "logado com sucesso");

//            $count = count($result);
//
//            if (count($result) > 0) {
//                Session::init();
//                Session::set('nome', $result[0]->nome);
//                Session::set('id', $result[0]->id);
//                Session::set('nivel',$result[0]->nivel);
//                Session::set('senha', $result[0]->senha);
//                Session::set('logado',true);
//            }else {
//                $erro = "Dados incorreto";
//            }
//echo (json_encode($msg));