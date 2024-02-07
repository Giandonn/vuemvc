<?php
class Logout_Model extends Model {

    public function __construct() {
        parent::__construct();
    }
    public function Logout(){
        Session::init();
        $_SESSION['logado'] = false;
        Session::destroy();
    }
}