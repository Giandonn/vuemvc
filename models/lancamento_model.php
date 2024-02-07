<?php

class Lancamento_Model extends Model {

    public function __construct() {
        parent::__construct();
    }

    public function showLanc()
    {
        $post = json_decode(file_get_contents("php://input"));
        $objResp = new stdClass();
        $sql1 = $this->db->select("SELECT codigo, descricao FROM fluxocaixa.tipofluxo");
        $objResp->TIPOFLUXO = $sql1;

        $sql2 = $this->db->select("SELECT sequencia, descricao FROM fluxocaixa.tipolancamento");
        $objResp->TIPOLANCAMENTO = $sql2;

        Session::init();

    if($sql1 && $sql2){
        $msg = array("code" => 1, "txt" => "success", "nivel" => $_SESSION['nivel'], "data" => $objResp);
    } else{
        $msg = array("code" => 0, "txt" => "error");
    }
        echo(json_encode($msg));
    }

    public function insertLanc()
    {
        $post = json_decode(file_get_contents("php://input"));
        $seq = $post->dados->SEQUENCIA;
        $data =  date("Y/m/d");
        $tipo = $post->dados->DROPTIPO;
        $valor = $post->dados->VALOR;
        $fluxo = $post->dados->DROPFLUXO;
        $obs = $post->dados->OBS;

        $sql = $this->db->insert("fluxocaixa.lancamento", array('sequencia' => $seq, 'data' => $data, 'tipo' => $tipo, 'valor' => $valor, 'fluxo' => $fluxo, 'obs' => $obs));

        if($sql){
            $msg = array("code" => 1, "txt" => "success");
        } else{
            $msg = array("code" => 0, "txt" => "error");
        }
        echo json_encode($msg);
     }

     public function getDados()
     {
        Session::init();

        $id = $_SESSION['id'];

        if($_SESSION['nivel'] != 3){
            $sql2 = $this->db->select("select 
                                            L.sequencia,
                                            DATE_FORMAT(L.`data`, '%d/%M/%Y') as dataT,
                                            CONCAT(TL.descricao, ' - ', L.tipo) as tipoT,
                                            l.tipo,
                                            l.valor,
                                            concat(T.descricao, ' - ', l.fluxo) as tipofluxo,
                                            l.fluxo,
                                            l.obs 
                                        from 
                                            fluxocaixa.lancamento L
                                        join 
                                            fluxocaixa.tipofluxo T on T.codigo = L.fluxo  
                                        join 
                                            fluxocaixa.tipolancamento TL on TL.sequencia = L.tipo");

        }else {
            $sql2 = $this->db->select("select 
                L.sequencia,
                DATE_FORMAT(L.`data`, '%d/%M/%Y') as dataT,
                CONCAT(TL.descricao, ' - ', L.tipo) as tipoT,
                l.tipo,
                l.valor,
                concat(T.descricao, ' - ', l.fluxo) as tipofluxo,
                l.fluxo,
                l.obs 
            from 
                fluxocaixa.lancamento L
            join 
                fluxocaixa.tipofluxo T on T.codigo = L.fluxo  
            join 
                fluxocaixa.tipolancamento TL on TL.sequencia = L.tipo
            where
                L.usuario = '$id'");
        }

         if($sql2){
             $msg = array("code" => 1, "txt" => "success", "data" => $sql2);
         } else{
             $msg = array("code" => 0, "txt" => "error");
         }
         echo json_encode($msg);
      }

      public function editLanc()
      {
        $post = json_decode(file_get_contents("php://input"));
        $data =  date("Y-m-d"); //2024-01-26 00:00:00.000
        $tipo = $post->DROPTIPO;
        $valor = $post->VALOR;
        $fluxo =  $post->DROPFLUXO;
        $obs =  $post->OBS;

        $dados = ['tipo' => $tipo,
                 'fluxo' =>  $fluxo,
                 'obs' =>  $obs,
                 'data' => $data,
                 'valor' => $valor
                ];

        if (empty($tipo) || $tipo == "" && empty($fluxo) || $fluxo == "" && empty($valor) || $valor == ""){
        $msg = array("code" => 0, "txt" => "Preencha todos os campos");
        } else{
            $sql = $this->db->update("fluxocaixa.lancamento", $dados, "sequencia=$post->SEQUENCIA");

            if($sql){
                $msg = array("code" => 1, "txt" => "success", $sql);
            } else{
                $msg = array("code" => 0, "txt" => "error");
            }
        }
        echo (json_encode($msg));
      }

      public function delLanc()
      {
        $post = json_decode(file_get_contents("php://input"));
        $seq = $post->SEQUENCIA;
        $data =  date("Y-m-d"); //2024-01-26 00:00:00.000
        $tipo = $post->DROPTIPO;
        $valor = $post->VALOR;
        $fluxo =  $post->DROPFLUXO;
        $obs =  $post->OBS;

        $dados = ['tipo' => $tipo,
                 'valor' =>  $valor,
                 'fluxo' =>  $fluxo,
                 'obs' =>  $obs,
                 'data' => $data,
                ];

        $sql = $this->db->delete("fluxocaixa.lancamento" ,"sequencia=$seq");

        if ($sql) {
            $msg = array("code" => 1, "txt" => "success"); 
        } else{
            $msg = array("code" => 0, "txt" => "erro");
        }
        echo (json_encode($msg));
      }

      public function newLanc()
      {
        $post = json_decode(file_get_contents("php://input"));
        $data =  date("Y-m-d"); //2024-01-26 00:00:00.000
        $tipo = $post->DROPTIPO;
        $valor = $post->VALOR;
        $fluxo =  $post->DROPFLUXO;
        $obs =  $post->OBS;
        $user = $_SESSION['id'];

        $dados = ['tipo' => $tipo,
                 'fluxo' =>  $fluxo,
                 'obs' =>  $obs,
                 'data' => $data,
                  'usuario' => $user];
//        var_dump($dados);exit;
        if (empty($tipo) || $tipo == "" && empty($valor) || $valor == "" && empty($fluxo) || $fluxo == "") {
            $msg = array("code" => 0, "txt" => "É necessário preencher os campos");
        } else{
            $sql = $this->db->insert("fluxocaixa.lancamento", $dados, "valor= $valor");

            if ($sql) {
                $msg = array("code" => 1, "txt" => "success", "data" => $sql);
            } else {
                $msg = array("code" => 0, "txt" => "erro");
            }
        }
        echo (json_encode($msg));
      }
}