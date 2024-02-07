<?php

class Tipo_Lancamento extends Controller
{

    function __construct()
    {
        parent::__construct();
        Auth::autentica();
        Auth::accessDenied(3);
        $this->view->js = array();
        $this->view->css = array();
    }

    function index()
    {
        $this->view->title = "Tipo Lançamento";
        /*Os array push devem ser feitos antes de instanciar o header e footer.*/
        array_push($this->view->js, "views/tipo_lancamento/app.vue.js");
        array_push($this->view->css, "views/tipo_lancamento/app.vue.css");
        $this->view->render('header');
        $this->view->render('footer');
    }

    function getDados()
    {
        $this->model->getDados();
    }

    function newTypeLanc()
    {
        $this->model->newTypeLanc();
    }

    function editTypeLanc()
    {
        $this->model->editTypeLanc();
    }

    function delTypeLanc()
    {
        $this->model->delTypeLanc();
    }
}