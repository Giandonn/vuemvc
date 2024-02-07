<?php
class Relatorio_Model extends Model {

    public function __construct() {
        parent::__construct();
    }

    public function getDados(){
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

        if ($sql2){
            $msg = array("code" => 1, "txt" => "success", "data" => $sql2);
        } else{
            $msg = array("code" => 0, "txt" => "erro");
        }
        echo json_encode($msg);
    }
}