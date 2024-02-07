<?php
class Tipo_Lancamento_Model extends Model {
    public function __construct() {
        parent::__construct();
    }

    public function getDados()
    {
        $post = json_decode(file_get_contents("php://input"));

        $sql2 = $this->db->select("select
                                        concat(l.descricao, ' - ',l.sequencia) nome,
                                        l.sequencia,
                                        l.descricao 
                                    from 
                                        fluxocaixa.tipolancamento l"); 

        if($sql2){
            $msg = array("code" => 1, "txt" => "success", "data" => $sql2);
        } else{
            $msg = array("code" => 0, "txt" => "error");
        }
        echo json_encode($msg);
     }

     public function newTypeLanc()
     {
        $post = json_decode(file_get_contents("php://input"));
        $desc = $post->DESCRICAO;

         if (empty($desc) || $desc == ""){
            $msg = array("code" => 0, "txt" => "Preencha o campo Descrição");
        } else{
             $sql = $this->db->insert("fluxocaixa.tipolancamento", array('descricao' => $desc));

             if($sql){
                 $msg = array("code" => 1, "txt" => "success", 'data' => $sql);
             } else{
                 $msg = array("code" => 0, "txt" => "erro");
             }
        }
        echo (json_encode($msg));
     }

     public function editTypeLanc()
     {
        $post = json_decode(file_get_contents("php://input"));
        $desc = $post->DESCRICAO;

        if (empty($desc) || $desc == ""){
            $msg = array("code" => 0, "txt" => "Preencha o campo 'Descrição'");
        } else{
            $sql = $this->db->update("fluxocaixa.tipolancamento", array('descricao' => $desc));

            if($sql){
                $msg = array("code" => 1, "txt" => "success");
            } else{
                $msg = array("code" => 0, "txt" => "erro");
            }
        }
        echo (json_encode($msg));
     }

     public function delTypeLanc()
     {
        $post = json_encode(file_get_contents("php://input"));
        $a = $post;

        $sql = $this->db->delete("fluxocaixa.tipolancamento", "sequencia=$a");

        if($sql){
            $msg = array("code" => 1, "txt" => "success");
        } else{
            $msg = array("code" => 0, "txt" => "erro");
        }
        echo (json_encode($msg));
     }
}
