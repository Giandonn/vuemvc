<?php

class Cadastro_Usuario_Model extends Model {

    public function __construct() {
        parent::__construct();
    }

    public function showLvl()
    {
        $sql = $this->db->select("     select 
                                        codigo, CONCAT(n.codigo, '-', n.descricao) as nivel
                                        from
                                            nivelusuario n 
	");

        if ($sql){
            $msg = array("code" => 1, "txt" => "Success", "data" => $sql);
        } else{
            $msg = array("code" => 0, "txt" => "erro");
        }

        echo (json_encode($msg));
    }

    public function insertUsers()
    {
        $post = json_decode(file_get_contents("php://input"));
        $id = $post->ID;
        $nome = $post->nome;
        $nivel = $post->nivel;
        $senha = $post->senha;
        //var_dump($senha);exit;
        if (empty($nome) || $nome == ""){
            $msg = array("code" => 0, "txt" => "Preencha o campo Nome");
        } else if (empty($id) || $id == ""){
            $msg = array("code" => 0, "txt" => "Preencha o campo ID");
        } else if (empty($nivel) || $nivel == ""){
            $msg = array("code" => 0, "txt" => "Preencha o campo Nivel");
        } else if(empty($senha) || $senha == ""){
            $msg = array("code" => 0, "txt" => "Preencha o campo Senha");
        } else{

                $sql = $this->db->insert("fluxocaixa.usuario", array('id' => $id, 'nome' => $nome, 'senha' => md5($senha), 'nivel' => $nivel));

                if($sql){
                    $msg = array("code" => 1, "txt" => "success");
                } else{
                    $msg = array("code" => 0, "txt" => "error");
                }
            }
          echo json_encode($msg);
    }
}